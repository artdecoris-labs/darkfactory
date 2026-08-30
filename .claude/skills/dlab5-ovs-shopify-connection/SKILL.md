---
name: dlab5-ovs-shopify-connection
description: How a server-side integration gets Shopify Admin API access in 2026 — Dev Dashboard app plus client credentials grant, not a pasted shpat_ token and not the Shopify CLI. Use when setting up or debugging Shopify API access for OntoVibeShift or any Lambda-hosted connector, or when a token exchange fails.
---

# Shopify Admin API access for a server-side integration

**This repository is public. No store handle, client id, secret or token below.**
Real values live in `artdecoris-private/` or a gitignored `CLAUDE.md`.

---

## 1. The three things people confuse

| | What it is | Can a Lambda use it? |
| --- | --- | --- |
| **Shopify CLI** (`@shopify/cli`) | Developer tool. Shells out, opens a browser for OAuth, scaffolds apps and themes. | **No.** Not designed for server use at all. |
| **Admin API client** (`@shopify/admin-api-client`) | Near-zero-dependency GraphQL client for the Admin API. | **Yes** — this is the one. |
| **Shopify Dev MCP** (`@shopify/dev-mcp`) | Documentation and schema introspection for authoring GraphQL. | Not applicable — it gives **no access to store data**. |

Ruling out the CLI does not rule out the client. They are unrelated.

---

## 2. There is no `shpat_` token to generate any more

> "You can no longer create new admin-created custom apps."

The old path — *Settings → Apps → Develop apps → reveal token* — is closed for
new apps. A **Dev Dashboard app** replaces it, and it does not show a token in
the UI at all. It gives a **client id** and a **client secret**, exchanged for a
token that lasts **24 hours**.

So the durable credential is the **secret**. The token is derived per use and
must never be treated as long-lived.

### The exchange

```
POST https://{shop}.myshopify.com/admin/oauth/access_token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=…&client_secret=…
```

Returns `access_token`, `scope`, and `expires_in` (86399).

**Form-encoded, not JSON.** Sending JSON returns an unhelpful error rather than
a clear rejection.

**No `code` parameter.** Advice that tells you to grab a `code` from a redirect
URL is describing the *authorization code grant*, which is a different flow. It
needs a configured redirect URL and legacy install; an app using Shopify
managed installation (`use_legacy_install_flow = false`) never issues a code at
all, which is where people get stuck.

### The one hard prerequisite

The app and the store must be in the **same Shopify organization**. Outside it
the exchange fails with `shop_not_permitted`, which reads like a credential
problem and is not one.

---

## 3. Reading the failures

Each of these sends you somewhere different, and they are indistinguishable
from a later `401` — which is why the exchange is worth doing separately and
reporting on its own.

| Response | Means | Do |
| --- | --- | --- |
| `shop_not_permitted` | App and store are in **different organizations** | Check which org owns the store. **Not a wrong secret** — re-checking it wastes an afternoon. |
| `invalid_client` / 401 | Client id or secret is wrong | Check both; check the app is installed |
| `invalid_grant` | App is not installed on this store | Install it |
| 404, non-JSON body | Wrong shop domain | Fix the domain |
| **401 after a successful exchange** | Credentials fine — a **scope** is missing | Add read scopes in the Dev Dashboard and reinstall |

That last row matters: once the exchange succeeds, the credentials are proven.
Any refusal afterwards is about permissions, so telling someone to check their
secret sends them back to something that just worked.

---

## 4. Seeing the scopes you actually have

The exchange response carries `scope` — **the scopes Shopify actually
granted**. That is the authoritative answer, and it is not the same as the
scope list in an app's config file, which says only what was *asked for*. The
two diverge whenever an app was installed before a scope was added to it.

Surface it rather than discarding it. Re-installing the app is what makes a
newly added scope real.

Start with `read_*` only. Write scopes are not needed until something actually
writes, and in OntoVibeShift that is the EXECUTE phase, which is gated behind a
recorded human approval anyway (ADR-0008).

---

## 5. How OntoVibeShift stores it

| | Where |
| --- | --- |
| Shop domain, API version, **client id** | `.ttl` config in S3 — non-secret |
| **Client secret** | AWS Secrets Manager |
| Access token | **nowhere** — exchanged per use, cached in memory only |

The client id is the public half of the pair and belongs in the config. Caching
the token in a database would put a second copy of a bearer credential
somewhere it does not need to be, to save one HTTP request; in-memory, dying
with the execution environment, is the correct lifetime.

Drop a cached token a few minutes **before** its stated expiry. One that is
valid when checked and expired when used produces a 401 mid-run, which reads as
a broken credential rather than a timing artefact.

---

## 6. Pin the API version

Always. An unpinned version moves under the integration and breaks it on
Shopify's schedule rather than yours. `@shopify/admin-api-client` will warn
through its `logger` when a pinned version is unsupported or a field is
deprecated — that warning is the only notice before it stops working, so log
it somewhere a person will see.

The logger's type literals are cased inconsistently
(`Unsupported_Api_Version` beside `HTTP-Response-GraphQL-Deprecation-Notice`).
Take them from the client's own union; a guessed constant silently never
matches and the warnings simply never appear.

---

## 7. Do you need a local app directory?

**Not for the integration.** The Dev Dashboard app lives at Shopify; a server
integration needs only the shop domain, the API version, the client id and the
secret.

A local app project is only useful if you manage that app **as code** —
`shopify.app.toml` holds the scopes and config that `shopify app deploy`
pushes. If scopes are managed in the Dev Dashboard UI instead, the directory
has no ongoing role and any extension scaffolding in it is unrelated to API
access.

Watch for a contradiction that makes such a project non-functional anyway:
`embedded = false` together with `embedded_app_direct_api_access = true`.
Direct API access runs through App Bridge, which only exists when the app is
embedded in the Admin — and it mints per-session tokens in a browser, which are
not a credential a server can hold.

---

## 8. Odoo, for contrast

Odoo still issues a durable API key, so its connection stores the key itself.
Two things to remember there:

- **A wrong key returns HTTP 200** with a boolean `false` from `authenticate`.
  Checking the transport status alone reports a bad key as a healthy
  connection.
- Call `version` first — it needs no credential, so it separates "unreachable
  or not an Odoo" from "the credential is wrong".
