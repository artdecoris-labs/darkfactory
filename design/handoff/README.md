# Design handoff

Snapshots of the Claude Design canvas, archived so theme work has a stable reference
that does not depend on the remote project staying unchanged.

## Layout

```
design/handoff/
└── YYYY-MM-DD/
    ├── SOURCE.md          project URL, date, who exported it
    ├── artboards/         the .dc.html artboards
    ├── ds/tokens/         colors, typography, fonts, spacing, radius, elevation, motion
    ├── ds/styles.css
    └── assets/            images referenced by the artboards
```

## Importing a new snapshot

Use the `design-handoff` skill. It covers authorization (`/design-login`), reading the
project via `DesignSync`, and translating tokens into Horizon theme settings.

Snapshots are additive — create a new dated folder rather than overwriting an old one,
so a design change stays reviewable as a diff.
