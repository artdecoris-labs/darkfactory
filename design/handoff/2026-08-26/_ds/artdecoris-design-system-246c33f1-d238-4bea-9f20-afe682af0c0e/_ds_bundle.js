/* @ds-bundle: {"format":4,"namespace":"ArtDecorisDesignSystem_246c33","components":[{"name":"ArtistCard","sourcePath":"components/commerce/ArtistCard.jsx"},{"name":"CategoryTile","sourcePath":"components/commerce/CategoryTile.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"QuantityStepper","sourcePath":"components/commerce/QuantityStepper.jsx"},{"name":"SizeSelector","sourcePath":"components/commerce/SizeSelector.jsx"},{"name":"SpecTable","sourcePath":"components/commerce/SpecTable.jsx"},{"name":"ValueProp","sourcePath":"components/commerce/ValueProp.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Price","sourcePath":"components/core/Price.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"}],"sourceHashes":{"assets/images.js":"44359fae52f7","components/commerce/ArtistCard.jsx":"61d2f0f3b324","components/commerce/CategoryTile.jsx":"f4c6d399fc0a","components/commerce/ProductCard.jsx":"ce079da58527","components/commerce/QuantityStepper.jsx":"0ea97208328e","components/commerce/SizeSelector.jsx":"e9f8860e54c1","components/commerce/SpecTable.jsx":"3caeca34edcc","components/commerce/ValueProp.jsx":"70983fff86f9","components/core/Badge.jsx":"1bc5e8f0525c","components/core/Button.jsx":"ab291bf59eed","components/core/IconButton.jsx":"b7880eeb4d2c","components/core/Input.jsx":"9f0983e90eea","components/core/Price.jsx":"980ec8a36536","components/core/SectionHeading.jsx":"aefd6335f944","components/core/Tabs.jsx":"2e7401846571","ui_kits/storefront/CartScreen.jsx":"48ab6f5d8144","ui_kits/storefront/Chrome.jsx":"08d63e7d0ff4","ui_kits/storefront/CollectionScreen.jsx":"43f66f3c9e66","ui_kits/storefront/HomeScreen.jsx":"b31f5df09800","ui_kits/storefront/ProductScreen.jsx":"5a7c8367681b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ArtDecorisDesignSystem_246c33 = window.ArtDecorisDesignSystem_246c33 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/images.js
try { (() => {
/* Classic script (no ES module) so it can be loaded with a plain <script src>.
   ArtDecoris brand imagery.
   The live site is an Odoo storefront; its media is served from /web/image/… and could NOT be
   downloaded into this project (the host blocks programmatic asset fetches from this environment).
   These are the real, live URLs — they render correctly in a browser, but nothing is vendored here.
   ACTION FOR THE BRAND TEAM: drop the source files into assets/ and swap these constants. */
var IMG = 'https://www.artdecoris.com/web/image/';
window.AD_IMAGES = {
  logo: 'assets/logo.png',
  /* local — supplied by the brand */
  logoFooter: IMG + '8715-b3e3fe8b/DEF.webp',
  heroAnne: IMG + '7233-6d289fa5/ANNE.webp',
  storyRoom: IMG + '8244-0b2df0eb/ARTDECORIS-37.webp',
  catWallArt: IMG + '8802-f0c5ec98/56.webp',
  catDiffuser: IMG + '8800-3a01a990/55.webp',
  catCushion: IMG + '14067-e5660625/A%20010c%20Red%20Dot%20both-min.webp',
  catBeanbag: IMG + '8804-81d10168/53.webp',
  catCandle: IMG + '8801-1f1fd0be/52.webp',
  artistBrass: IMG + '8104-240d8339/7.webp',
  artistJuan: IMG + '8264-4b330eb6/images.webp',
  artistAnne: IMG + '8100-bafd4117/6.webp',
  sigBrass: IMG + '13001-f07aa969/3.webp',
  sigJuan: IMG + '13002-73ee3a9d/2.webp',
  sigAnne: IMG + '13003-0c372a13/1.webp',
  deferlaBrass: IMG + '8092-e19f4aed/Deferla%20x%20Brass-6.webp',
  customWall: IMG + '8135-8f852cd3/Screenshot%202024-11-14%20at%2018.49.59.webp',
  customRoom: IMG + '7221-d715be84/358-DSC02192-min.jpg',
  catalogue: IMG + '13840-700a51ae/test.webp',
  pdpBici: IMG + 'product.template/166/image_1024?unique=2c7de7f',
  pdpBiciXL: IMG + 'product.image/526/image_1024/C%20005c%20Plexi%20Bike%20XL.webp?unique=0b831b3',
  pdpBici3x: IMG + 'product.image/134/image_1024/C%20005d%20Plexi%20Bike%203x-min.webp?unique=0b831b3',
  pdpFrame: IMG + 'product.image/208/image_1024/Frame%20vertical%20open-min-min.webp?unique=0b831b3',
  pdpBack: IMG + 'product.image/222/image_1024/C%20014%20achterkant%20small.webp?unique=0b831b3',
  prodFlowers: IMG + 'product.template/165/image_1024',
  prodOjitos: IMG + 'product.template/168/image_1024',
  prodHearts: IMG + 'product.template/164/image_1024',
  iconArtist: IMG + '8536-e7cbe9cb/icons8-artist-50.png',
  iconCraft: IMG + '8537-bc0d72f0/icons8-craft-50%20%281%29.png',
  iconInterior: IMG + '8535-964e1815/icons8-interior-50.png',
  iconApproval: IMG + '3310-5e7aba7d/Approval.png'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/images.js", error: String((e && e.message) || e) }); }

// components/commerce/CategoryTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CategoryTile({
  label,
  image,
  href = '#',
  onOpen,
  ratio = '4 / 5',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: e => {
      if (onOpen) {
        e.preventDefault();
        onOpen();
      }
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
      textDecoration: 'none',
      aspectRatio: ratio,
      background: 'var(--surface-tile)',
      borderRadius: 'var(--radius-image)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: label,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(var(--zoom-image-hover))' : 'scale(1)',
      transition: 'var(--transition-image)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--gradient-protect)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 'var(--space-5)',
      bottom: 'var(--space-5)',
      color: 'var(--paper-000)',
      font: 'var(--type-label)',
      fontSize: 'var(--fs-caption)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      borderBottom: '1px solid ' + (hover ? 'var(--brass-300)' : 'transparent'),
      paddingBottom: 2,
      transition: 'var(--transition-control)'
    }
  }, label));
}
Object.assign(__ds_scope, { CategoryTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CategoryTile.jsx", error: String((e && e.message) || e) }); }

// components/commerce/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const qty = value ?? internal;
  const set = n => {
    const c = Math.min(max, Math.max(min, n));
    setInternal(c);
    onChange && onChange(c);
  };
  const btn = {
    width: 38,
    height: 42,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-strong)',
    font: 'var(--type-body)',
    fontSize: 'var(--fs-body-lg)',
    transition: 'var(--transition-control)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-control)',
      background: 'var(--surface-card)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Remove one",
    onClick: () => set(qty - 1),
    style: btn
  }, "\u2212"), /*#__PURE__*/React.createElement("input", {
    value: qty,
    onChange: e => set(parseInt(e.target.value || '1', 10) || min),
    style: {
      width: 36,
      textAlign: 'center',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'var(--type-body)',
      color: 'var(--text-strong)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Add one",
    onClick: () => set(qty + 1),
    style: btn
  }, "+"));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/SizeSelector.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SizeSelector({
  label = 'Size',
  options = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? options[0]);
  const active = value ?? internal;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gap: 'var(--space-3)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-2)'
    }
  }, options.map(o => {
    const on = o === active;
    return /*#__PURE__*/React.createElement("button", {
      key: o,
      onClick: () => {
        setInternal(o);
        onChange && onChange(o);
      },
      style: {
        padding: '10px 16px',
        cursor: 'pointer',
        font: 'var(--type-body)',
        fontSize: 'var(--fs-body-sm)',
        background: on ? 'var(--ink-900)' : 'transparent',
        color: on ? 'var(--text-inverse)' : 'var(--text-body)',
        border: '1px solid ' + (on ? 'var(--ink-900)' : 'var(--border-subtle)'),
        borderRadius: 'var(--radius-control)',
        transition: 'var(--transition-control)'
      }
    }, o);
  })));
}
Object.assign(__ds_scope, { SizeSelector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/SizeSelector.jsx", error: String((e && e.message) || e) }); }

// components/commerce/SpecTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SpecTable({
  rows = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("table", _extends({
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      font: 'var(--type-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left',
      padding: 'var(--space-3) var(--space-4) var(--space-3) 0',
      width: '34%',
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      verticalAlign: 'top'
    }
  }, r.label), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: 'var(--space-3) 0',
      color: 'var(--text-body)'
    }
  }, r.value)))));
}
Object.assign(__ds_scope, { SpecTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/SpecTable.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ValueProp.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ValueProp({
  icon,
  label,
  layout = 'row',
  style,
  ...rest
}) {
  const row = layout === 'row';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: row ? 'row' : 'column',
      alignItems: 'center',
      gap: row ? 'var(--space-3)' : 'var(--space-2)',
      textAlign: row ? 'left' : 'center',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--brass-600)'
    }
  }, typeof icon === 'string' ? /*#__PURE__*/React.createElement("img", {
    src: icon,
    alt: "",
    style: {
      width: 28,
      height: 28,
      objectFit: 'contain'
    }
  }) : icon), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { ValueProp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ValueProp.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: {
    background: 'var(--surface-sunken)',
    color: 'var(--text-body)',
    border: '1px solid var(--border-hairline)'
  },
  ink: {
    background: 'var(--ink-900)',
    color: 'var(--text-inverse)',
    border: '1px solid var(--ink-900)'
  },
  brass: {
    background: 'var(--brass-100)',
    color: 'var(--brass-700)',
    border: '1px solid var(--brass-300)'
  },
  sale: {
    background: 'var(--danger-600)',
    color: 'var(--paper-000)',
    border: '1px solid var(--danger-600)'
  },
  soldOut: {
    background: 'var(--overlay-veil)',
    color: 'var(--text-muted)',
    border: '1px solid var(--border-subtle)'
  }
};
function Badge({
  tone = 'neutral',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '5px 10px',
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-control)',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  font: 'var(--type-label)',
  letterSpacing: 'var(--ls-label)',
  textTransform: 'uppercase',
  border: '1px solid transparent',
  borderRadius: 'var(--radius-control)',
  cursor: 'pointer',
  transition: 'var(--transition-control), box-shadow var(--dur-fast) var(--ease-standard)',
  textDecoration: 'none',
  whiteSpace: 'nowrap'
};
const sizes = {
  sm: {
    padding: '9px 16px',
    fontSize: 'var(--fs-micro)'
  },
  md: {
    padding: '13px 26px',
    fontSize: 'var(--fs-micro)'
  },
  lg: {
    padding: '17px 38px',
    fontSize: 'var(--fs-caption)'
  }
};
const variants = {
  primary: {
    background: 'var(--ink-900)',
    color: 'var(--text-inverse)',
    borderColor: 'var(--ink-900)'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text-strong)',
    borderColor: 'var(--border-strong)'
  },
  brass: {
    background: 'var(--brass-500)',
    color: 'var(--paper-000)',
    borderColor: 'var(--brass-500)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-body)',
    borderColor: 'transparent'
  },
  link: {
    background: 'transparent',
    color: 'var(--text-strong)',
    borderColor: 'transparent',
    padding: '0',
    borderBottom: '1px solid var(--border-strong)',
    borderRadius: 0,
    letterSpacing: 'var(--ls-wide)'
  }
};
const hovers = {
  primary: {
    background: 'var(--ink-700)',
    borderColor: 'var(--ink-700)'
  },
  secondary: {
    background: 'var(--ink-900)',
    color: 'var(--text-inverse)',
    borderColor: 'var(--ink-900)'
  },
  brass: {
    background: 'var(--brass-600)',
    borderColor: 'var(--brass-600)'
  },
  ghost: {
    color: 'var(--brass-600)'
  },
  link: {
    color: 'var(--brass-600)',
    borderBottomColor: 'var(--brass-500)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  href,
  icon,
  iconPosition = 'left',
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(press && !disabled ? {
      transform: 'translateY(1px)',
      boxShadow: 'var(--inset-press)'
    } : null),
    ...(fullWidth ? {
      width: '100%'
    } : null),
    ...(disabled ? {
      opacity: .38,
      cursor: 'not-allowed'
    } : null),
    ...style
  };
  const Tag = href ? 'a' : 'button';
  const glyph = icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 16,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, icon) : null;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: Tag === 'button' ? disabled : undefined,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), iconPosition === 'left' && glyph, children, iconPosition === 'right' && glyph);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ArtistCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ArtistCard({
  name,
  portrait,
  signature,
  blurb,
  ctaLabel,
  href = '#',
  onOpen,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gap: 'var(--space-5)',
      background: 'var(--surface-card)',
      boxShadow: hover ? 'var(--shadow-lift)' : 'var(--shadow-hairline)',
      transition: 'box-shadow var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '3 / 4',
      overflow: 'hidden',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: portrait,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(var(--zoom-image-hover))' : 'scale(1)',
      transition: 'var(--transition-image)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-5) var(--space-6)',
      display: 'grid',
      gap: 'var(--space-4)',
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-section)',
      fontSize: 'var(--fs-h3)'
    }
  }, name), signature && /*#__PURE__*/React.createElement("img", {
    src: signature,
    alt: "",
    style: {
      height: 34,
      opacity: .8,
      filter: 'grayscale(1)'
    }
  }), blurb && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-loose)'
    }
  }, blurb), ctaLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "link",
    href: href,
    onClick: onOpen ? e => {
      e.preventDefault();
      onOpen();
    } : undefined
  }, ctaLabel)));
}
Object.assign(__ds_scope, { ArtistCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ArtistCard.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  label,
  badge,
  size = 40,
  variant = 'plain',
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    plain: {
      background: 'transparent',
      color: hover ? 'var(--brass-600)' : 'var(--text-strong)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: hover ? 'var(--paper-000)' : 'var(--text-strong)',
      border: '1px solid var(--border-strong)',
      backgroundColor: hover ? 'var(--ink-900)' : 'transparent'
    },
    onImage: {
      background: hover ? 'var(--paper-000)' : 'var(--overlay-veil)',
      color: 'var(--text-strong)',
      border: '1px solid transparent',
      backdropFilter: 'blur(6px)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-control)',
      cursor: 'pointer',
      transition: 'var(--transition-control)',
      ...tones[variant],
      ...style
    }
  }, rest), children, badge != null && badge !== 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      right: 0,
      minWidth: 16,
      height: 16,
      padding: '0 4px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--ink-900)',
      color: 'var(--text-inverse)',
      font: 'var(--type-label)',
      fontSize: 'var(--fs-micro)',
      letterSpacing: 0
    }
  }, badge));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  as = 'input',
  rows = 4,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const Tag = as;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 'var(--space-2)'
    }
  }, label), /*#__PURE__*/React.createElement(Tag, _extends({
    rows: as === 'textarea' ? rows : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: '12px 14px',
      font: 'var(--type-body)',
      color: 'var(--text-strong)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-control)',
      border: '1px solid ' + (error ? 'var(--danger-600)' : focus ? 'var(--border-strong)' : 'var(--border-subtle)'),
      outline: 'none',
      transition: 'var(--transition-control)',
      resize: as === 'textarea' ? 'vertical' : undefined
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-2)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: error ? 'var(--danger-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Price.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fmt = v => new Intl.NumberFormat('nl-BE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(v).replace(',', '.') + '\u00A0€';
function Price({
  amount,
  compareAt,
  size = 'md',
  align = 'left',
  style,
  ...rest
}) {
  const scale = {
    sm: 'var(--fs-body-sm)',
    md: 'var(--fs-body-lg)',
    lg: 'var(--fs-h3)'
  }[size];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-3)',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-price)',
      fontSize: scale,
      color: 'var(--text-price)'
    }
  }, fmt(amount)), compareAt > amount && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      textDecoration: 'line-through'
    }
  }, fmt(compareAt)));
}
Object.assign(__ds_scope, { Price });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Price.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProductCard({
  title,
  designer,
  image,
  hoverImage,
  amount,
  compareAt,
  badge,
  badgeTone = 'brass',
  soldOut = false,
  href = '#',
  onOpen,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: e => {
      if (onOpen) {
        e.preventDefault();
        onOpen();
      }
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      textDecoration: 'none',
      border: 'none',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card)',
      boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow-hairline)',
      transition: 'box-shadow var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1 / 1',
      overflow: 'hidden',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: hover && hoverImage ? hoverImage : image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(var(--zoom-image-hover))' : 'scale(1)',
      transition: 'var(--transition-image)',
      opacity: soldOut ? .62 : 1
    }
  }), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--space-3)',
      left: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badgeTone
  }, badge)), soldOut && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--space-3)',
      right: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "soldOut"
  }, "Sold out"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-4) var(--space-6)',
      display: 'grid',
      gap: 'var(--space-2)',
      textAlign: 'center'
    }
  }, designer && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, designer), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-product-title)'
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: amount,
    compareAt: compareAt,
    align: "center"
  })));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  rule = false,
  style,
  children,
  ...rest
}) {
  const centered = align === 'center';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: centered ? 'center' : 'left',
      maxWidth: centered ? 'var(--container-narrow)' : '56ch',
      margin: centered ? '0 auto' : '0',
      display: 'grid',
      gap: 'var(--space-4)',
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-section)',
      letterSpacing: 'var(--ls-display)'
    }
  }, title), rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 1,
      background: 'var(--border-accent)',
      margin: centered ? '0 auto' : '0'
    }
  }), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-loose)'
    }
  }, intro), children);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? tabs[0]?.id);
  const active = value ?? internal;
  const pick = id => {
    setInternal(id);
    onChange && onChange(id);
  };
  const current = tabs.find(t => t.id === active);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => pick(t.id),
    style: {
      background: 'none',
      border: 'none',
      padding: '0 0 14px',
      cursor: 'pointer',
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: t.id === active ? 'var(--text-strong)' : 'var(--text-muted)',
      boxShadow: t.id === active ? 'inset 0 -1px 0 var(--ink-900)' : 'none',
      transition: 'var(--transition-control)'
    }
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--space-6)',
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-loose)'
    }
  }, current && current.content));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/CartScreen.jsx
try { (() => {
const {
  Button,
  Price,
  QuantityStepper,
  Input,
  SectionHeading
} = window.ArtDecorisDesignSystem_246c33;
function CartScreen({
  lines,
  onQty,
  onRemove,
  onGo
}) {
  const subtotal = lines.reduce((s, l) => s + l.amount * l.qty, 0);
  if (!lines.length) return /*#__PURE__*/React.createElement("main", {
    className: "ad-container",
    style: {
      padding: 'var(--space-12) var(--gutter-lg)',
      display: 'grid',
      gap: 'var(--space-6)',
      justifyItems: 'start',
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Shopping cart",
    title: "Your cart is still empty",
    intro: "Every item in our collection is more than just decoration \u2014 it is a true work of art. Start with the wall art."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onGo('collection')
  }, "Shop our products"));
  return /*#__PURE__*/React.createElement("main", {
    className: "ad-container",
    style: {
      padding: 'var(--space-9) var(--gutter-lg) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Shopping cart",
    title: "Your selection"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      gap: 'var(--space-10)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr auto auto',
      gap: 'var(--space-6)',
      alignItems: 'center',
      padding: 'var(--space-6) 0',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.image,
    alt: "",
    style: {
      width: 120,
      aspectRatio: '1',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, l.designer), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-product-title)'
    }
  }, l.title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, l.size), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(i),
    style: {
      justifySelf: 'start',
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, "Remove")), /*#__PURE__*/React.createElement(QuantityStepper, {
    value: l.qty,
    onChange: q => onQty(i, q)
  }), /*#__PURE__*/React.createElement(Price, {
    amount: l.amount * l.qty
  })))), /*#__PURE__*/React.createElement("aside", {
    style: {
      background: 'var(--surface-sunken)',
      padding: 'var(--space-7)',
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-section)',
      fontSize: 'var(--fs-h3)'
    }
  }, "Order summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Subtotal"), /*#__PURE__*/React.createElement(Price, {
    amount: subtotal,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Delivery"), /*#__PURE__*/React.createElement("span", null, "Calculated at checkout"))), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      background: 'var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase'
    }
  }, "Total"), /*#__PURE__*/React.createElement(Price, {
    amount: subtotal,
    size: "lg"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true
  }, "Checkout"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: () => onGo('collection')
  }, "Continue shopping"), /*#__PURE__*/React.createElement(Input, {
    label: "Discount code",
    placeholder: "Enter code"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, "15-days money-back guarantee \xB7 Delivery 2\u20133 business days"))));
}
function CustomArtScreen({
  onGo
}) {
  const IMG = window.AD_IMAGES;
  const steps = [{
    img: IMG.customWall,
    title: 'Consultation',
    body: 'We visit your location to get to know each other and to collect your vision and preferences together.'
  }, {
    img: IMG.artistBrass,
    title: 'Design proposal',
    body: 'The artist works from your input and presents a design proposal that fits your aesthetics, vibe and space.'
  }, {
    img: IMG.deferlaBrass,
    title: 'Creation',
    body: 'On a scheduled date our artist arrives on location to transform the space or object. Prepare for many ‘ohs and ahs’.'
  }];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 520,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.customRoom,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--gradient-protect)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ad-container",
    style: {
      position: 'relative',
      height: '100%',
      display: 'grid',
      alignContent: 'end',
      gap: 'var(--space-5)',
      paddingBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-eyebrow",
    style: {
      color: 'var(--paper-200)'
    }
  }, "Custom made"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-hero)',
      fontSize: 'var(--fs-display-2)',
      color: 'var(--paper-000)',
      maxWidth: '22ch'
    }
  }, "Do you want exclusivity with a custom-made art work?"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-lg)',
      color: 'var(--paper-100)',
      maxWidth: '54ch'
    }
  }, "Perfectly tailored to your style, home or space \u2014 in collaboration with one of our contemporary top artists."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "brass",
    size: "lg"
  }, "I\u2019m interested")))), /*#__PURE__*/React.createElement("section", {
    className: "ad-container",
    style: {
      padding: 'var(--section-y) var(--gutter-lg) 0',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-8)'
    }
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.title,
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.img,
    alt: "",
    style: {
      width: '100%',
      aspectRatio: '4 / 3',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-section)',
      fontSize: 'var(--fs-h3)'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-loose)'
    }
  }, s.body), /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, "I\u2019m interested")))), /*#__PURE__*/React.createElement("section", {
    className: "ad-container",
    style: {
      padding: 'var(--section-y) var(--gutter-lg) 0',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    rule: true,
    title: "Have an idea, bring it to life",
    intro: "Let our talented artists bring your idea to life. Let\u2019s create something truly extraordinary together."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onGo('collection')
  }, "Tell me more"))));
}
Object.assign(window, {
  CartScreen,
  CustomArtScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/CartScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Chrome.jsx
try { (() => {
const {
  IconButton,
  Button,
  Input
} = window.ArtDecorisDesignSystem_246c33;
const IMG = window.AD_IMAGES;
function Icon({
  name,
  size = 20,
  color
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide && window.lucide.icons[name]) ref.current.innerHTML = window.lucide.createElement(window.lucide.icons[name], {
      width: size,
      height: size,
      'stroke-width': 1.5
    }).outerHTML;
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      color
    }
  });
}
const NAV = [{
  id: 'shop',
  label: 'Shop our products'
}, {
  id: 'designers',
  label: 'Designers'
}, {
  id: 'story',
  label: 'Our story'
}, {
  id: 'custom',
  label: 'Custom made'
}];
function MegaMenu({
  onGo
}) {
  const col = (title, links) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)',
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      background: 'var(--border-hairline)'
    }
  }), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onGo('collection');
    },
    style: {
      border: 'none',
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '100%',
      zIndex: 20,
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border-hairline)',
      boxShadow: 'var(--shadow-overlay)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ad-container",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-10)',
      padding: 'var(--space-8) var(--gutter-lg)'
    }
  }, col('home deco', ['Candles', 'Cushions Indoor', 'Diffusers', 'Lighting', 'Wall art']), col('outdoor deco', ['Beanbags', 'Cushions Outdoor']), col('Shop by artist', ['Anne Mondy', 'B.R.A.S.S.', 'Juan de Lascurain'])));
}
function Header({
  route,
  onGo,
  cartCount = 0,
  wishCount = 0
}) {
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-hairline)'
    },
    onMouseLeave: () => setOpen(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-900)',
      color: 'var(--paper-100)',
      textAlign: 'center',
      padding: '9px 0',
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      fontSize: 'var(--fs-micro)'
    }
  }, "15-days money-back guarantee \xB7 Delivery 2\u20133 business days"), /*#__PURE__*/React.createElement("div", {
    className: "ad-container",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)',
      height: 96,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onGo('home');
    },
    style: {
      border: 'none',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "Art Decoris",
    style: {
      height: 62,
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      flex: 1
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    href: "#",
    onMouseEnter: () => setOpen(n.id === 'shop' ? 'shop' : null),
    onClick: e => {
      e.preventDefault();
      onGo(n.id === 'shop' ? 'collection' : n.id === 'custom' ? 'custom' : n.id === 'story' ? 'story' : 'collection');
    },
    style: {
      border: 'none',
      font: 'var(--type-label)',
      fontSize: 'var(--fs-caption)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: route === n.id ? 'var(--text-strong)' : 'var(--text-body)',
      paddingBottom: 2,
      borderBottom: '1px solid ' + (route === n.id ? 'var(--border-strong)' : 'transparent')
    }
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Search"
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Sign in"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "User"
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "My Wishlist",
    badge: wishCount
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Heart"
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "My Cart",
    badge: cartCount,
    onClick: () => onGo('cart')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ShoppingBag"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 24,
      background: 'var(--border-hairline)',
      margin: '0 var(--space-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "EN"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    style: {
      marginLeft: 'var(--space-4)'
    }
  }, "Contact")), open === 'shop' && /*#__PURE__*/React.createElement(MegaMenu, {
    onGo: onGo
  })));
}
function Footer() {
  const list = (title, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)',
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--paper-300)'
    }
  }, title), items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      border: 'none',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--paper-100)'
    }
  }, i)));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--paper-100)',
      marginTop: 'var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ad-container",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1.2fr',
      gap: 'var(--space-10)',
      padding: 'var(--space-11) var(--gutter-lg) var(--space-9)'
    }
  }, list('Our Collection', ['Candles', 'Cushions', 'Diffusers', 'Bean Bags', 'Wall art Anne Mondy', 'Wall art Juan de Lascurain', 'Wall art BRASS', 'Custom art']), list('Account Info', ['Refunds & replacements', 'Privacy statement', 'B2B portal', 'Terms & conditions', 'Blog', 'FAQ']), list('Contacts', ['info@artdecoris.com', '+32 3 361 63 80']), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-4)',
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--paper-300)'
    }
  }, "Subscribe to our newsletter"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--paper-300)'
    }
  }, "Be the first to find out all the latest news, products, and trends."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Your email",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "brass"
  }, "Subscribe")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-2)',
      color: 'var(--paper-300)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Linkedin"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "Instagram"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "Youtube"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ad-container",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--space-5) var(--gutter-lg)',
      borderTop: '1px solid rgba(255,255,255,.12)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--paper-300)'
    }
  }, "Copyright \xA9 ArtDecoris \u2014 Made In Art"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "Art Decoris",
    style: {
      height: 56,
      filter: 'invert(1)',
      opacity: .92
    }
  })));
}
Object.assign(window, {
  Icon,
  Header,
  Footer,
  MegaMenu
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/CollectionScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  SectionHeading,
  ProductCard,
  Badge
} = window.ArtDecorisDesignSystem_246c33;
const FILTERS = [{
  label: 'Category',
  options: ['Wall art', 'Candles', 'Diffusers', 'Cushions', 'Bean bags', 'Lighting']
}, {
  label: 'Designer',
  options: ['Anne Mondy', 'B.R.A.S.S.', 'Juan de Lascurain']
}, {
  label: 'Size',
  options: ['40 x 60 cm', '60 x 90 cm', '80 x 120 cm']
}];
function CollectionScreen({
  onOpenProduct
}) {
  const [active, setActive] = React.useState('Wall art');
  const [sort, setSort] = React.useState('Featured');
  const products = window.AD_PRODUCTS.concat(window.AD_PRODUCTS.map((p, i) => ({
    ...p,
    id: p.id + '-b',
    title: p.title.replace('Wall Decoration', 'Plexi Edition'),
    badge: i === 1 ? 'New' : undefined,
    soldOut: false
  })));
  return /*#__PURE__*/React.createElement("main", {
    className: "ad-container",
    style: {
      padding: 'var(--space-8) var(--gutter-lg) 0'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      border: 'none',
      color: 'var(--text-muted)'
    }
  }, "Home"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "Shop"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)'
    }
  }, active)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Shop",
    title: active,
    intro: "Take your interior to the next level with our exclusive plexiglass wall decorations, featuring gems from our contemporary artists."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      gap: 'var(--space-10)',
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'grid',
      gap: 'var(--space-8)',
      alignContent: 'start'
    }
  }, FILTERS.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.label,
    style: {
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, f.label), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      background: 'var(--border-hairline)'
    }
  }), f.options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o,
    onClick: () => setActive(o),
    style: {
      textAlign: 'left',
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: o === active ? 'var(--text-strong)' : 'var(--text-body)'
    }
  }, o === active ? '— ' : '', o))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-hairline)',
      paddingBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, products.length, " pieces"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)'
    }
  }, ['Featured', 'Newest', 'Price ascending'].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => setSort(s),
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: s === sort ? 'var(--text-strong)' : 'var(--text-muted)'
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--grid-product-gap)',
      marginTop: 'var(--space-7)'
    }
  }, products.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    onOpen: () => onOpenProduct(p.id.replace('-b', ''))
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-10)'
    }
  }, ['1', '2', '3'].map((n, i) => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      width: 34,
      height: 34,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid ' + (i === 0 ? 'var(--border-strong)' : 'var(--border-hairline)'),
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: i === 0 ? 'var(--text-strong)' : 'var(--text-muted)'
    }
  }, n))))));
}
Object.assign(window, {
  CollectionScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/CollectionScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  SectionHeading,
  ProductCard,
  CategoryTile,
  ArtistCard,
  ValueProp
} = window.ArtDecorisDesignSystem_246c33;
const AD_PRODUCTS = [{
  id: 'bici',
  title: 'Wall Decoration Bici',
  designer: 'Juan de Lascurain',
  amount: 98.35,
  compareAt: 119,
  image: window.AD_IMAGES.pdpBici,
  hoverImage: window.AD_IMAGES.pdpBiciXL,
  badge: 'Limited edition'
}, {
  id: 'flowers',
  title: 'Wall Decoration Flowers',
  designer: 'Juan de Lascurain',
  amount: 98.35,
  image: window.AD_IMAGES.prodFlowers
}, {
  id: 'ojitos',
  title: 'Wall Decoration Ojitos',
  designer: 'Juan de Lascurain',
  amount: 98.35,
  image: window.AD_IMAGES.prodOjitos
}, {
  id: 'hearts',
  title: 'Wall Decoration Hearts',
  designer: 'Anne Mondy',
  amount: 98.35,
  image: window.AD_IMAGES.prodHearts,
  soldOut: true
}];
function HomeScreen({
  onGo,
  onOpenProduct
}) {
  const IMG = window.AD_IMAGES;
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 640,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.storyRoom,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--gradient-protect)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ad-container",
    style: {
      position: 'relative',
      height: '100%',
      display: 'grid',
      alignContent: 'end',
      gap: 'var(--space-6)',
      paddingBottom: 'var(--space-11)',
      maxWidth: 'var(--container-max)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-eyebrow",
    style: {
      color: 'var(--paper-200)'
    }
  }, "Made in art"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-hero)',
      color: 'var(--paper-000)',
      maxWidth: '18ch'
    }
  }, "An exclusive interior piece by an artist in your home?"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-lg)',
      color: 'var(--paper-100)',
      maxWidth: '56ch',
      lineHeight: 'var(--lh-loose)'
    }
  }, "Thanks to a state-of-the-art digital printing method of Art Decoris, you can own interior decoration with exclusive designs by top-notch contemporary artists."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "brass",
    size: "lg",
    onClick: () => onGo('collection')
  }, "Shop our products")))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: '1px solid var(--border-hairline)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ad-container",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-8)',
      padding: 'var(--space-7) var(--gutter-lg)'
    }
  }, /*#__PURE__*/React.createElement(ValueProp, {
    icon: IMG.iconArtist,
    label: "Designs by top artists"
  }), /*#__PURE__*/React.createElement(ValueProp, {
    icon: IMG.iconCraft,
    label: "Unique interior decoration"
  }), /*#__PURE__*/React.createElement(ValueProp, {
    icon: IMG.iconInterior,
    label: "Impeccable quality"
  }), /*#__PURE__*/React.createElement(ValueProp, {
    icon: IMG.iconApproval,
    label: "Limited editions"
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ad-container",
    style: {
      padding: 'var(--section-y) var(--gutter-lg) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Collection",
    align: "center",
    rule: true,
    title: "Discover our exclusive collection",
    intro: "Create the atmosphere your home deserves with the carefully crafted interior collection from our top-notch contemporary artists."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(CategoryTile, {
    label: "Wall Art",
    image: IMG.catWallArt,
    onOpen: () => onGo('collection')
  }), /*#__PURE__*/React.createElement(CategoryTile, {
    label: "Diffusers",
    image: IMG.catDiffuser,
    onOpen: () => onGo('collection')
  }), /*#__PURE__*/React.createElement(CategoryTile, {
    label: "Cushions",
    image: IMG.catCushion,
    onOpen: () => onGo('collection')
  }), /*#__PURE__*/React.createElement(CategoryTile, {
    label: "Bean bags",
    image: IMG.catBeanbag,
    onOpen: () => onGo('collection')
  }), /*#__PURE__*/React.createElement(CategoryTile, {
    label: "Candles",
    image: IMG.catCandle,
    onOpen: () => onGo('collection')
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ad-container",
    style: {
      padding: 'var(--section-y) var(--gutter-lg) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Bestsellers",
    title: "Fresh from the atelier"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--grid-product-gap)',
      marginTop: 'var(--space-8)'
    }
  }, AD_PRODUCTS.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    onOpen: () => onOpenProduct(p.id)
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "ad-container",
    style: {
      padding: 'var(--section-y) var(--gutter-lg) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    rule: true,
    title: "We work with Top Notch Artists",
    intro: "Our exclusive collections are created through collaborations with state-of-the-art designers, with established names from the art world. Who do we work with?"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-8)',
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(ArtistCard, {
    name: "BRASS",
    portrait: IMG.artistBrass,
    signature: IMG.sigBrass,
    ctaLabel: "Shop BRASS",
    onOpen: () => onGo('collection')
  }), /*#__PURE__*/React.createElement(ArtistCard, {
    name: "Juan de Lascurain",
    portrait: IMG.artistJuan,
    signature: IMG.sigJuan,
    ctaLabel: "Shop Juan",
    onOpen: () => onGo('collection')
  }), /*#__PURE__*/React.createElement(ArtistCard, {
    name: "Anne Mondy",
    portrait: IMG.artistAnne,
    signature: IMG.sigAnne,
    ctaLabel: "Shop Anne",
    onOpen: () => onGo('collection'),
    blurb: "A French based artist. You will recognize her work by its vibrant colors and organic shapes."
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 'var(--section-y)',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ad-container",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-11)',
      alignItems: 'center',
      padding: 'var(--space-11) var(--gutter-lg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.deferlaBrass,
    alt: "",
    style: {
      width: '100%',
      aspectRatio: '4 / 3',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-5)',
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-eyebrow"
  }, "Highlights"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-section)'
    }
  }, "Custom Made Art"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-loose)',
      maxWidth: '52ch'
    }
  }, "A unique masterpiece on your wall? You won\u2019t find a second one of our custom-made artworks anywhere else and exclusivity is guaranteed."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onGo('custom')
  }, "Discover more")))), /*#__PURE__*/React.createElement("section", {
    className: "ad-container",
    style: {
      padding: 'var(--section-y) var(--gutter-lg) 0',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16 / 10',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.catalogue,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--gradient-protect)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--space-7)',
      bottom: 'var(--space-7)',
      display: 'grid',
      gap: 'var(--space-4)',
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-section)',
      fontSize: 'var(--fs-h3)',
      color: 'var(--paper-000)'
    }
  }, "View our Collection"), /*#__PURE__*/React.createElement(Button, {
    variant: "brass",
    size: "sm"
  }, "Request for free"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16 / 10',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.heroAnne,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--gradient-protect)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--space-7)',
      bottom: 'var(--space-7)',
      display: 'grid',
      gap: 'var(--space-4)',
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-section)',
      fontSize: 'var(--fs-h3)',
      color: 'var(--paper-000)'
    }
  }, "Meet Anne Mondy"), /*#__PURE__*/React.createElement(Button, {
    variant: "brass",
    size: "sm"
  }, "Discover more")))));
}
Object.assign(window, {
  HomeScreen,
  AD_PRODUCTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/ProductScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Price,
  Badge,
  Tabs,
  SpecTable,
  SizeSelector,
  QuantityStepper,
  ProductCard,
  Input
} = window.ArtDecorisDesignSystem_246c33;
function ProductScreen({
  productId = 'bici',
  onAdd,
  onOpenProduct
}) {
  const IMG = window.AD_IMAGES;
  const gallery = [IMG.pdpBici, IMG.pdpBiciXL, IMG.pdpBici3x, IMG.pdpFrame, IMG.pdpBack];
  const [shot, setShot] = React.useState(0);
  const [size, setSize] = React.useState('40 x 60 cm');
  const [qty, setQty] = React.useState(1);
  const product = (window.AD_PRODUCTS || []).find(p => p.id === productId) || {
    title: 'Wall Decoration Bici',
    designer: 'Juan de Lascurain',
    amount: 98.35,
    compareAt: 119
  };
  return /*#__PURE__*/React.createElement("main", {
    className: "ad-container",
    style: {
      padding: 'var(--space-8) var(--gutter-lg) 0'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Home"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "Shop"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)'
    }
  }, product.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '88px 1fr 420px',
      gap: 'var(--space-8)',
      marginTop: 'var(--space-7)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, gallery.map((g, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setShot(i),
    style: {
      padding: 0,
      cursor: 'pointer',
      background: 'none',
      border: '1px solid ' + (i === shot ? 'var(--border-strong)' : 'var(--border-hairline)')
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: g,
    alt: "",
    style: {
      width: '100%',
      aspectRatio: '1',
      objectFit: 'cover'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: gallery[shot],
    alt: product.title,
    style: {
      width: '100%',
      aspectRatio: '4 / 5',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--space-4)',
      left: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brass"
  }, "Limited edition"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-6)',
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-eyebrow"
  }, "Design by ", product.designer), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-section)',
      fontSize: 'var(--fs-h1)'
    }
  }, product.title), /*#__PURE__*/React.createElement(Price, {
    amount: product.amount,
    compareAt: product.compareAt,
    size: "lg"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-loose)'
    }
  }, "Take your interior to the next level with our exclusive plexiglass wall decorations, featuring gems from our contemporary artists."), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      background: 'var(--border-hairline)'
    }
  }), /*#__PURE__*/React.createElement(SizeSelector, {
    label: "Size",
    options: ['40 x 60 cm', '60 x 90 cm', '80 x 120 cm'],
    value: size,
    onChange: setSize
  }), /*#__PURE__*/React.createElement(SizeSelector, {
    label: "Designer",
    options: [product.designer]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    style: {
      flex: 1
    },
    onClick: () => onAdd({
      ...product,
      size,
      qty
    })
  }, "Add to Cart")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Add to wishlist"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Compare"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Share")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-sunken)',
      padding: 'var(--space-5)',
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Out of stock \u2014 worth the wait"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-body)'
    }
  }, "Leave your email address below and we\u2019ll notify you once the product is back in stock."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "you@example.com",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Notify me"))), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 'var(--space-2)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("li", null, "15-days money-back guarantee"), /*#__PURE__*/React.createElement("li", null, "Delivery time: 2\u20133 business days")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--section-y-sm)',
      maxWidth: 860
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: 'desc',
      label: 'Description',
      content: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gap: 'var(--space-4)'
        }
      }, /*#__PURE__*/React.createElement("p", null, "These unique works of art combine the sleek, modern look of plexiglass with the profound expression of contemporary art. Available in a variety of sizes, each product offers a striking, vibrant display of color and detail, transforming your space into a gallery of refined taste."), /*#__PURE__*/React.createElement("p", null, "Perfect for the true art lover looking for something special, an eye-catcher that intrigues both visually and emotionally."), /*#__PURE__*/React.createElement("p", {
        style: {
          color: 'var(--text-strong)'
        }
      }, /*#__PURE__*/React.createElement("strong", null, "Complete the experience with a matching candle or diffuser.")))
    }, {
      id: 'spec',
      label: 'Specifications',
      content: /*#__PURE__*/React.createElement(SpecTable, {
        rows: [{
          label: 'Size',
          value: '40 x 60 cm or 60 x 90 cm or 80 x 120 cm'
        }, {
          label: 'Designer',
          value: product.designer
        }, {
          label: 'Tags',
          value: 'Wall Decoration, Juan De Lascurain'
        }]
      })
    }, {
      id: 'tech',
      label: 'Technical specifications',
      content: /*#__PURE__*/React.createElement("p", {
        style: {
          color: 'var(--text-muted)'
        }
      }, "TBC \u2014 not published on the source site.")
    }]
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 'var(--section-y-sm)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-section)',
      fontSize: 'var(--fs-h3)',
      marginBottom: 'var(--space-6)'
    }
  }, "You may also like"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--grid-product-gap)'
    }
  }, (window.AD_PRODUCTS || []).map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    onOpen: () => onOpenProduct(p.id)
  }))))));
}
Object.assign(window, {
  ProductScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/ProductScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ArtistCard = __ds_scope.ArtistCard;

__ds_ns.CategoryTile = __ds_scope.CategoryTile;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.SizeSelector = __ds_scope.SizeSelector;

__ds_ns.SpecTable = __ds_scope.SpecTable;

__ds_ns.ValueProp = __ds_scope.ValueProp;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Price = __ds_scope.Price;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
