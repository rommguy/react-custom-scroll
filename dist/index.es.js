var Qt = Object.defineProperty;
var en = (e, t, n) => t in e ? Qt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var h = (e, t, n) => (en(e, typeof t != "symbol" ? t + "" : t, n), n);
import { jsx as B, jsxs as tn } from "react/jsx-runtime";
import ue, { useRef as nn, useDebugValue as nt, createElement as rn, useContext as on, Component as sn, createRef as ae } from "react";
var H = function() {
  return H = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, H.apply(this, arguments);
};
function K(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, s; r < o; r++)
      (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
function an(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var cn = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, ln = /* @__PURE__ */ an(
  function(e) {
    return cn.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), b = "-ms-", le = "-moz-", g = "-webkit-", wt = "comm", Ee = "rule", qe = "decl", un = "@import", Ct = "@keyframes", hn = "@layer", Pt = Math.abs, Xe = String.fromCharCode, Le = Object.assign;
function pn(e, t) {
  return T(e, 0) ^ 45 ? (((t << 2 ^ T(e, 0)) << 2 ^ T(e, 1)) << 2 ^ T(e, 2)) << 2 ^ T(e, 3) : 0;
}
function kt(e) {
  return e.trim();
}
function M(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function l(e, t, n) {
  return e.replace(t, n);
}
function ve(e, t, n) {
  return e.indexOf(t, n);
}
function T(e, t) {
  return e.charCodeAt(t) | 0;
}
function Z(e, t, n) {
  return e.slice(t, n);
}
function I(e) {
  return e.length;
}
function Et(e) {
  return e.length;
}
function ce(e, t) {
  return t.push(e), e;
}
function dn(e, t) {
  return e.map(t).join("");
}
function rt(e, t) {
  return e.filter(function(n) {
    return !M(n, t);
  });
}
var Re = 1, J = 1, Rt = 0, D = 0, x = 0, ne = "";
function xe(e, t, n, r, o, s, i, a) {
  return { value: e, root: t, parent: n, type: r, props: o, children: s, line: Re, column: J, length: i, return: "", siblings: a };
}
function j(e, t) {
  return Le(xe("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function X(e) {
  for (; e.root; )
    e = j(e.root, { children: [e] });
  ce(e, e.siblings);
}
function fn() {
  return x;
}
function gn() {
  return x = D > 0 ? T(ne, --D) : 0, J--, x === 10 && (J = 1, Re--), x;
}
function O() {
  return x = D < Rt ? T(ne, D++) : 0, J++, x === 10 && (J = 1, Re++), x;
}
function Y() {
  return T(ne, D);
}
function Se() {
  return D;
}
function Te(e, t) {
  return Z(ne, e, t);
}
function Be(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function mn(e) {
  return Re = J = 1, Rt = I(ne = e), D = 0, [];
}
function yn(e) {
  return ne = "", e;
}
function Me(e) {
  return kt(Te(D - 1, Fe(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function vn(e) {
  for (; (x = Y()) && x < 33; )
    O();
  return Be(e) > 2 || Be(x) > 3 ? "" : " ";
}
function Sn(e, t) {
  for (; --t && O() && !(x < 48 || x > 102 || x > 57 && x < 65 || x > 70 && x < 97); )
    ;
  return Te(e, Se() + (t < 6 && Y() == 32 && O() == 32));
}
function Fe(e) {
  for (; O(); )
    switch (x) {
      case e:
        return D;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Fe(x);
        break;
      case 40:
        e === 41 && Fe(e);
        break;
      case 92:
        O();
        break;
    }
  return D;
}
function bn(e, t) {
  for (; O() && e + x !== 57; )
    if (e + x === 84 && Y() === 47)
      break;
  return "/*" + Te(t, D - 1) + "*" + Xe(e === 47 ? e : O());
}
function wn(e) {
  for (; !Be(Y()); )
    O();
  return Te(e, D);
}
function Cn(e) {
  return yn(be("", null, null, null, [""], e = mn(e), 0, [0], e));
}
function be(e, t, n, r, o, s, i, a, c) {
  for (var p = 0, m = 0, f = i, y = 0, v = 0, C = 0, E = 1, N = 1, R = 1, P = 0, S = "", w = o, k = s, d = r, u = S; N; )
    switch (C = P, P = O()) {
      case 40:
        if (C != 108 && T(u, f - 1) == 58) {
          ve(u += l(Me(P), "&", "&\f"), "&\f", Pt(p ? a[p - 1] : 0)) != -1 && (R = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        u += Me(P);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        u += vn(C);
        break;
      case 92:
        u += Sn(Se() - 1, 7);
        continue;
      case 47:
        switch (Y()) {
          case 42:
          case 47:
            ce(Pn(bn(O(), Se()), t, n, c), c);
            break;
          default:
            u += "/";
        }
        break;
      case 123 * E:
        a[p++] = I(u) * R;
      case 125 * E:
      case 59:
      case 0:
        switch (P) {
          case 0:
          case 125:
            N = 0;
          case 59 + m:
            R == -1 && (u = l(u, /\f/g, "")), v > 0 && I(u) - f && ce(v > 32 ? st(u + ";", r, n, f - 1, c) : st(l(u, " ", "") + ";", r, n, f - 2, c), c);
            break;
          case 59:
            u += ";";
          default:
            if (ce(d = ot(u, t, n, p, m, o, a, S, w = [], k = [], f, s), s), P === 123)
              if (m === 0)
                be(u, t, d, d, w, s, f, a, k);
              else
                switch (y === 99 && T(u, 3) === 110 ? 100 : y) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    be(e, d, d, r && ce(ot(e, d, d, 0, 0, o, a, S, o, w = [], f, k), k), o, k, f, a, r ? w : k);
                    break;
                  default:
                    be(u, d, d, d, [""], k, 0, a, k);
                }
        }
        p = m = v = 0, E = R = 1, S = u = "", f = i;
        break;
      case 58:
        f = 1 + I(u), v = C;
      default:
        if (E < 1) {
          if (P == 123)
            --E;
          else if (P == 125 && E++ == 0 && gn() == 125)
            continue;
        }
        switch (u += Xe(P), P * E) {
          case 38:
            R = m > 0 ? 1 : (u += "\f", -1);
            break;
          case 44:
            a[p++] = (I(u) - 1) * R, R = 1;
            break;
          case 64:
            Y() === 45 && (u += Me(O())), y = Y(), m = f = I(S = u += wn(Se())), P++;
            break;
          case 45:
            C === 45 && I(u) == 2 && (E = 0);
        }
    }
  return s;
}
function ot(e, t, n, r, o, s, i, a, c, p, m, f) {
  for (var y = o - 1, v = o === 0 ? s : [""], C = Et(v), E = 0, N = 0, R = 0; E < r; ++E)
    for (var P = 0, S = Z(e, y + 1, y = Pt(N = i[E])), w = e; P < C; ++P)
      (w = kt(N > 0 ? v[P] + " " + S : l(S, /&\f/g, v[P]))) && (c[R++] = w);
  return xe(e, t, n, o === 0 ? Ee : a, c, p, m, f);
}
function Pn(e, t, n, r) {
  return xe(e, t, n, wt, Xe(fn()), Z(e, 2, -2), 0, r);
}
function st(e, t, n, r, o) {
  return xe(e, t, n, qe, Z(e, 0, r), Z(e, r + 1, -1), r, o);
}
function xt(e, t, n) {
  switch (pn(e, t)) {
    case 5103:
      return g + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return g + e + e;
    case 4789:
      return le + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return g + e + le + e + b + e + e;
    case 5936:
      switch (T(e, t + 11)) {
        case 114:
          return g + e + b + l(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return g + e + b + l(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return g + e + b + l(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    case 6828:
    case 4268:
    case 2903:
      return g + e + b + e + e;
    case 6165:
      return g + e + b + "flex-" + e + e;
    case 5187:
      return g + e + l(e, /(\w+).+(:[^]+)/, g + "box-$1$2" + b + "flex-$1$2") + e;
    case 5443:
      return g + e + b + "flex-item-" + l(e, /flex-|-self/g, "") + (M(e, /flex-|baseline/) ? "" : b + "grid-row-" + l(e, /flex-|-self/g, "")) + e;
    case 4675:
      return g + e + b + "flex-line-pack" + l(e, /align-content|flex-|-self/g, "") + e;
    case 5548:
      return g + e + b + l(e, "shrink", "negative") + e;
    case 5292:
      return g + e + b + l(e, "basis", "preferred-size") + e;
    case 6060:
      return g + "box-" + l(e, "-grow", "") + g + e + b + l(e, "grow", "positive") + e;
    case 4554:
      return g + l(e, /([^-])(transform)/g, "$1" + g + "$2") + e;
    case 6187:
      return l(l(l(e, /(zoom-|grab)/, g + "$1"), /(image-set)/, g + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return l(e, /(image-set\([^]*)/, g + "$1$`$1");
    case 4968:
      return l(l(e, /(.+:)(flex-)?(.*)/, g + "box-pack:$3" + b + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + g + e + e;
    case 4200:
      if (!M(e, /flex-|baseline/))
        return b + "grid-column-align" + Z(e, t) + e;
      break;
    case 2592:
    case 3360:
      return b + l(e, "template-", "") + e;
    case 4384:
    case 3616:
      return n && n.some(function(r, o) {
        return t = o, M(r.props, /grid-\w+-end/);
      }) ? ~ve(e + (n = n[t].value), "span", 0) ? e : b + l(e, "-start", "") + e + b + "grid-row-span:" + (~ve(n, "span", 0) ? M(n, /\d+/) : +M(n, /\d+/) - +M(e, /\d+/)) + ";" : b + l(e, "-start", "") + e;
    case 4896:
    case 4128:
      return n && n.some(function(r) {
        return M(r.props, /grid-\w+-start/);
      }) ? e : b + l(l(e, "-end", "-span"), "span ", "") + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return l(e, /(.+)-inline(.+)/, g + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (I(e) - 1 - t > 6)
        switch (T(e, t + 1)) {
          case 109:
            if (T(e, t + 4) !== 45)
              break;
          case 102:
            return l(e, /(.+:)(.+)-([^]+)/, "$1" + g + "$2-$3$1" + le + (T(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~ve(e, "stretch", 0) ? xt(l(e, "stretch", "fill-available"), t, n) + e : e;
        }
      break;
    case 5152:
    case 5920:
      return l(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r, o, s, i, a, c, p) {
        return b + o + ":" + s + p + (i ? b + o + "-span:" + (a ? c : +c - +s) + p : "") + e;
      });
    case 4949:
      if (T(e, t + 6) === 121)
        return l(e, ":", ":" + g) + e;
      break;
    case 6444:
      switch (T(e, T(e, 14) === 45 ? 18 : 11)) {
        case 120:
          return l(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + g + (T(e, 14) === 45 ? "inline-" : "") + "box$3$1" + g + "$2$3$1" + b + "$2box$3") + e;
        case 100:
          return l(e, ":", ":" + b) + e;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return l(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function Pe(e, t) {
  for (var n = "", r = 0; r < e.length; r++)
    n += t(e[r], r, e, t) || "";
  return n;
}
function kn(e, t, n, r) {
  switch (e.type) {
    case hn:
      if (e.children.length)
        break;
    case un:
    case qe:
      return e.return = e.return || e.value;
    case wt:
      return "";
    case Ct:
      return e.return = e.value + "{" + Pe(e.children, r) + "}";
    case Ee:
      if (!I(e.value = e.props.join(",")))
        return "";
  }
  return I(n = Pe(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function En(e) {
  var t = Et(e);
  return function(n, r, o, s) {
    for (var i = "", a = 0; a < t; a++)
      i += e[a](n, r, o, s) || "";
    return i;
  };
}
function Rn(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function xn(e, t, n, r) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case qe:
        e.return = xt(e.value, e.length, n);
        return;
      case Ct:
        return Pe([j(e, { value: l(e.value, "@", "@" + g) })], r);
      case Ee:
        if (e.length)
          return dn(n = e.props, function(o) {
            switch (M(o, r = /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                X(j(e, { props: [l(o, /:(read-\w+)/, ":" + le + "$1")] })), X(j(e, { props: [o] })), Le(e, { props: rt(n, r) });
                break;
              case "::placeholder":
                X(j(e, { props: [l(o, /:(plac\w+)/, ":" + g + "input-$1")] })), X(j(e, { props: [l(o, /:(plac\w+)/, ":" + le + "$1")] })), X(j(e, { props: [l(o, /:(plac\w+)/, b + "input-$1")] })), X(j(e, { props: [o] })), Le(e, { props: rt(n, r) });
                break;
            }
            return "";
          });
    }
}
var Tn = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, G = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", Tt = "active", Ht = "data-styled-version", He = "6.1.8", Ke = `/*!sc*/
`, Ze = typeof window < "u" && "HTMLElement" in window, Hn = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== "" ? process.env.REACT_APP_SC_DISABLE_SPEEDY !== "false" && process.env.REACT_APP_SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.SC_DISABLE_SPEEDY !== void 0 && process.env.SC_DISABLE_SPEEDY !== "" ? process.env.SC_DISABLE_SPEEDY !== "false" && process.env.SC_DISABLE_SPEEDY : process.env.NODE_ENV !== "production"), it = /invalid hook call/i, fe = /* @__PURE__ */ new Set(), Nn = function(e, t) {
  if (process.env.NODE_ENV !== "production") {
    var n = t ? ' with the id of "'.concat(t, '"') : "", r = "The component ".concat(e).concat(n, ` has been created dynamically.
`) + `You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component.`, o = console.error;
    try {
      var s = !0;
      console.error = function(i) {
        for (var a = [], c = 1; c < arguments.length; c++)
          a[c - 1] = arguments[c];
        it.test(i) ? (s = !1, fe.delete(r)) : o.apply(void 0, K([i], a, !1));
      }, nn(), s && !fe.has(r) && (console.warn(r), fe.add(r));
    } catch (i) {
      it.test(i.message) && fe.delete(r);
    } finally {
      console.error = o;
    }
  }
}, Ne = Object.freeze([]), Q = Object.freeze({});
function An(e, t, n) {
  return n === void 0 && (n = Q), e.theme !== n.theme && e.theme || t || n.theme;
}
var We = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]), Dn = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, On = /(^-|-$)/g;
function at(e) {
  return e.replace(Dn, "-").replace(On, "");
}
var In = /(a)(d)/gi, ge = 52, ct = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function Ye(e) {
  var t, n = "";
  for (t = Math.abs(e); t > ge; t = t / ge | 0)
    n = ct(t % ge) + n;
  return (ct(t % ge) + n).replace(In, "$1-$2");
}
var $e, Nt = 5381, F = function(e, t) {
  for (var n = t.length; n; )
    e = 33 * e ^ t.charCodeAt(--n);
  return e;
}, At = function(e) {
  return F(Nt, e);
};
function _n(e) {
  return Ye(At(e) >>> 0);
}
function Dt(e) {
  return process.env.NODE_ENV !== "production" && typeof e == "string" && e || e.displayName || e.name || "Component";
}
function je(e) {
  return typeof e == "string" && (process.env.NODE_ENV === "production" || e.charAt(0) === e.charAt(0).toLowerCase());
}
var Ot = typeof Symbol == "function" && Symbol.for, It = Ot ? Symbol.for("react.memo") : 60115, Mn = Ot ? Symbol.for("react.forward_ref") : 60112, $n = { childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 }, jn = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }, _t = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }, zn = (($e = {})[Mn] = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }, $e[It] = _t, $e);
function lt(e) {
  return ("type" in (t = e) && t.type.$$typeof) === It ? _t : "$$typeof" in e ? zn[e.$$typeof] : $n;
  var t;
}
var Ln = Object.defineProperty, Bn = Object.getOwnPropertyNames, ut = Object.getOwnPropertySymbols, Fn = Object.getOwnPropertyDescriptor, Wn = Object.getPrototypeOf, ht = Object.prototype;
function Mt(e, t, n) {
  if (typeof t != "string") {
    if (ht) {
      var r = Wn(t);
      r && r !== ht && Mt(e, r, n);
    }
    var o = Bn(t);
    ut && (o = o.concat(ut(t)));
    for (var s = lt(e), i = lt(t), a = 0; a < o.length; ++a) {
      var c = o[a];
      if (!(c in jn || n && n[c] || i && c in i || s && c in s)) {
        var p = Fn(t, c);
        try {
          Ln(e, c, p);
        } catch {
        }
      }
    }
  }
  return e;
}
function ee(e) {
  return typeof e == "function";
}
function Je(e) {
  return typeof e == "object" && "styledComponentId" in e;
}
function W(e, t) {
  return e && t ? "".concat(e, " ").concat(t) : e || t || "";
}
function pt(e, t) {
  if (e.length === 0)
    return "";
  for (var n = e[0], r = 1; r < e.length; r++)
    n += t ? t + e[r] : e[r];
  return n;
}
function te(e) {
  return e !== null && typeof e == "object" && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function Ve(e, t, n) {
  if (n === void 0 && (n = !1), !n && !te(e) && !Array.isArray(e))
    return t;
  if (Array.isArray(t))
    for (var r = 0; r < t.length; r++)
      e[r] = Ve(e[r], t[r]);
  else if (te(t))
    for (var r in t)
      e[r] = Ve(e[r], t[r]);
  return e;
}
function Qe(e, t) {
  Object.defineProperty(e, "toString", { value: t });
}
var Yn = process.env.NODE_ENV !== "production" ? { 1: `Cannot create styled-component for component: %s.

`, 2: `Can't collect styles once you've consumed a \`ServerStyleSheet\`'s styles! \`ServerStyleSheet\` is a one off instance for each server-side render cycle.

- Are you trying to reuse it across renders?
- Are you accidentally calling collectStyles twice?

`, 3: `Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.

`, 4: `The \`StyleSheetManager\` expects a valid target or sheet prop!

- Does this error occur on the client and is your target falsy?
- Does this error occur on the server and is the sheet falsy?

`, 5: `The clone method cannot be used on the client!

- Are you running in a client-like environment on the server?
- Are you trying to run SSR on the client?

`, 6: `Trying to insert a new style tag, but the given Node is unmounted!

- Are you using a custom target that isn't mounted?
- Does your document not have a valid head element?
- Have you accidentally removed a style tag manually?

`, 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: `ThemeProvider: Please make your "theme" prop an object.

`, 9: "Missing document `<head>`\n\n", 10: `Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021

`, 11: `_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.

`, 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: `%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.

`, 14: `ThemeProvider: "theme" prop is required.

`, 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: `Reached the limit of how many styled components may be created at group %s.
You may only create up to 1,073,741,824 components. If you're creating components dynamically,
as for instance in your render method then you may be running into this limitation.

`, 17: `CSSStyleSheet could not be found on HTMLStyleElement.
Has styled-components' style tag been unmounted or altered by another script?
`, 18: "ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`" } : {};
function Vn() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var n = e[0], r = [], o = 1, s = e.length; o < s; o += 1)
    r.push(e[o]);
  return r.forEach(function(i) {
    n = n.replace(/%[a-z]/, i);
  }), n;
}
function re(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return process.env.NODE_ENV === "production" ? new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e, " for more information.").concat(t.length > 0 ? " Args: ".concat(t.join(", ")) : "")) : new Error(Vn.apply(void 0, K([Yn[e]], t, !1)).trim());
}
var Gn = function() {
  function e(t) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = t;
  }
  return e.prototype.indexOfGroup = function(t) {
    for (var n = 0, r = 0; r < t; r++)
      n += this.groupSizes[r];
    return n;
  }, e.prototype.insertRules = function(t, n) {
    if (t >= this.groupSizes.length) {
      for (var r = this.groupSizes, o = r.length, s = o; t >= s; )
        if ((s <<= 1) < 0)
          throw re(16, "".concat(t));
      this.groupSizes = new Uint32Array(s), this.groupSizes.set(r), this.length = s;
      for (var i = o; i < s; i++)
        this.groupSizes[i] = 0;
    }
    for (var a = this.indexOfGroup(t + 1), c = (i = 0, n.length); i < c; i++)
      this.tag.insertRule(a, n[i]) && (this.groupSizes[t]++, a++);
  }, e.prototype.clearGroup = function(t) {
    if (t < this.length) {
      var n = this.groupSizes[t], r = this.indexOfGroup(t), o = r + n;
      this.groupSizes[t] = 0;
      for (var s = r; s < o; s++)
        this.tag.deleteRule(r);
    }
  }, e.prototype.getGroup = function(t) {
    var n = "";
    if (t >= this.length || this.groupSizes[t] === 0)
      return n;
    for (var r = this.groupSizes[t], o = this.indexOfGroup(t), s = o + r, i = o; i < s; i++)
      n += "".concat(this.tag.getRule(i)).concat(Ke);
    return n;
  }, e;
}(), we = /* @__PURE__ */ new Map(), ke = /* @__PURE__ */ new Map(), Ce = 1, me = function(e) {
  if (we.has(e))
    return we.get(e);
  for (; ke.has(Ce); )
    Ce++;
  var t = Ce++;
  if (process.env.NODE_ENV !== "production" && ((0 | t) < 0 || t > 1073741824))
    throw re(16, "".concat(t));
  return we.set(e, t), ke.set(t, e), t;
}, Un = function(e, t) {
  Ce = t + 1, we.set(e, t), ke.set(t, e);
}, qn = "style[".concat(G, "][").concat(Ht, '="').concat(He, '"]'), Xn = new RegExp("^".concat(G, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), Kn = function(e, t, n) {
  for (var r, o = n.split(","), s = 0, i = o.length; s < i; s++)
    (r = o[s]) && e.registerName(t, r);
}, Zn = function(e, t) {
  for (var n, r = ((n = t.textContent) !== null && n !== void 0 ? n : "").split(Ke), o = [], s = 0, i = r.length; s < i; s++) {
    var a = r[s].trim();
    if (a) {
      var c = a.match(Xn);
      if (c) {
        var p = 0 | parseInt(c[1], 10), m = c[2];
        p !== 0 && (Un(m, p), Kn(e, m, c[3]), e.getTag().insertRules(p, o)), o.length = 0;
      } else
        o.push(a);
    }
  }
};
function Jn() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var $t = function(e) {
  var t = document.head, n = e || t, r = document.createElement("style"), o = function(a) {
    var c = Array.from(a.querySelectorAll("style[".concat(G, "]")));
    return c[c.length - 1];
  }(n), s = o !== void 0 ? o.nextSibling : null;
  r.setAttribute(G, Tt), r.setAttribute(Ht, He);
  var i = Jn();
  return i && r.setAttribute("nonce", i), n.insertBefore(r, s), r;
}, Qn = function() {
  function e(t) {
    this.element = $t(t), this.element.appendChild(document.createTextNode("")), this.sheet = function(n) {
      if (n.sheet)
        return n.sheet;
      for (var r = document.styleSheets, o = 0, s = r.length; o < s; o++) {
        var i = r[o];
        if (i.ownerNode === n)
          return i;
      }
      throw re(17);
    }(this.element), this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    try {
      return this.sheet.insertRule(n, t), this.length++, !0;
    } catch {
      return !1;
    }
  }, e.prototype.deleteRule = function(t) {
    this.sheet.deleteRule(t), this.length--;
  }, e.prototype.getRule = function(t) {
    var n = this.sheet.cssRules[t];
    return n && n.cssText ? n.cssText : "";
  }, e;
}(), er = function() {
  function e(t) {
    this.element = $t(t), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    if (t <= this.length && t >= 0) {
      var r = document.createTextNode(n);
      return this.element.insertBefore(r, this.nodes[t] || null), this.length++, !0;
    }
    return !1;
  }, e.prototype.deleteRule = function(t) {
    this.element.removeChild(this.nodes[t]), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.nodes[t].textContent : "";
  }, e;
}(), tr = function() {
  function e(t) {
    this.rules = [], this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    return t <= this.length && (this.rules.splice(t, 0, n), this.length++, !0);
  }, e.prototype.deleteRule = function(t) {
    this.rules.splice(t, 1), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.rules[t] : "";
  }, e;
}(), dt = Ze, nr = { isServer: !Ze, useCSSOMInjection: !Hn }, jt = function() {
  function e(t, n, r) {
    t === void 0 && (t = Q), n === void 0 && (n = {});
    var o = this;
    this.options = H(H({}, nr), t), this.gs = n, this.names = new Map(r), this.server = !!t.isServer, !this.server && Ze && dt && (dt = !1, function(s) {
      for (var i = document.querySelectorAll(qn), a = 0, c = i.length; a < c; a++) {
        var p = i[a];
        p && p.getAttribute(G) !== Tt && (Zn(s, p), p.parentNode && p.parentNode.removeChild(p));
      }
    }(this)), Qe(this, function() {
      return function(s) {
        for (var i = s.getTag(), a = i.length, c = "", p = function(f) {
          var y = function(R) {
            return ke.get(R);
          }(f);
          if (y === void 0)
            return "continue";
          var v = s.names.get(y), C = i.getGroup(f);
          if (v === void 0 || C.length === 0)
            return "continue";
          var E = "".concat(G, ".g").concat(f, '[id="').concat(y, '"]'), N = "";
          v !== void 0 && v.forEach(function(R) {
            R.length > 0 && (N += "".concat(R, ","));
          }), c += "".concat(C).concat(E, '{content:"').concat(N, '"}').concat(Ke);
        }, m = 0; m < a; m++)
          p(m);
        return c;
      }(o);
    });
  }
  return e.registerId = function(t) {
    return me(t);
  }, e.prototype.reconstructWithOptions = function(t, n) {
    return n === void 0 && (n = !0), new e(H(H({}, this.options), t), this.gs, n && this.names || void 0);
  }, e.prototype.allocateGSInstance = function(t) {
    return this.gs[t] = (this.gs[t] || 0) + 1;
  }, e.prototype.getTag = function() {
    return this.tag || (this.tag = (t = function(n) {
      var r = n.useCSSOMInjection, o = n.target;
      return n.isServer ? new tr(o) : r ? new Qn(o) : new er(o);
    }(this.options), new Gn(t)));
    var t;
  }, e.prototype.hasNameForId = function(t, n) {
    return this.names.has(t) && this.names.get(t).has(n);
  }, e.prototype.registerName = function(t, n) {
    if (me(t), this.names.has(t))
      this.names.get(t).add(n);
    else {
      var r = /* @__PURE__ */ new Set();
      r.add(n), this.names.set(t, r);
    }
  }, e.prototype.insertRules = function(t, n, r) {
    this.registerName(t, n), this.getTag().insertRules(me(t), r);
  }, e.prototype.clearNames = function(t) {
    this.names.has(t) && this.names.get(t).clear();
  }, e.prototype.clearRules = function(t) {
    this.getTag().clearGroup(me(t)), this.clearNames(t);
  }, e.prototype.clearTag = function() {
    this.tag = void 0;
  }, e;
}(), rr = /&/g, or = /^\s*\/\/.*$/gm;
function zt(e, t) {
  return e.map(function(n) {
    return n.type === "rule" && (n.value = "".concat(t, " ").concat(n.value), n.value = n.value.replaceAll(",", ",".concat(t, " ")), n.props = n.props.map(function(r) {
      return "".concat(t, " ").concat(r);
    })), Array.isArray(n.children) && n.type !== "@keyframes" && (n.children = zt(n.children, t)), n;
  });
}
function sr(e) {
  var t, n, r, o = e === void 0 ? Q : e, s = o.options, i = s === void 0 ? Q : s, a = o.plugins, c = a === void 0 ? Ne : a, p = function(y, v, C) {
    return C.startsWith(n) && C.endsWith(n) && C.replaceAll(n, "").length > 0 ? ".".concat(t) : y;
  }, m = c.slice();
  m.push(function(y) {
    y.type === Ee && y.value.includes("&") && (y.props[0] = y.props[0].replace(rr, n).replace(r, p));
  }), i.prefix && m.push(xn), m.push(kn);
  var f = function(y, v, C, E) {
    v === void 0 && (v = ""), C === void 0 && (C = ""), E === void 0 && (E = "&"), t = E, n = v, r = new RegExp("\\".concat(n, "\\b"), "g");
    var N = y.replace(or, ""), R = Cn(C || v ? "".concat(C, " ").concat(v, " { ").concat(N, " }") : N);
    i.namespace && (R = zt(R, i.namespace));
    var P = [];
    return Pe(R, En(m.concat(Rn(function(S) {
      return P.push(S);
    })))), P;
  };
  return f.hash = c.length ? c.reduce(function(y, v) {
    return v.name || re(15), F(y, v.name);
  }, Nt).toString() : "", f;
}
var ir = new jt(), Ge = sr(), Lt = ue.createContext({ shouldForwardProp: void 0, styleSheet: ir, stylis: Ge });
Lt.Consumer;
ue.createContext(void 0);
function ft() {
  return on(Lt);
}
var gt = function() {
  function e(t, n) {
    var r = this;
    this.inject = function(o, s) {
      s === void 0 && (s = Ge);
      var i = r.name + s.hash;
      o.hasNameForId(r.id, i) || o.insertRules(r.id, i, s(r.rules, i, "@keyframes"));
    }, this.name = t, this.id = "sc-keyframes-".concat(t), this.rules = n, Qe(this, function() {
      throw re(12, String(r.name));
    });
  }
  return e.prototype.getName = function(t) {
    return t === void 0 && (t = Ge), this.name + t.hash;
  }, e;
}(), ar = function(e) {
  return e >= "A" && e <= "Z";
};
function mt(e) {
  for (var t = "", n = 0; n < e.length; n++) {
    var r = e[n];
    if (n === 1 && r === "-" && e[0] === "-")
      return e;
    ar(r) ? t += "-" + r.toLowerCase() : t += r;
  }
  return t.startsWith("ms-") ? "-" + t : t;
}
var Bt = function(e) {
  return e == null || e === !1 || e === "";
}, Ft = function(e) {
  var t, n, r = [];
  for (var o in e) {
    var s = e[o];
    e.hasOwnProperty(o) && !Bt(s) && (Array.isArray(s) && s.isCss || ee(s) ? r.push("".concat(mt(o), ":"), s, ";") : te(s) ? r.push.apply(r, K(K(["".concat(o, " {")], Ft(s), !1), ["}"], !1)) : r.push("".concat(mt(o), ": ").concat((t = o, (n = s) == null || typeof n == "boolean" || n === "" ? "" : typeof n != "number" || n === 0 || t in Tn || t.startsWith("--") ? String(n).trim() : "".concat(n, "px")), ";")));
  }
  return r;
};
function V(e, t, n, r) {
  if (Bt(e))
    return [];
  if (Je(e))
    return [".".concat(e.styledComponentId)];
  if (ee(e)) {
    if (!ee(s = e) || s.prototype && s.prototype.isReactComponent || !t)
      return [e];
    var o = e(t);
    return process.env.NODE_ENV === "production" || typeof o != "object" || Array.isArray(o) || o instanceof gt || te(o) || o === null || console.error("".concat(Dt(e), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")), V(o, t, n, r);
  }
  var s;
  return e instanceof gt ? n ? (e.inject(n, r), [e.getName(r)]) : [e] : te(e) ? Ft(e) : Array.isArray(e) ? Array.prototype.concat.apply(Ne, e.map(function(i) {
    return V(i, t, n, r);
  })) : [e.toString()];
}
function cr(e) {
  for (var t = 0; t < e.length; t += 1) {
    var n = e[t];
    if (ee(n) && !Je(n))
      return !1;
  }
  return !0;
}
var lr = At(He), ur = function() {
  function e(t, n, r) {
    this.rules = t, this.staticRulesId = "", this.isStatic = process.env.NODE_ENV === "production" && (r === void 0 || r.isStatic) && cr(t), this.componentId = n, this.baseHash = F(lr, n), this.baseStyle = r, jt.registerId(n);
  }
  return e.prototype.generateAndInjectStyles = function(t, n, r) {
    var o = this.baseStyle ? this.baseStyle.generateAndInjectStyles(t, n, r) : "";
    if (this.isStatic && !r.hash)
      if (this.staticRulesId && n.hasNameForId(this.componentId, this.staticRulesId))
        o = W(o, this.staticRulesId);
      else {
        var s = pt(V(this.rules, t, n, r)), i = Ye(F(this.baseHash, s) >>> 0);
        if (!n.hasNameForId(this.componentId, i)) {
          var a = r(s, ".".concat(i), void 0, this.componentId);
          n.insertRules(this.componentId, i, a);
        }
        o = W(o, i), this.staticRulesId = i;
      }
    else {
      for (var c = F(this.baseHash, r.hash), p = "", m = 0; m < this.rules.length; m++) {
        var f = this.rules[m];
        if (typeof f == "string")
          p += f, process.env.NODE_ENV !== "production" && (c = F(c, f));
        else if (f) {
          var y = pt(V(f, t, n, r));
          c = F(c, y + m), p += y;
        }
      }
      if (p) {
        var v = Ye(c >>> 0);
        n.hasNameForId(this.componentId, v) || n.insertRules(this.componentId, v, r(p, ".".concat(v), void 0, this.componentId)), o = W(o, v);
      }
    }
    return o;
  }, e;
}(), Wt = ue.createContext(void 0);
Wt.Consumer;
var ze = {}, yt = /* @__PURE__ */ new Set();
function hr(e, t, n) {
  var r = Je(e), o = e, s = !je(e), i = t.attrs, a = i === void 0 ? Ne : i, c = t.componentId, p = c === void 0 ? function(w, k) {
    var d = typeof w != "string" ? "sc" : at(w);
    ze[d] = (ze[d] || 0) + 1;
    var u = "".concat(d, "-").concat(_n(He + d + ze[d]));
    return k ? "".concat(k, "-").concat(u) : u;
  }(t.displayName, t.parentComponentId) : c, m = t.displayName, f = m === void 0 ? function(w) {
    return je(w) ? "styled.".concat(w) : "Styled(".concat(Dt(w), ")");
  }(e) : m, y = t.displayName && t.componentId ? "".concat(at(t.displayName), "-").concat(t.componentId) : t.componentId || p, v = r && o.attrs ? o.attrs.concat(a).filter(Boolean) : a, C = t.shouldForwardProp;
  if (r && o.shouldForwardProp) {
    var E = o.shouldForwardProp;
    if (t.shouldForwardProp) {
      var N = t.shouldForwardProp;
      C = function(w, k) {
        return E(w, k) && N(w, k);
      };
    } else
      C = E;
  }
  var R = new ur(n, y, r ? o.componentStyle : void 0);
  function P(w, k) {
    return function(d, u, z) {
      var U = d.attrs, Ut = d.componentStyle, qt = d.defaultProps, Xt = d.foldedComponentIds, et = d.styledComponentId, Kt = d.target, Zt = ue.useContext(Wt), Jt = ft(), De = d.shouldForwardProp || Jt.shouldForwardProp;
      process.env.NODE_ENV !== "production" && nt(et);
      var tt = An(u, Zt, qt) || Q, _ = function(he, ie, pe) {
        for (var q, L = H(H({}, ie), { className: void 0, theme: pe }), _e = 0; _e < he.length; _e += 1) {
          var de = ee(q = he[_e]) ? q(L) : q;
          for (var $ in de)
            L[$] = $ === "className" ? W(L[$], de[$]) : $ === "style" ? H(H({}, L[$]), de[$]) : de[$];
        }
        return ie.className && (L.className = W(L.className, ie.className)), L;
      }(U, u, tt), oe = _.as || Kt, se = {};
      for (var A in _)
        _[A] === void 0 || A[0] === "$" || A === "as" || A === "theme" && _.theme === tt || (A === "forwardedAs" ? se.as = _.forwardedAs : De && !De(A, oe) || (se[A] = _[A], De || process.env.NODE_ENV !== "development" || ln(A) || yt.has(A) || !We.has(oe) || (yt.add(A), console.warn('styled-components: it looks like an unknown prop "'.concat(A, '" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));
      var Oe = function(he, ie) {
        var pe = ft(), q = he.generateAndInjectStyles(ie, pe.styleSheet, pe.stylis);
        return process.env.NODE_ENV !== "production" && nt(q), q;
      }(Ut, _);
      process.env.NODE_ENV !== "production" && d.warnTooManyClasses && d.warnTooManyClasses(Oe);
      var Ie = W(Xt, et);
      return Oe && (Ie += " " + Oe), _.className && (Ie += " " + _.className), se[je(oe) && !We.has(oe) ? "class" : "className"] = Ie, se.ref = z, rn(oe, se);
    }(S, w, k);
  }
  P.displayName = f;
  var S = ue.forwardRef(P);
  return S.attrs = v, S.componentStyle = R, S.displayName = f, S.shouldForwardProp = C, S.foldedComponentIds = r ? W(o.foldedComponentIds, o.styledComponentId) : "", S.styledComponentId = y, S.target = r ? o.target : e, Object.defineProperty(S, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(w) {
    this._foldedDefaultProps = r ? function(k) {
      for (var d = [], u = 1; u < arguments.length; u++)
        d[u - 1] = arguments[u];
      for (var z = 0, U = d; z < U.length; z++)
        Ve(k, U[z], !0);
      return k;
    }({}, o.defaultProps, w) : w;
  } }), process.env.NODE_ENV !== "production" && (Nn(f, y), S.warnTooManyClasses = /* @__PURE__ */ function(w, k) {
    var d = {}, u = !1;
    return function(z) {
      if (!u && (d[z] = !0, Object.keys(d).length >= 200)) {
        var U = k ? ' with the id of "'.concat(k, '"') : "";
        console.warn("Over ".concat(200, " classes were generated for component ").concat(w).concat(U, `.
`) + `Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))\`width: 100%;\`

  <Component />`), u = !0, d = {};
      }
    };
  }(f, y)), Qe(S, function() {
    return ".".concat(S.styledComponentId);
  }), s && Mt(S, e, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0 }), S;
}
function vt(e, t) {
  for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1)
    n.push(t[r], e[r + 1]);
  return n;
}
var St = function(e) {
  return Object.assign(e, { isCss: !0 });
};
function pr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  if (ee(e) || te(e))
    return St(V(vt(Ne, K([e], t, !0))));
  var r = e;
  return t.length === 0 && r.length === 1 && typeof r[0] == "string" ? V(r) : St(V(vt(r, t)));
}
function Ue(e, t, n) {
  if (n === void 0 && (n = Q), !t)
    throw re(1, t);
  var r = function(o) {
    for (var s = [], i = 1; i < arguments.length; i++)
      s[i - 1] = arguments[i];
    return e(t, n, pr.apply(void 0, K([o], s, !1)));
  };
  return r.attrs = function(o) {
    return Ue(e, t, H(H({}, n), { attrs: Array.prototype.concat(n.attrs, o).filter(Boolean) }));
  }, r.withConfig = function(o) {
    return Ue(e, t, H(H({}, n), o));
  }, r;
}
var Yt = function(e) {
  return Ue(hr, e);
}, Ae = Yt;
We.forEach(function(e) {
  Ae[e] = Yt(e);
});
process.env.NODE_ENV !== "production" && typeof navigator < "u" && navigator.product === "ReactNative" && console.warn(`It looks like you've imported 'styled-components' on React Native.
Perhaps you're looking to import 'styled-components/native'?
Read more about this at https://www.styled-components.com/docs/basics#react-native`);
var ye = "__sc-".concat(G, "__");
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && typeof window < "u" && (window[ye] || (window[ye] = 0), window[ye] === 1 && console.warn(`It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.

See https://s-c.sh/2BAXzed for more info.`), window[ye] += 1);
const dr = (e, t) => {
  let n;
  function r() {
    clearTimeout(n);
  }
  function o() {
    r(), n = setTimeout(() => {
      e();
    }, t);
  }
  return o.cancel = r, o;
}, bt = (e, t, n) => (t = !t && t !== 0 ? e : t, n = !n && n !== 0 ? e : n, t > n ? (console.error("min limit is greater than max limit"), e) : e < t ? t : e > n ? n : e), Vt = (e, t) => e.clientX > t.left && e.clientX < t.right && e.clientY > t.top && e.clientY < t.top + t.height, fr = (e, t) => {
  const n = t.getBoundingClientRect();
  return Vt(e, n);
}, Gt = Ae.div`
  position: absolute;
  height: 100%;
  width: 6px;
  right: 3px;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.4s ease-out;
  padding: 6px 0;
  box-sizing: border-box;
  will-change: opacity;
  pointer-events: none;

  &.rcs-custom-scrollbar-rtl {
    right: auto;
    left: 3px;
  }

  &.scroll-visible {
    opacity: 1;
    transition-duration: 0.2s;
  }
`, gr = Ae.div`
  height: calc(100% - 12px);
  margin-top: 6px;
  background-color: rgba(78, 183, 245, 0.7);
  border-radius: 3px;
`, mr = Ae.div`
  min-height: 0;
  min-width: 0;

  & .rcs-outer-container {
    overflow: hidden;

    & .rcs-positioning {
      position: relative;
    }
  }

  & .rcs-inner-container {
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 0;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.05) 60%,
        rgba(0, 0, 0, 0) 100%
      );
      pointer-events: none;
      transition: height 0.1s ease-in;
      will-change: height;
    }

    &.rcs-content-scrolled:after {
      height: 5px;
      transition: height 0.15s ease-out;
    }
  }

  &.rcs-scroll-handle-dragged .rcs-inner-container {
    user-select: none;
  }

  &.rcs-scroll-handle-dragged ${Gt} {
    opacity: 1;
  }

  & .rcs-custom-scroll-handle {
    position: absolute;
    width: 100%;
    top: 0;
  }
`;
class br extends sn {
  constructor(n) {
    super(n);
    h(this, "scrollbarYWidth");
    h(this, "hideScrollThumb");
    h(this, "contentHeight", 0);
    h(this, "visibleHeight", 0);
    h(this, "scrollHandleHeight", 0);
    h(this, "scrollRatio", 1);
    h(this, "hasScroll", !1);
    h(this, "startDragHandlePos", 0);
    h(this, "startDragMousePos", 0);
    h(this, "customScrollRef", ae());
    h(this, "innerContainerRef", ae());
    h(this, "customScrollbarRef", ae());
    h(this, "scrollHandleRef", ae());
    h(this, "contentWrapperRef", ae());
    h(this, "adjustFreezePosition", (n) => {
      if (!this.contentWrapperRef.current)
        return;
      const r = this.getScrolledElement(), o = this.contentWrapperRef.current;
      this.props.freezePosition && (o.scrollTop = this.state.scrollPos), n.freezePosition && (r.scrollTop = this.state.scrollPos);
    });
    h(this, "toggleScrollIfNeeded", () => {
      const n = this.contentHeight - this.visibleHeight > 1;
      this.hasScroll !== n && (this.hasScroll = n, this.forceUpdate());
    });
    h(this, "updateScrollPosition", (n) => {
      const r = this.getScrolledElement(), o = bt(
        n,
        0,
        this.contentHeight - this.visibleHeight
      );
      r.scrollTop = o, this.setState({
        scrollPos: o
      });
    });
    h(this, "onClick", (n) => {
      if (!this.hasScroll || !this.isMouseEventOnCustomScrollbar(n) || this.isMouseEventOnScrollHandle(n))
        return;
      const r = this.calculateNewScrollHandleTop(n), o = this.getScrollValueFromHandlePosition(r);
      this.updateScrollPosition(o);
    });
    h(this, "isMouseEventOnCustomScrollbar", (n) => {
      if (!this.customScrollbarRef.current)
        return !1;
      const o = this.customScrollRef.current.getBoundingClientRect(), s = this.customScrollbarRef.current.getBoundingClientRect(), i = this.props.rtl ? {
        left: o.left,
        right: s.right
      } : {
        left: s.left,
        width: o.right
      }, a = {
        right: o.right,
        top: o.top,
        height: o.height,
        ...i
      };
      return Vt(n, a);
    });
    h(this, "isMouseEventOnScrollHandle", (n) => {
      if (!this.scrollHandleRef.current)
        return !1;
      const r = this.scrollHandleRef.current;
      return fr(n, r);
    });
    h(this, "calculateNewScrollHandleTop", (n) => {
      const s = this.customScrollRef.current.getBoundingClientRect().top + window.pageYOffset, i = n.pageY - s, a = this.getScrollHandleStyle().top;
      let c;
      return i > a + this.scrollHandleHeight ? c = a + Math.min(
        this.scrollHandleHeight,
        this.visibleHeight - this.scrollHandleHeight
      ) : c = a - Math.max(this.scrollHandleHeight, 0), c;
    });
    h(this, "getScrollValueFromHandlePosition", (n) => n / this.scrollRatio);
    h(this, "getScrollHandleStyle", () => {
      const n = this.state.scrollPos * this.scrollRatio;
      return this.scrollHandleHeight = this.visibleHeight * this.scrollRatio, {
        height: this.scrollHandleHeight,
        top: n
      };
    });
    h(this, "adjustCustomScrollPosToContentPos", (n) => {
      this.setState({
        scrollPos: n
      });
    });
    h(this, "onScroll", (n) => {
      this.props.freezePosition || (this.hideScrollThumb(), this.adjustCustomScrollPosToContentPos(n.currentTarget.scrollTop), this.props.onScroll && this.props.onScroll(n));
    });
    h(this, "getScrolledElement", () => this.innerContainerRef.current);
    h(this, "onMouseDown", (n) => {
      !this.hasScroll || !this.isMouseEventOnScrollHandle(n) || (this.startDragHandlePos = this.getScrollHandleStyle().top, this.startDragMousePos = n.pageY, this.setState({
        onDrag: !0
      }), document.addEventListener("mousemove", this.onHandleDrag, {
        passive: !1
      }), document.addEventListener("mouseup", this.onHandleDragEnd, {
        passive: !1
      }));
    });
    h(this, "onTouchStart", () => {
      this.setState({
        onDrag: !0
      });
    });
    h(this, "onHandleDrag", (n) => {
      n.preventDefault();
      const r = n.pageY - this.startDragMousePos, o = bt(
        this.startDragHandlePos + r,
        0,
        this.visibleHeight - this.scrollHandleHeight
      ), s = this.getScrollValueFromHandlePosition(o);
      this.updateScrollPosition(s);
    });
    h(this, "onHandleDragEnd", (n) => {
      this.setState({
        onDrag: !1
      }), n.preventDefault(), document.removeEventListener("mousemove", this.onHandleDrag), document.removeEventListener("mouseup", this.onHandleDragEnd);
    });
    h(this, "getInnerContainerClasses", () => this.state.scrollPos && this.props.addScrolledClass ? "rcs-inner-container rcs-content-scrolled" : "rcs-inner-container");
    h(this, "getScrollStyles", () => {
      const n = this.scrollbarYWidth || 20, r = this.props.rtl ? "marginLeft" : "marginRight", o = {
        height: this.props.heightRelativeToParent || this.props.flex ? "100%" : "",
        overscrollBehavior: this.props.allowOuterScroll ? "auto" : "none"
      };
      o[r] = -1 * n;
      const s = {
        height: this.props.heightRelativeToParent || this.props.flex ? "100%" : "",
        overflowY: this.props.freezePosition ? "hidden" : "visible"
      };
      return s[r] = this.scrollbarYWidth ? 0 : n, {
        innerContainer: o,
        contentWrapper: s
      };
    });
    h(this, "getOuterContainerStyle", () => ({
      height: this.props.heightRelativeToParent || this.props.flex ? "100%" : ""
    }));
    h(this, "getRootStyles", () => {
      const n = {};
      return this.props.heightRelativeToParent ? n.height = this.props.heightRelativeToParent : this.props.flex && (n.flex = this.props.flex), n;
    });
    h(this, "enforceMinHandleHeight", (n) => {
      const r = this.props.minScrollHandleHeight || 38;
      if (n.height >= r)
        return n;
      const o = r - n.height, s = this.state.scrollPos / (this.contentHeight - this.visibleHeight), i = o * s, a = n.top - i;
      return {
        height: r,
        top: a
      };
    });
    h(this, "onMouseEnter", () => {
      this.setState({ visible: !0 });
    });
    h(this, "onMouseLeave", () => {
      this.setState({ visible: !1 });
    });
    this.scrollbarYWidth = 0, this.state = {
      scrollPos: 0,
      onDrag: !1,
      visible: !1
    }, this.hideScrollThumb = dr(() => {
      this.setState({
        onDrag: !1
      });
    }, 500);
  }
  componentDidMount() {
    typeof this.props.scrollTo < "u" ? this.updateScrollPosition(this.props.scrollTo) : this.forceUpdate();
  }
  componentDidUpdate(n, r) {
    const o = this.contentHeight, s = this.visibleHeight, i = this.getScrolledElement(), a = r.scrollPos >= o - s;
    this.contentHeight = i.scrollHeight, this.scrollbarYWidth = i.offsetWidth - i.clientWidth, this.visibleHeight = i.clientHeight, this.scrollRatio = this.contentHeight ? this.visibleHeight / this.contentHeight : 1, this.toggleScrollIfNeeded();
    const c = this.state === r;
    (this.props.freezePosition || n.freezePosition) && this.adjustFreezePosition(n), typeof this.props.scrollTo < "u" && this.props.scrollTo !== n.scrollTo ? this.updateScrollPosition(this.props.scrollTo) : this.props.keepAtBottom && c && a && this.updateScrollPosition(this.contentHeight - this.visibleHeight);
  }
  componentWillUnmount() {
    this.hideScrollThumb.cancel(), document.removeEventListener("mousemove", this.onHandleDrag), document.removeEventListener("mouseup", this.onHandleDragEnd);
  }
  render() {
    const n = this.getScrollStyles(), r = this.getRootStyles(), o = this.enforceMinHandleHeight(
      this.getScrollHandleStyle()
    ), s = [
      this.props.className || "",
      "rcs-custom-scroll",
      this.state.onDrag ? "rcs-scroll-handle-dragged" : ""
    ].join(" ");
    return /* @__PURE__ */ B(
      mr,
      {
        className: s,
        style: r,
        ref: this.customScrollRef,
        children: /* @__PURE__ */ tn(
          "div",
          {
            "data-testid": "outer-container",
            className: "rcs-outer-container",
            style: this.getOuterContainerStyle(),
            onMouseDown: this.onMouseDown,
            onTouchStart: this.onTouchStart,
            onClick: this.onClick,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            children: [
              this.hasScroll ? /* @__PURE__ */ B("div", { className: "rcs-positioning", children: /* @__PURE__ */ B(
                Gt,
                {
                  "data-testid": "custom-scrollbar",
                  ref: this.customScrollbarRef,
                  className: `rcs-custom-scrollbar ${this.props.rtl ? "rcs-custom-scrollbar-rtl" : ""} ${this.state.visible ? "scroll-visible" : ""}`,
                  children: /* @__PURE__ */ B(
                    "div",
                    {
                      "data-testid": "custom-scroll-handle",
                      ref: this.scrollHandleRef,
                      className: "rcs-custom-scroll-handle",
                      style: o,
                      children: /* @__PURE__ */ B(
                        gr,
                        {
                          className: this.props.handleClass || "rcs-inner-handle"
                        }
                      )
                    }
                  )
                },
                "scrollbar"
              ) }) : null,
              /* @__PURE__ */ B(
                "div",
                {
                  "data-testid": "inner-container",
                  ref: this.innerContainerRef,
                  className: this.getInnerContainerClasses(),
                  style: n.innerContainer,
                  onScroll: this.onScroll,
                  children: /* @__PURE__ */ B(
                    "div",
                    {
                      ref: this.contentWrapperRef,
                      style: n.contentWrapper,
                      children: this.props.children
                    }
                  )
                }
              )
            ]
          }
        )
      }
    );
  }
}
export {
  br as CustomScroll
};
//# sourceMappingURL=index.es.js.map
