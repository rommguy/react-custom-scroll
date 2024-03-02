var un = Object.defineProperty;
var fn = (e, t, r) => t in e ? un(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var b = (e, t, r) => (fn(e, typeof t != "symbol" ? t + "" : t, r), r);
import ge, { useRef as dn, useDebugValue as qt, createElement as hn, useContext as pn, Component as gn, createRef as He } from "react";
var St = { exports: {} }, Ie = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xt;
function mn() {
  if (Xt)
    return Ie;
  Xt = 1;
  var e = ge, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(f, l, h) {
    var p, g = {}, S = null, R = null;
    h !== void 0 && (S = "" + h), l.key !== void 0 && (S = "" + l.key), l.ref !== void 0 && (R = l.ref);
    for (p in l)
      o.call(l, p) && !s.hasOwnProperty(p) && (g[p] = l[p]);
    if (f && f.defaultProps)
      for (p in l = f.defaultProps, l)
        g[p] === void 0 && (g[p] = l[p]);
    return { $$typeof: t, type: f, key: S, ref: R, props: g, _owner: i.current };
  }
  return Ie.Fragment = r, Ie.jsx = c, Ie.jsxs = c, Ie;
}
var Me = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kt;
function vn() {
  return Kt || (Kt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = ge, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), f = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), R = Symbol.for("react.offscreen"), O = Symbol.iterator, j = "@@iterator";
    function F(n) {
      if (n === null || typeof n != "object")
        return null;
      var a = O && n[O] || n[j];
      return typeof a == "function" ? a : null;
    }
    var x = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(n) {
      {
        for (var a = arguments.length, u = new Array(a > 1 ? a - 1 : 0), d = 1; d < a; d++)
          u[d - 1] = arguments[d];
        _("error", n, u);
      }
    }
    function _(n, a, u) {
      {
        var d = x.ReactDebugCurrentFrame, P = d.getStackAddendum();
        P !== "" && (a += "%s", u = u.concat([P]));
        var k = u.map(function(C) {
          return String(C);
        });
        k.unshift("Warning: " + a), Function.prototype.apply.call(console[n], console, k);
      }
    }
    var A = !1, N = !1, E = !1, m = !1, Z = !1, Q;
    Q = Symbol.for("react.module.reference");
    function lt(n) {
      return !!(typeof n == "string" || typeof n == "function" || n === o || n === s || Z || n === i || n === h || n === p || m || n === R || A || N || E || typeof n == "object" && n !== null && (n.$$typeof === S || n.$$typeof === g || n.$$typeof === c || n.$$typeof === f || n.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      n.$$typeof === Q || n.getModuleId !== void 0));
    }
    function ut(n, a, u) {
      var d = n.displayName;
      if (d)
        return d;
      var P = a.displayName || a.name || "";
      return P !== "" ? u + "(" + P + ")" : u;
    }
    function Le(n) {
      return n.displayName || "Context";
    }
    function z(n) {
      if (n == null)
        return null;
      if (typeof n.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof n == "function")
        return n.displayName || n.name || null;
      if (typeof n == "string")
        return n;
      switch (n) {
        case o:
          return "Fragment";
        case r:
          return "Portal";
        case s:
          return "Profiler";
        case i:
          return "StrictMode";
        case h:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case f:
            var a = n;
            return Le(a) + ".Consumer";
          case c:
            var u = n;
            return Le(u._context) + ".Provider";
          case l:
            return ut(n, n.render, "ForwardRef");
          case g:
            var d = n.displayName || null;
            return d !== null ? d : z(n.type) || "Memo";
          case S: {
            var P = n, k = P._payload, C = P._init;
            try {
              return z(C(k));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ee = Object.assign, ue = 0, We, ve, De, V, oe, ie, L;
    function ye() {
    }
    ye.__reactDisabledLog = !0;
    function Ne() {
      {
        if (ue === 0) {
          We = console.log, ve = console.info, De = console.warn, V = console.error, oe = console.group, ie = console.groupCollapsed, L = console.groupEnd;
          var n = {
            configurable: !0,
            enumerable: !0,
            value: ye,
            writable: !0
          };
          Object.defineProperties(console, {
            info: n,
            log: n,
            warn: n,
            error: n,
            group: n,
            groupCollapsed: n,
            groupEnd: n
          });
        }
        ue++;
      }
    }
    function be() {
      {
        if (ue--, ue === 0) {
          var n = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ee({}, n, {
              value: We
            }),
            info: ee({}, n, {
              value: ve
            }),
            warn: ee({}, n, {
              value: De
            }),
            error: ee({}, n, {
              value: V
            }),
            group: ee({}, n, {
              value: oe
            }),
            groupCollapsed: ee({}, n, {
              value: ie
            }),
            groupEnd: ee({}, n, {
              value: L
            })
          });
        }
        ue < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var te = x.ReactCurrentDispatcher, se;
    function G(n, a, u) {
      {
        if (se === void 0)
          try {
            throw Error();
          } catch (P) {
            var d = P.stack.trim().match(/\n( *(at )?)/);
            se = d && d[1] || "";
          }
        return `
` + se + n;
      }
    }
    var q = !1, ae;
    {
      var Se = typeof WeakMap == "function" ? WeakMap : Map;
      ae = new Se();
    }
    function X(n, a) {
      if (!n || q)
        return "";
      {
        var u = ae.get(n);
        if (u !== void 0)
          return u;
      }
      var d;
      q = !0;
      var P = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var k;
      k = te.current, te.current = null, Ne();
      try {
        if (a) {
          var C = function() {
            throw Error();
          };
          if (Object.defineProperty(C.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(C, []);
            } catch (re) {
              d = re;
            }
            Reflect.construct(n, [], C);
          } else {
            try {
              C.call();
            } catch (re) {
              d = re;
            }
            n.call(C.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (re) {
            d = re;
          }
          n();
        }
      } catch (re) {
        if (re && d && typeof re.stack == "string") {
          for (var w = re.stack.split(`
`), W = d.stack.split(`
`), H = w.length - 1, I = W.length - 1; H >= 1 && I >= 0 && w[H] !== W[I]; )
            I--;
          for (; H >= 1 && I >= 0; H--, I--)
            if (w[H] !== W[I]) {
              if (H !== 1 || I !== 1)
                do
                  if (H--, I--, I < 0 || w[H] !== W[I]) {
                    var B = `
` + w[H].replace(" at new ", " at ");
                    return n.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", n.displayName)), typeof n == "function" && ae.set(n, B), B;
                  }
                while (H >= 1 && I >= 0);
              break;
            }
        }
      } finally {
        q = !1, te.current = k, be(), Error.prepareStackTrace = P;
      }
      var Ee = n ? n.displayName || n.name : "", Gt = Ee ? G(Ee) : "";
      return typeof n == "function" && ae.set(n, Gt), Gt;
    }
    function Wr(n, a, u) {
      return X(n, !1);
    }
    function Yr(n) {
      var a = n.prototype;
      return !!(a && a.isReactComponent);
    }
    function Ye(n, a, u) {
      if (n == null)
        return "";
      if (typeof n == "function")
        return X(n, Yr(n));
      if (typeof n == "string")
        return G(n);
      switch (n) {
        case h:
          return G("Suspense");
        case p:
          return G("SuspenseList");
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case l:
            return Wr(n.render);
          case g:
            return Ye(n.type, a, u);
          case S: {
            var d = n, P = d._payload, k = d._init;
            try {
              return Ye(k(P), a, u);
            } catch {
            }
          }
        }
      return "";
    }
    var ze = Object.prototype.hasOwnProperty, Ht = {}, It = x.ReactDebugCurrentFrame;
    function Ve(n) {
      if (n) {
        var a = n._owner, u = Ye(n.type, n._source, a ? a.type : null);
        It.setExtraStackFrame(u);
      } else
        It.setExtraStackFrame(null);
    }
    function zr(n, a, u, d, P) {
      {
        var k = Function.call.bind(ze);
        for (var C in n)
          if (k(n, C)) {
            var w = void 0;
            try {
              if (typeof n[C] != "function") {
                var W = Error((d || "React class") + ": " + u + " type `" + C + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[C] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw W.name = "Invariant Violation", W;
              }
              w = n[C](a, C, d, u, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (H) {
              w = H;
            }
            w && !(w instanceof Error) && (Ve(P), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", u, C, typeof w), Ve(null)), w instanceof Error && !(w.message in Ht) && (Ht[w.message] = !0, Ve(P), y("Failed %s type: %s", u, w.message), Ve(null));
          }
      }
    }
    var Vr = Array.isArray;
    function ft(n) {
      return Vr(n);
    }
    function Br(n) {
      {
        var a = typeof Symbol == "function" && Symbol.toStringTag, u = a && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return u;
      }
    }
    function Ur(n) {
      try {
        return Mt(n), !1;
      } catch {
        return !0;
      }
    }
    function Mt(n) {
      return "" + n;
    }
    function $t(n) {
      if (Ur(n))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Br(n)), Mt(n);
    }
    var je = x.ReactCurrentOwner, Gr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ft, Lt, dt;
    dt = {};
    function qr(n) {
      if (ze.call(n, "ref")) {
        var a = Object.getOwnPropertyDescriptor(n, "ref").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return n.ref !== void 0;
    }
    function Xr(n) {
      if (ze.call(n, "key")) {
        var a = Object.getOwnPropertyDescriptor(n, "key").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return n.key !== void 0;
    }
    function Kr(n, a) {
      if (typeof n.ref == "string" && je.current && a && je.current.stateNode !== a) {
        var u = z(je.current.type);
        dt[u] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', z(je.current.type), n.ref), dt[u] = !0);
      }
    }
    function Jr(n, a) {
      {
        var u = function() {
          Ft || (Ft = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        u.isReactWarning = !0, Object.defineProperty(n, "key", {
          get: u,
          configurable: !0
        });
      }
    }
    function Zr(n, a) {
      {
        var u = function() {
          Lt || (Lt = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        u.isReactWarning = !0, Object.defineProperty(n, "ref", {
          get: u,
          configurable: !0
        });
      }
    }
    var Qr = function(n, a, u, d, P, k, C) {
      var w = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: n,
        key: a,
        ref: u,
        props: C,
        // Record the component responsible for creating this element.
        _owner: k
      };
      return w._store = {}, Object.defineProperty(w._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(w, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.defineProperty(w, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: P
      }), Object.freeze && (Object.freeze(w.props), Object.freeze(w)), w;
    };
    function en(n, a, u, d, P) {
      {
        var k, C = {}, w = null, W = null;
        u !== void 0 && ($t(u), w = "" + u), Xr(a) && ($t(a.key), w = "" + a.key), qr(a) && (W = a.ref, Kr(a, P));
        for (k in a)
          ze.call(a, k) && !Gr.hasOwnProperty(k) && (C[k] = a[k]);
        if (n && n.defaultProps) {
          var H = n.defaultProps;
          for (k in H)
            C[k] === void 0 && (C[k] = H[k]);
        }
        if (w || W) {
          var I = typeof n == "function" ? n.displayName || n.name || "Unknown" : n;
          w && Jr(C, I), W && Zr(C, I);
        }
        return Qr(n, w, W, P, d, je.current, C);
      }
    }
    var ht = x.ReactCurrentOwner, Wt = x.ReactDebugCurrentFrame;
    function we(n) {
      if (n) {
        var a = n._owner, u = Ye(n.type, n._source, a ? a.type : null);
        Wt.setExtraStackFrame(u);
      } else
        Wt.setExtraStackFrame(null);
    }
    var pt;
    pt = !1;
    function gt(n) {
      return typeof n == "object" && n !== null && n.$$typeof === t;
    }
    function Yt() {
      {
        if (ht.current) {
          var n = z(ht.current.type);
          if (n)
            return `

Check the render method of \`` + n + "`.";
        }
        return "";
      }
    }
    function tn(n) {
      {
        if (n !== void 0) {
          var a = n.fileName.replace(/^.*[\\\/]/, ""), u = n.lineNumber;
          return `

Check your code at ` + a + ":" + u + ".";
        }
        return "";
      }
    }
    var zt = {};
    function rn(n) {
      {
        var a = Yt();
        if (!a) {
          var u = typeof n == "string" ? n : n.displayName || n.name;
          u && (a = `

Check the top-level render call using <` + u + ">.");
        }
        return a;
      }
    }
    function Vt(n, a) {
      {
        if (!n._store || n._store.validated || n.key != null)
          return;
        n._store.validated = !0;
        var u = rn(a);
        if (zt[u])
          return;
        zt[u] = !0;
        var d = "";
        n && n._owner && n._owner !== ht.current && (d = " It was passed a child from " + z(n._owner.type) + "."), we(n), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', u, d), we(null);
      }
    }
    function Bt(n, a) {
      {
        if (typeof n != "object")
          return;
        if (ft(n))
          for (var u = 0; u < n.length; u++) {
            var d = n[u];
            gt(d) && Vt(d, a);
          }
        else if (gt(n))
          n._store && (n._store.validated = !0);
        else if (n) {
          var P = F(n);
          if (typeof P == "function" && P !== n.entries)
            for (var k = P.call(n), C; !(C = k.next()).done; )
              gt(C.value) && Vt(C.value, a);
        }
      }
    }
    function nn(n) {
      {
        var a = n.type;
        if (a == null || typeof a == "string")
          return;
        var u;
        if (typeof a == "function")
          u = a.propTypes;
        else if (typeof a == "object" && (a.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        a.$$typeof === g))
          u = a.propTypes;
        else
          return;
        if (u) {
          var d = z(a);
          zr(u, n.props, "prop", d, n);
        } else if (a.PropTypes !== void 0 && !pt) {
          pt = !0;
          var P = z(a);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", P || "Unknown");
        }
        typeof a.getDefaultProps == "function" && !a.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function on(n) {
      {
        for (var a = Object.keys(n.props), u = 0; u < a.length; u++) {
          var d = a[u];
          if (d !== "children" && d !== "key") {
            we(n), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), we(null);
            break;
          }
        }
        n.ref !== null && (we(n), y("Invalid attribute `ref` supplied to `React.Fragment`."), we(null));
      }
    }
    function Ut(n, a, u, d, P, k) {
      {
        var C = lt(n);
        if (!C) {
          var w = "";
          (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (w += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var W = tn(P);
          W ? w += W : w += Yt();
          var H;
          n === null ? H = "null" : ft(n) ? H = "array" : n !== void 0 && n.$$typeof === t ? (H = "<" + (z(n.type) || "Unknown") + " />", w = " Did you accidentally export a JSX literal instead of a component?") : H = typeof n, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", H, w);
        }
        var I = en(n, a, u, P, k);
        if (I == null)
          return I;
        if (C) {
          var B = a.children;
          if (B !== void 0)
            if (d)
              if (ft(B)) {
                for (var Ee = 0; Ee < B.length; Ee++)
                  Bt(B[Ee], n);
                Object.freeze && Object.freeze(B);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Bt(B, n);
        }
        return n === o ? on(I) : nn(I), I;
      }
    }
    function sn(n, a, u) {
      return Ut(n, a, u, !0);
    }
    function an(n, a, u) {
      return Ut(n, a, u, !1);
    }
    var cn = an, ln = sn;
    Me.Fragment = o, Me.jsx = cn, Me.jsxs = ln;
  }()), Me;
}
process.env.NODE_ENV === "production" ? St.exports = mn() : St.exports = vn();
var ce = St.exports, Y = function() {
  return Y = Object.assign || function(t) {
    for (var r, o = 1, i = arguments.length; o < i; o++) {
      r = arguments[o];
      for (var s in r)
        Object.prototype.hasOwnProperty.call(r, s) && (t[s] = r[s]);
    }
    return t;
  }, Y.apply(this, arguments);
};
function Ce(e, t, r) {
  if (r || arguments.length === 2)
    for (var o = 0, i = t.length, s; o < i; o++)
      (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
function yn(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var bn = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, Sn = /* @__PURE__ */ yn(
  function(e) {
    return bn.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), D = "-ms-", Fe = "-moz-", T = "-webkit-", gr = "comm", rt = "rule", kt = "decl", wn = "@import", mr = "@keyframes", En = "@layer", vr = Math.abs, Ot = String.fromCharCode, wt = Object.assign;
function Rn(e, t) {
  return $(e, 0) ^ 45 ? (((t << 2 ^ $(e, 0)) << 2 ^ $(e, 1)) << 2 ^ $(e, 2)) << 2 ^ $(e, 3) : 0;
}
function yr(e) {
  return e.trim();
}
function ne(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function v(e, t, r) {
  return e.replace(t, r);
}
function Xe(e, t, r) {
  return e.indexOf(t, r);
}
function $(e, t) {
  return e.charCodeAt(t) | 0;
}
function Pe(e, t, r) {
  return e.slice(t, r);
}
function J(e) {
  return e.length;
}
function br(e) {
  return e.length;
}
function $e(e, t) {
  return t.push(e), e;
}
function Cn(e, t) {
  return e.map(t).join("");
}
function Jt(e, t) {
  return e.filter(function(r) {
    return !ne(r, t);
  });
}
var nt = 1, Te = 1, Sr = 0, U = 0, M = 0, Oe = "";
function ot(e, t, r, o, i, s, c, f) {
  return { value: e, root: t, parent: r, type: o, props: i, children: s, line: nt, column: Te, length: c, return: "", siblings: f };
}
function le(e, t) {
  return wt(ot("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function Re(e) {
  for (; e.root; )
    e = le(e.root, { children: [e] });
  $e(e, e.siblings);
}
function Pn() {
  return M;
}
function Tn() {
  return M = U > 0 ? $(Oe, --U) : 0, Te--, M === 10 && (Te = 1, nt--), M;
}
function K() {
  return M = U < Sr ? $(Oe, U++) : 0, Te++, M === 10 && (Te = 1, nt++), M;
}
function he() {
  return $(Oe, U);
}
function Ke() {
  return U;
}
function it(e, t) {
  return Pe(Oe, e, t);
}
function Et(e) {
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
function xn(e) {
  return nt = Te = 1, Sr = J(Oe = e), U = 0, [];
}
function _n(e) {
  return Oe = "", e;
}
function mt(e) {
  return yr(it(U - 1, Rt(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function kn(e) {
  for (; (M = he()) && M < 33; )
    K();
  return Et(e) > 2 || Et(M) > 3 ? "" : " ";
}
function On(e, t) {
  for (; --t && K() && !(M < 48 || M > 102 || M > 57 && M < 65 || M > 70 && M < 97); )
    ;
  return it(e, Ke() + (t < 6 && he() == 32 && K() == 32));
}
function Rt(e) {
  for (; K(); )
    switch (M) {
      case e:
        return U;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Rt(M);
        break;
      case 40:
        e === 41 && Rt(e);
        break;
      case 92:
        K();
        break;
    }
  return U;
}
function An(e, t) {
  for (; K() && e + M !== 57; )
    if (e + M === 84 && he() === 47)
      break;
  return "/*" + it(t, U - 1) + "*" + Ot(e === 47 ? e : K());
}
function Dn(e) {
  for (; !Et(he()); )
    K();
  return it(e, U);
}
function Nn(e) {
  return _n(Je("", null, null, null, [""], e = xn(e), 0, [0], e));
}
function Je(e, t, r, o, i, s, c, f, l) {
  for (var h = 0, p = 0, g = c, S = 0, R = 0, O = 0, j = 1, F = 1, x = 1, y = 0, _ = "", A = i, N = s, E = o, m = _; F; )
    switch (O = y, y = K()) {
      case 40:
        if (O != 108 && $(m, g - 1) == 58) {
          Xe(m += v(mt(y), "&", "&\f"), "&\f", vr(h ? f[h - 1] : 0)) != -1 && (x = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        m += mt(y);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        m += kn(O);
        break;
      case 92:
        m += On(Ke() - 1, 7);
        continue;
      case 47:
        switch (he()) {
          case 42:
          case 47:
            $e(jn(An(K(), Ke()), t, r, l), l);
            break;
          default:
            m += "/";
        }
        break;
      case 123 * j:
        f[h++] = J(m) * x;
      case 125 * j:
      case 59:
      case 0:
        switch (y) {
          case 0:
          case 125:
            F = 0;
          case 59 + p:
            x == -1 && (m = v(m, /\f/g, "")), R > 0 && J(m) - g && $e(R > 32 ? Qt(m + ";", o, r, g - 1, l) : Qt(v(m, " ", "") + ";", o, r, g - 2, l), l);
            break;
          case 59:
            m += ";";
          default:
            if ($e(E = Zt(m, t, r, h, p, i, f, _, A = [], N = [], g, s), s), y === 123)
              if (p === 0)
                Je(m, t, E, E, A, s, g, f, N);
              else
                switch (S === 99 && $(m, 3) === 110 ? 100 : S) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Je(e, E, E, o && $e(Zt(e, E, E, 0, 0, i, f, _, i, A = [], g, N), N), i, N, g, f, o ? A : N);
                    break;
                  default:
                    Je(m, E, E, E, [""], N, 0, f, N);
                }
        }
        h = p = R = 0, j = x = 1, _ = m = "", g = c;
        break;
      case 58:
        g = 1 + J(m), R = O;
      default:
        if (j < 1) {
          if (y == 123)
            --j;
          else if (y == 125 && j++ == 0 && Tn() == 125)
            continue;
        }
        switch (m += Ot(y), y * j) {
          case 38:
            x = p > 0 ? 1 : (m += "\f", -1);
            break;
          case 44:
            f[h++] = (J(m) - 1) * x, x = 1;
            break;
          case 64:
            he() === 45 && (m += mt(K())), S = he(), p = g = J(_ = m += Dn(Ke())), y++;
            break;
          case 45:
            O === 45 && J(m) == 2 && (j = 0);
        }
    }
  return s;
}
function Zt(e, t, r, o, i, s, c, f, l, h, p, g) {
  for (var S = i - 1, R = i === 0 ? s : [""], O = br(R), j = 0, F = 0, x = 0; j < o; ++j)
    for (var y = 0, _ = Pe(e, S + 1, S = vr(F = c[j])), A = e; y < O; ++y)
      (A = yr(F > 0 ? R[y] + " " + _ : v(_, /&\f/g, R[y]))) && (l[x++] = A);
  return ot(e, t, r, i === 0 ? rt : f, l, h, p, g);
}
function jn(e, t, r, o) {
  return ot(e, t, r, gr, Ot(Pn()), Pe(e, 2, -2), 0, o);
}
function Qt(e, t, r, o, i) {
  return ot(e, t, r, kt, Pe(e, 0, o), Pe(e, o + 1, -1), o, i);
}
function wr(e, t, r) {
  switch (Rn(e, t)) {
    case 5103:
      return T + "print-" + e + e;
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
      return T + e + e;
    case 4789:
      return Fe + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return T + e + Fe + e + D + e + e;
    case 5936:
      switch ($(e, t + 11)) {
        case 114:
          return T + e + D + v(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return T + e + D + v(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return T + e + D + v(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    case 6828:
    case 4268:
    case 2903:
      return T + e + D + e + e;
    case 6165:
      return T + e + D + "flex-" + e + e;
    case 5187:
      return T + e + v(e, /(\w+).+(:[^]+)/, T + "box-$1$2" + D + "flex-$1$2") + e;
    case 5443:
      return T + e + D + "flex-item-" + v(e, /flex-|-self/g, "") + (ne(e, /flex-|baseline/) ? "" : D + "grid-row-" + v(e, /flex-|-self/g, "")) + e;
    case 4675:
      return T + e + D + "flex-line-pack" + v(e, /align-content|flex-|-self/g, "") + e;
    case 5548:
      return T + e + D + v(e, "shrink", "negative") + e;
    case 5292:
      return T + e + D + v(e, "basis", "preferred-size") + e;
    case 6060:
      return T + "box-" + v(e, "-grow", "") + T + e + D + v(e, "grow", "positive") + e;
    case 4554:
      return T + v(e, /([^-])(transform)/g, "$1" + T + "$2") + e;
    case 6187:
      return v(v(v(e, /(zoom-|grab)/, T + "$1"), /(image-set)/, T + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return v(e, /(image-set\([^]*)/, T + "$1$`$1");
    case 4968:
      return v(v(e, /(.+:)(flex-)?(.*)/, T + "box-pack:$3" + D + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + T + e + e;
    case 4200:
      if (!ne(e, /flex-|baseline/))
        return D + "grid-column-align" + Pe(e, t) + e;
      break;
    case 2592:
    case 3360:
      return D + v(e, "template-", "") + e;
    case 4384:
    case 3616:
      return r && r.some(function(o, i) {
        return t = i, ne(o.props, /grid-\w+-end/);
      }) ? ~Xe(e + (r = r[t].value), "span", 0) ? e : D + v(e, "-start", "") + e + D + "grid-row-span:" + (~Xe(r, "span", 0) ? ne(r, /\d+/) : +ne(r, /\d+/) - +ne(e, /\d+/)) + ";" : D + v(e, "-start", "") + e;
    case 4896:
    case 4128:
      return r && r.some(function(o) {
        return ne(o.props, /grid-\w+-start/);
      }) ? e : D + v(v(e, "-end", "-span"), "span ", "") + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return v(e, /(.+)-inline(.+)/, T + "$1$2") + e;
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
      if (J(e) - 1 - t > 6)
        switch ($(e, t + 1)) {
          case 109:
            if ($(e, t + 4) !== 45)
              break;
          case 102:
            return v(e, /(.+:)(.+)-([^]+)/, "$1" + T + "$2-$3$1" + Fe + ($(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~Xe(e, "stretch", 0) ? wr(v(e, "stretch", "fill-available"), t, r) + e : e;
        }
      break;
    case 5152:
    case 5920:
      return v(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(o, i, s, c, f, l, h) {
        return D + i + ":" + s + h + (c ? D + i + "-span:" + (f ? l : +l - +s) + h : "") + e;
      });
    case 4949:
      if ($(e, t + 6) === 121)
        return v(e, ":", ":" + T) + e;
      break;
    case 6444:
      switch ($(e, $(e, 14) === 45 ? 18 : 11)) {
        case 120:
          return v(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + T + ($(e, 14) === 45 ? "inline-" : "") + "box$3$1" + T + "$2$3$1" + D + "$2box$3") + e;
        case 100:
          return v(e, ":", ":" + D) + e;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return v(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function et(e, t) {
  for (var r = "", o = 0; o < e.length; o++)
    r += t(e[o], o, e, t) || "";
  return r;
}
function Hn(e, t, r, o) {
  switch (e.type) {
    case En:
      if (e.children.length)
        break;
    case wn:
    case kt:
      return e.return = e.return || e.value;
    case gr:
      return "";
    case mr:
      return e.return = e.value + "{" + et(e.children, o) + "}";
    case rt:
      if (!J(e.value = e.props.join(",")))
        return "";
  }
  return J(r = et(e.children, o)) ? e.return = e.value + "{" + r + "}" : "";
}
function In(e) {
  var t = br(e);
  return function(r, o, i, s) {
    for (var c = "", f = 0; f < t; f++)
      c += e[f](r, o, i, s) || "";
    return c;
  };
}
function Mn(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function $n(e, t, r, o) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case kt:
        e.return = wr(e.value, e.length, r);
        return;
      case mr:
        return et([le(e, { value: v(e.value, "@", "@" + T) })], o);
      case rt:
        if (e.length)
          return Cn(r = e.props, function(i) {
            switch (ne(i, o = /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                Re(le(e, { props: [v(i, /:(read-\w+)/, ":" + Fe + "$1")] })), Re(le(e, { props: [i] })), wt(e, { props: Jt(r, o) });
                break;
              case "::placeholder":
                Re(le(e, { props: [v(i, /:(plac\w+)/, ":" + T + "input-$1")] })), Re(le(e, { props: [v(i, /:(plac\w+)/, ":" + Fe + "$1")] })), Re(le(e, { props: [v(i, /:(plac\w+)/, D + "input-$1")] })), Re(le(e, { props: [i] })), wt(e, { props: Jt(r, o) });
                break;
            }
            return "";
          });
    }
}
var Fn = {
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
}, me = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", Er = "active", Rr = "data-styled-version", st = "6.1.8", At = `/*!sc*/
`, Dt = typeof window < "u" && "HTMLElement" in window, Ln = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== "" ? process.env.REACT_APP_SC_DISABLE_SPEEDY !== "false" && process.env.REACT_APP_SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.SC_DISABLE_SPEEDY !== void 0 && process.env.SC_DISABLE_SPEEDY !== "" ? process.env.SC_DISABLE_SPEEDY !== "false" && process.env.SC_DISABLE_SPEEDY : process.env.NODE_ENV !== "production"), er = /invalid hook call/i, Be = /* @__PURE__ */ new Set(), Wn = function(e, t) {
  if (process.env.NODE_ENV !== "production") {
    var r = t ? ' with the id of "'.concat(t, '"') : "", o = "The component ".concat(e).concat(r, ` has been created dynamically.
`) + `You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component.`, i = console.error;
    try {
      var s = !0;
      console.error = function(c) {
        for (var f = [], l = 1; l < arguments.length; l++)
          f[l - 1] = arguments[l];
        er.test(c) ? (s = !1, Be.delete(o)) : i.apply(void 0, Ce([c], f, !1));
      }, dn(), s && !Be.has(o) && (console.warn(o), Be.add(o));
    } catch (c) {
      er.test(c.message) && Be.delete(o);
    } finally {
      console.error = i;
    }
  }
}, at = Object.freeze([]), xe = Object.freeze({});
function Yn(e, t, r) {
  return r === void 0 && (r = xe), e.theme !== r.theme && e.theme || t || r.theme;
}
var Ct = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]), zn = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, Vn = /(^-|-$)/g;
function tr(e) {
  return e.replace(zn, "-").replace(Vn, "");
}
var Bn = /(a)(d)/gi, Ue = 52, rr = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function Pt(e) {
  var t, r = "";
  for (t = Math.abs(e); t > Ue; t = t / Ue | 0)
    r = rr(t % Ue) + r;
  return (rr(t % Ue) + r).replace(Bn, "$1-$2");
}
var vt, Cr = 5381, fe = function(e, t) {
  for (var r = t.length; r; )
    e = 33 * e ^ t.charCodeAt(--r);
  return e;
}, Pr = function(e) {
  return fe(Cr, e);
};
function Un(e) {
  return Pt(Pr(e) >>> 0);
}
function Tr(e) {
  return process.env.NODE_ENV !== "production" && typeof e == "string" && e || e.displayName || e.name || "Component";
}
function yt(e) {
  return typeof e == "string" && (process.env.NODE_ENV === "production" || e.charAt(0) === e.charAt(0).toLowerCase());
}
var xr = typeof Symbol == "function" && Symbol.for, _r = xr ? Symbol.for("react.memo") : 60115, Gn = xr ? Symbol.for("react.forward_ref") : 60112, qn = { childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 }, Xn = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }, kr = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }, Kn = ((vt = {})[Gn] = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }, vt[_r] = kr, vt);
function nr(e) {
  return ("type" in (t = e) && t.type.$$typeof) === _r ? kr : "$$typeof" in e ? Kn[e.$$typeof] : qn;
  var t;
}
var Jn = Object.defineProperty, Zn = Object.getOwnPropertyNames, or = Object.getOwnPropertySymbols, Qn = Object.getOwnPropertyDescriptor, eo = Object.getPrototypeOf, ir = Object.prototype;
function Or(e, t, r) {
  if (typeof t != "string") {
    if (ir) {
      var o = eo(t);
      o && o !== ir && Or(e, o, r);
    }
    var i = Zn(t);
    or && (i = i.concat(or(t)));
    for (var s = nr(e), c = nr(t), f = 0; f < i.length; ++f) {
      var l = i[f];
      if (!(l in Xn || r && r[l] || c && l in c || s && l in s)) {
        var h = Qn(t, l);
        try {
          Jn(e, l, h);
        } catch {
        }
      }
    }
  }
  return e;
}
function _e(e) {
  return typeof e == "function";
}
function Nt(e) {
  return typeof e == "object" && "styledComponentId" in e;
}
function de(e, t) {
  return e && t ? "".concat(e, " ").concat(t) : e || t || "";
}
function sr(e, t) {
  if (e.length === 0)
    return "";
  for (var r = e[0], o = 1; o < e.length; o++)
    r += t ? t + e[o] : e[o];
  return r;
}
function ke(e) {
  return e !== null && typeof e == "object" && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function Tt(e, t, r) {
  if (r === void 0 && (r = !1), !r && !ke(e) && !Array.isArray(e))
    return t;
  if (Array.isArray(t))
    for (var o = 0; o < t.length; o++)
      e[o] = Tt(e[o], t[o]);
  else if (ke(t))
    for (var o in t)
      e[o] = Tt(e[o], t[o]);
  return e;
}
function jt(e, t) {
  Object.defineProperty(e, "toString", { value: t });
}
var to = process.env.NODE_ENV !== "production" ? { 1: `Cannot create styled-component for component: %s.

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
function ro() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var r = e[0], o = [], i = 1, s = e.length; i < s; i += 1)
    o.push(e[i]);
  return o.forEach(function(c) {
    r = r.replace(/%[a-z]/, c);
  }), r;
}
function Ae(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return process.env.NODE_ENV === "production" ? new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e, " for more information.").concat(t.length > 0 ? " Args: ".concat(t.join(", ")) : "")) : new Error(ro.apply(void 0, Ce([to[e]], t, !1)).trim());
}
var no = function() {
  function e(t) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = t;
  }
  return e.prototype.indexOfGroup = function(t) {
    for (var r = 0, o = 0; o < t; o++)
      r += this.groupSizes[o];
    return r;
  }, e.prototype.insertRules = function(t, r) {
    if (t >= this.groupSizes.length) {
      for (var o = this.groupSizes, i = o.length, s = i; t >= s; )
        if ((s <<= 1) < 0)
          throw Ae(16, "".concat(t));
      this.groupSizes = new Uint32Array(s), this.groupSizes.set(o), this.length = s;
      for (var c = i; c < s; c++)
        this.groupSizes[c] = 0;
    }
    for (var f = this.indexOfGroup(t + 1), l = (c = 0, r.length); c < l; c++)
      this.tag.insertRule(f, r[c]) && (this.groupSizes[t]++, f++);
  }, e.prototype.clearGroup = function(t) {
    if (t < this.length) {
      var r = this.groupSizes[t], o = this.indexOfGroup(t), i = o + r;
      this.groupSizes[t] = 0;
      for (var s = o; s < i; s++)
        this.tag.deleteRule(o);
    }
  }, e.prototype.getGroup = function(t) {
    var r = "";
    if (t >= this.length || this.groupSizes[t] === 0)
      return r;
    for (var o = this.groupSizes[t], i = this.indexOfGroup(t), s = i + o, c = i; c < s; c++)
      r += "".concat(this.tag.getRule(c)).concat(At);
    return r;
  }, e;
}(), Ze = /* @__PURE__ */ new Map(), tt = /* @__PURE__ */ new Map(), Qe = 1, Ge = function(e) {
  if (Ze.has(e))
    return Ze.get(e);
  for (; tt.has(Qe); )
    Qe++;
  var t = Qe++;
  if (process.env.NODE_ENV !== "production" && ((0 | t) < 0 || t > 1073741824))
    throw Ae(16, "".concat(t));
  return Ze.set(e, t), tt.set(t, e), t;
}, oo = function(e, t) {
  Qe = t + 1, Ze.set(e, t), tt.set(t, e);
}, io = "style[".concat(me, "][").concat(Rr, '="').concat(st, '"]'), so = new RegExp("^".concat(me, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), ao = function(e, t, r) {
  for (var o, i = r.split(","), s = 0, c = i.length; s < c; s++)
    (o = i[s]) && e.registerName(t, o);
}, co = function(e, t) {
  for (var r, o = ((r = t.textContent) !== null && r !== void 0 ? r : "").split(At), i = [], s = 0, c = o.length; s < c; s++) {
    var f = o[s].trim();
    if (f) {
      var l = f.match(so);
      if (l) {
        var h = 0 | parseInt(l[1], 10), p = l[2];
        h !== 0 && (oo(p, h), ao(e, p, l[3]), e.getTag().insertRules(h, i)), i.length = 0;
      } else
        i.push(f);
    }
  }
};
function lo() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var Ar = function(e) {
  var t = document.head, r = e || t, o = document.createElement("style"), i = function(f) {
    var l = Array.from(f.querySelectorAll("style[".concat(me, "]")));
    return l[l.length - 1];
  }(r), s = i !== void 0 ? i.nextSibling : null;
  o.setAttribute(me, Er), o.setAttribute(Rr, st);
  var c = lo();
  return c && o.setAttribute("nonce", c), r.insertBefore(o, s), o;
}, uo = function() {
  function e(t) {
    this.element = Ar(t), this.element.appendChild(document.createTextNode("")), this.sheet = function(r) {
      if (r.sheet)
        return r.sheet;
      for (var o = document.styleSheets, i = 0, s = o.length; i < s; i++) {
        var c = o[i];
        if (c.ownerNode === r)
          return c;
      }
      throw Ae(17);
    }(this.element), this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    try {
      return this.sheet.insertRule(r, t), this.length++, !0;
    } catch {
      return !1;
    }
  }, e.prototype.deleteRule = function(t) {
    this.sheet.deleteRule(t), this.length--;
  }, e.prototype.getRule = function(t) {
    var r = this.sheet.cssRules[t];
    return r && r.cssText ? r.cssText : "";
  }, e;
}(), fo = function() {
  function e(t) {
    this.element = Ar(t), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    if (t <= this.length && t >= 0) {
      var o = document.createTextNode(r);
      return this.element.insertBefore(o, this.nodes[t] || null), this.length++, !0;
    }
    return !1;
  }, e.prototype.deleteRule = function(t) {
    this.element.removeChild(this.nodes[t]), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.nodes[t].textContent : "";
  }, e;
}(), ho = function() {
  function e(t) {
    this.rules = [], this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    return t <= this.length && (this.rules.splice(t, 0, r), this.length++, !0);
  }, e.prototype.deleteRule = function(t) {
    this.rules.splice(t, 1), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.rules[t] : "";
  }, e;
}(), ar = Dt, po = { isServer: !Dt, useCSSOMInjection: !Ln }, Dr = function() {
  function e(t, r, o) {
    t === void 0 && (t = xe), r === void 0 && (r = {});
    var i = this;
    this.options = Y(Y({}, po), t), this.gs = r, this.names = new Map(o), this.server = !!t.isServer, !this.server && Dt && ar && (ar = !1, function(s) {
      for (var c = document.querySelectorAll(io), f = 0, l = c.length; f < l; f++) {
        var h = c[f];
        h && h.getAttribute(me) !== Er && (co(s, h), h.parentNode && h.parentNode.removeChild(h));
      }
    }(this)), jt(this, function() {
      return function(s) {
        for (var c = s.getTag(), f = c.length, l = "", h = function(g) {
          var S = function(x) {
            return tt.get(x);
          }(g);
          if (S === void 0)
            return "continue";
          var R = s.names.get(S), O = c.getGroup(g);
          if (R === void 0 || O.length === 0)
            return "continue";
          var j = "".concat(me, ".g").concat(g, '[id="').concat(S, '"]'), F = "";
          R !== void 0 && R.forEach(function(x) {
            x.length > 0 && (F += "".concat(x, ","));
          }), l += "".concat(O).concat(j, '{content:"').concat(F, '"}').concat(At);
        }, p = 0; p < f; p++)
          h(p);
        return l;
      }(i);
    });
  }
  return e.registerId = function(t) {
    return Ge(t);
  }, e.prototype.reconstructWithOptions = function(t, r) {
    return r === void 0 && (r = !0), new e(Y(Y({}, this.options), t), this.gs, r && this.names || void 0);
  }, e.prototype.allocateGSInstance = function(t) {
    return this.gs[t] = (this.gs[t] || 0) + 1;
  }, e.prototype.getTag = function() {
    return this.tag || (this.tag = (t = function(r) {
      var o = r.useCSSOMInjection, i = r.target;
      return r.isServer ? new ho(i) : o ? new uo(i) : new fo(i);
    }(this.options), new no(t)));
    var t;
  }, e.prototype.hasNameForId = function(t, r) {
    return this.names.has(t) && this.names.get(t).has(r);
  }, e.prototype.registerName = function(t, r) {
    if (Ge(t), this.names.has(t))
      this.names.get(t).add(r);
    else {
      var o = /* @__PURE__ */ new Set();
      o.add(r), this.names.set(t, o);
    }
  }, e.prototype.insertRules = function(t, r, o) {
    this.registerName(t, r), this.getTag().insertRules(Ge(t), o);
  }, e.prototype.clearNames = function(t) {
    this.names.has(t) && this.names.get(t).clear();
  }, e.prototype.clearRules = function(t) {
    this.getTag().clearGroup(Ge(t)), this.clearNames(t);
  }, e.prototype.clearTag = function() {
    this.tag = void 0;
  }, e;
}(), go = /&/g, mo = /^\s*\/\/.*$/gm;
function Nr(e, t) {
  return e.map(function(r) {
    return r.type === "rule" && (r.value = "".concat(t, " ").concat(r.value), r.value = r.value.replaceAll(",", ",".concat(t, " ")), r.props = r.props.map(function(o) {
      return "".concat(t, " ").concat(o);
    })), Array.isArray(r.children) && r.type !== "@keyframes" && (r.children = Nr(r.children, t)), r;
  });
}
function vo(e) {
  var t, r, o, i = e === void 0 ? xe : e, s = i.options, c = s === void 0 ? xe : s, f = i.plugins, l = f === void 0 ? at : f, h = function(S, R, O) {
    return O.startsWith(r) && O.endsWith(r) && O.replaceAll(r, "").length > 0 ? ".".concat(t) : S;
  }, p = l.slice();
  p.push(function(S) {
    S.type === rt && S.value.includes("&") && (S.props[0] = S.props[0].replace(go, r).replace(o, h));
  }), c.prefix && p.push($n), p.push(Hn);
  var g = function(S, R, O, j) {
    R === void 0 && (R = ""), O === void 0 && (O = ""), j === void 0 && (j = "&"), t = j, r = R, o = new RegExp("\\".concat(r, "\\b"), "g");
    var F = S.replace(mo, ""), x = Nn(O || R ? "".concat(O, " ").concat(R, " { ").concat(F, " }") : F);
    c.namespace && (x = Nr(x, c.namespace));
    var y = [];
    return et(x, In(p.concat(Mn(function(_) {
      return y.push(_);
    })))), y;
  };
  return g.hash = l.length ? l.reduce(function(S, R) {
    return R.name || Ae(15), fe(S, R.name);
  }, Cr).toString() : "", g;
}
var yo = new Dr(), xt = vo(), jr = ge.createContext({ shouldForwardProp: void 0, styleSheet: yo, stylis: xt });
jr.Consumer;
ge.createContext(void 0);
function cr() {
  return pn(jr);
}
var lr = function() {
  function e(t, r) {
    var o = this;
    this.inject = function(i, s) {
      s === void 0 && (s = xt);
      var c = o.name + s.hash;
      i.hasNameForId(o.id, c) || i.insertRules(o.id, c, s(o.rules, c, "@keyframes"));
    }, this.name = t, this.id = "sc-keyframes-".concat(t), this.rules = r, jt(this, function() {
      throw Ae(12, String(o.name));
    });
  }
  return e.prototype.getName = function(t) {
    return t === void 0 && (t = xt), this.name + t.hash;
  }, e;
}(), bo = function(e) {
  return e >= "A" && e <= "Z";
};
function ur(e) {
  for (var t = "", r = 0; r < e.length; r++) {
    var o = e[r];
    if (r === 1 && o === "-" && e[0] === "-")
      return e;
    bo(o) ? t += "-" + o.toLowerCase() : t += o;
  }
  return t.startsWith("ms-") ? "-" + t : t;
}
var Hr = function(e) {
  return e == null || e === !1 || e === "";
}, Ir = function(e) {
  var t, r, o = [];
  for (var i in e) {
    var s = e[i];
    e.hasOwnProperty(i) && !Hr(s) && (Array.isArray(s) && s.isCss || _e(s) ? o.push("".concat(ur(i), ":"), s, ";") : ke(s) ? o.push.apply(o, Ce(Ce(["".concat(i, " {")], Ir(s), !1), ["}"], !1)) : o.push("".concat(ur(i), ": ").concat((t = i, (r = s) == null || typeof r == "boolean" || r === "" ? "" : typeof r != "number" || r === 0 || t in Fn || t.startsWith("--") ? String(r).trim() : "".concat(r, "px")), ";")));
  }
  return o;
};
function pe(e, t, r, o) {
  if (Hr(e))
    return [];
  if (Nt(e))
    return [".".concat(e.styledComponentId)];
  if (_e(e)) {
    if (!_e(s = e) || s.prototype && s.prototype.isReactComponent || !t)
      return [e];
    var i = e(t);
    return process.env.NODE_ENV === "production" || typeof i != "object" || Array.isArray(i) || i instanceof lr || ke(i) || i === null || console.error("".concat(Tr(e), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")), pe(i, t, r, o);
  }
  var s;
  return e instanceof lr ? r ? (e.inject(r, o), [e.getName(o)]) : [e] : ke(e) ? Ir(e) : Array.isArray(e) ? Array.prototype.concat.apply(at, e.map(function(c) {
    return pe(c, t, r, o);
  })) : [e.toString()];
}
function So(e) {
  for (var t = 0; t < e.length; t += 1) {
    var r = e[t];
    if (_e(r) && !Nt(r))
      return !1;
  }
  return !0;
}
var wo = Pr(st), Eo = function() {
  function e(t, r, o) {
    this.rules = t, this.staticRulesId = "", this.isStatic = process.env.NODE_ENV === "production" && (o === void 0 || o.isStatic) && So(t), this.componentId = r, this.baseHash = fe(wo, r), this.baseStyle = o, Dr.registerId(r);
  }
  return e.prototype.generateAndInjectStyles = function(t, r, o) {
    var i = this.baseStyle ? this.baseStyle.generateAndInjectStyles(t, r, o) : "";
    if (this.isStatic && !o.hash)
      if (this.staticRulesId && r.hasNameForId(this.componentId, this.staticRulesId))
        i = de(i, this.staticRulesId);
      else {
        var s = sr(pe(this.rules, t, r, o)), c = Pt(fe(this.baseHash, s) >>> 0);
        if (!r.hasNameForId(this.componentId, c)) {
          var f = o(s, ".".concat(c), void 0, this.componentId);
          r.insertRules(this.componentId, c, f);
        }
        i = de(i, c), this.staticRulesId = c;
      }
    else {
      for (var l = fe(this.baseHash, o.hash), h = "", p = 0; p < this.rules.length; p++) {
        var g = this.rules[p];
        if (typeof g == "string")
          h += g, process.env.NODE_ENV !== "production" && (l = fe(l, g));
        else if (g) {
          var S = sr(pe(g, t, r, o));
          l = fe(l, S + p), h += S;
        }
      }
      if (h) {
        var R = Pt(l >>> 0);
        r.hasNameForId(this.componentId, R) || r.insertRules(this.componentId, R, o(h, ".".concat(R), void 0, this.componentId)), i = de(i, R);
      }
    }
    return i;
  }, e;
}(), Mr = ge.createContext(void 0);
Mr.Consumer;
var bt = {}, fr = /* @__PURE__ */ new Set();
function Ro(e, t, r) {
  var o = Nt(e), i = e, s = !yt(e), c = t.attrs, f = c === void 0 ? at : c, l = t.componentId, h = l === void 0 ? function(A, N) {
    var E = typeof A != "string" ? "sc" : tr(A);
    bt[E] = (bt[E] || 0) + 1;
    var m = "".concat(E, "-").concat(Un(st + E + bt[E]));
    return N ? "".concat(N, "-").concat(m) : m;
  }(t.displayName, t.parentComponentId) : l, p = t.displayName, g = p === void 0 ? function(A) {
    return yt(A) ? "styled.".concat(A) : "Styled(".concat(Tr(A), ")");
  }(e) : p, S = t.displayName && t.componentId ? "".concat(tr(t.displayName), "-").concat(t.componentId) : t.componentId || h, R = o && i.attrs ? i.attrs.concat(f).filter(Boolean) : f, O = t.shouldForwardProp;
  if (o && i.shouldForwardProp) {
    var j = i.shouldForwardProp;
    if (t.shouldForwardProp) {
      var F = t.shouldForwardProp;
      O = function(A, N) {
        return j(A, N) && F(A, N);
      };
    } else
      O = j;
  }
  var x = new Eo(r, S, o ? i.componentStyle : void 0);
  function y(A, N) {
    return function(E, m, Z) {
      var Q = E.attrs, lt = E.componentStyle, ut = E.defaultProps, Le = E.foldedComponentIds, z = E.styledComponentId, ee = E.target, ue = ge.useContext(Mr), We = cr(), ve = E.shouldForwardProp || We.shouldForwardProp;
      process.env.NODE_ENV !== "production" && qt(z);
      var De = Yn(m, ue, ut) || xe, V = function(be, te, se) {
        for (var G, q = Y(Y({}, te), { className: void 0, theme: se }), ae = 0; ae < be.length; ae += 1) {
          var Se = _e(G = be[ae]) ? G(q) : G;
          for (var X in Se)
            q[X] = X === "className" ? de(q[X], Se[X]) : X === "style" ? Y(Y({}, q[X]), Se[X]) : Se[X];
        }
        return te.className && (q.className = de(q.className, te.className)), q;
      }(Q, m, De), oe = V.as || ee, ie = {};
      for (var L in V)
        V[L] === void 0 || L[0] === "$" || L === "as" || L === "theme" && V.theme === De || (L === "forwardedAs" ? ie.as = V.forwardedAs : ve && !ve(L, oe) || (ie[L] = V[L], ve || process.env.NODE_ENV !== "development" || Sn(L) || fr.has(L) || !Ct.has(oe) || (fr.add(L), console.warn('styled-components: it looks like an unknown prop "'.concat(L, '" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));
      var ye = function(be, te) {
        var se = cr(), G = be.generateAndInjectStyles(te, se.styleSheet, se.stylis);
        return process.env.NODE_ENV !== "production" && qt(G), G;
      }(lt, V);
      process.env.NODE_ENV !== "production" && E.warnTooManyClasses && E.warnTooManyClasses(ye);
      var Ne = de(Le, z);
      return ye && (Ne += " " + ye), V.className && (Ne += " " + V.className), ie[yt(oe) && !Ct.has(oe) ? "class" : "className"] = Ne, ie.ref = Z, hn(oe, ie);
    }(_, A, N);
  }
  y.displayName = g;
  var _ = ge.forwardRef(y);
  return _.attrs = R, _.componentStyle = x, _.displayName = g, _.shouldForwardProp = O, _.foldedComponentIds = o ? de(i.foldedComponentIds, i.styledComponentId) : "", _.styledComponentId = S, _.target = o ? i.target : e, Object.defineProperty(_, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(A) {
    this._foldedDefaultProps = o ? function(N) {
      for (var E = [], m = 1; m < arguments.length; m++)
        E[m - 1] = arguments[m];
      for (var Z = 0, Q = E; Z < Q.length; Z++)
        Tt(N, Q[Z], !0);
      return N;
    }({}, i.defaultProps, A) : A;
  } }), process.env.NODE_ENV !== "production" && (Wn(g, S), _.warnTooManyClasses = /* @__PURE__ */ function(A, N) {
    var E = {}, m = !1;
    return function(Z) {
      if (!m && (E[Z] = !0, Object.keys(E).length >= 200)) {
        var Q = N ? ' with the id of "'.concat(N, '"') : "";
        console.warn("Over ".concat(200, " classes were generated for component ").concat(A).concat(Q, `.
`) + `Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))\`width: 100%;\`

  <Component />`), m = !0, E = {};
      }
    };
  }(g, S)), jt(_, function() {
    return ".".concat(_.styledComponentId);
  }), s && Or(_, e, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0 }), _;
}
function dr(e, t) {
  for (var r = [e[0]], o = 0, i = t.length; o < i; o += 1)
    r.push(t[o], e[o + 1]);
  return r;
}
var hr = function(e) {
  return Object.assign(e, { isCss: !0 });
};
function Co(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  if (_e(e) || ke(e))
    return hr(pe(dr(at, Ce([e], t, !0))));
  var o = e;
  return t.length === 0 && o.length === 1 && typeof o[0] == "string" ? pe(o) : hr(pe(dr(o, t)));
}
function _t(e, t, r) {
  if (r === void 0 && (r = xe), !t)
    throw Ae(1, t);
  var o = function(i) {
    for (var s = [], c = 1; c < arguments.length; c++)
      s[c - 1] = arguments[c];
    return e(t, r, Co.apply(void 0, Ce([i], s, !1)));
  };
  return o.attrs = function(i) {
    return _t(e, t, Y(Y({}, r), { attrs: Array.prototype.concat(r.attrs, i).filter(Boolean) }));
  }, o.withConfig = function(i) {
    return _t(e, t, Y(Y({}, r), i));
  }, o;
}
var $r = function(e) {
  return _t(Ro, e);
}, ct = $r;
Ct.forEach(function(e) {
  ct[e] = $r(e);
});
process.env.NODE_ENV !== "production" && typeof navigator < "u" && navigator.product === "ReactNative" && console.warn(`It looks like you've imported 'styled-components' on React Native.
Perhaps you're looking to import 'styled-components/native'?
Read more about this at https://www.styled-components.com/docs/basics#react-native`);
var qe = "__sc-".concat(me, "__");
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && typeof window < "u" && (window[qe] || (window[qe] = 0), window[qe] === 1 && console.warn(`It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.

See https://s-c.sh/2BAXzed for more info.`), window[qe] += 1);
const Po = (e, t) => {
  let r;
  function o() {
    clearTimeout(r);
  }
  function i() {
    o(), r = setTimeout(() => {
      e();
    }, t);
  }
  return i.cancel = o, i;
}, pr = (e, t, r) => (t = !t && t !== 0 ? e : t, r = !r && r !== 0 ? e : r, t > r ? (console.error("min limit is greater than max limit"), e) : e < t ? t : e > r ? r : e), Fr = (e, t) => e.clientX > t.left && e.clientX < t.right && e.clientY > t.top && e.clientY < t.top + t.height, To = (e, t) => {
  const r = t.getBoundingClientRect();
  return Fr(e, r);
}, Lr = ct.div`
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
`, xo = ct.div`
  height: calc(100% - 12px);
  margin-top: 6px;
  background-color: rgba(78, 183, 245, 0.7);
  border-radius: 3px;
`, _o = ct.div`
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

  &.rcs-scroll-handle-dragged ${Lr} {
    opacity: 1;
  }

  & .rcs-custom-scroll-handle {
    position: absolute;
    width: 100%;
    top: 0;
  }
`;
class Ao extends gn {
  constructor(r) {
    super(r);
    b(this, "scrollbarYWidth");
    b(this, "hideScrollThumb");
    b(this, "contentHeight", 0);
    b(this, "visibleHeight", 0);
    b(this, "scrollHandleHeight", 0);
    b(this, "scrollRatio", 1);
    b(this, "hasScroll", !1);
    b(this, "startDragHandlePos", 0);
    b(this, "startDragMousePos", 0);
    b(this, "customScrollRef", He());
    b(this, "innerContainerRef", He());
    b(this, "customScrollbarRef", He());
    b(this, "scrollHandleRef", He());
    b(this, "contentWrapperRef", He());
    b(this, "adjustFreezePosition", (r) => {
      if (!this.contentWrapperRef.current)
        return;
      const o = this.getScrolledElement(), i = this.contentWrapperRef.current;
      this.props.freezePosition && (i.scrollTop = this.state.scrollPos), r.freezePosition && (o.scrollTop = this.state.scrollPos);
    });
    b(this, "toggleScrollIfNeeded", () => {
      const r = this.contentHeight - this.visibleHeight > 1;
      this.hasScroll !== r && (this.hasScroll = r, this.forceUpdate());
    });
    b(this, "updateScrollPosition", (r) => {
      const o = this.getScrolledElement(), i = pr(
        r,
        0,
        this.contentHeight - this.visibleHeight
      );
      o.scrollTop = i, this.setState({
        scrollPos: i
      });
    });
    b(this, "onClick", (r) => {
      if (!this.hasScroll || !this.isMouseEventOnCustomScrollbar(r) || this.isMouseEventOnScrollHandle(r))
        return;
      const o = this.calculateNewScrollHandleTop(r), i = this.getScrollValueFromHandlePosition(o);
      this.updateScrollPosition(i);
    });
    b(this, "isMouseEventOnCustomScrollbar", (r) => {
      if (!this.customScrollbarRef.current)
        return !1;
      const i = this.customScrollRef.current.getBoundingClientRect(), s = this.customScrollbarRef.current.getBoundingClientRect(), c = this.props.rtl ? {
        left: i.left,
        right: s.right
      } : {
        left: s.left,
        width: i.right
      }, f = {
        right: i.right,
        top: i.top,
        height: i.height,
        ...c
      };
      return Fr(r, f);
    });
    b(this, "isMouseEventOnScrollHandle", (r) => {
      if (!this.scrollHandleRef.current)
        return !1;
      const o = this.scrollHandleRef.current;
      return To(r, o);
    });
    b(this, "calculateNewScrollHandleTop", (r) => {
      const s = this.customScrollRef.current.getBoundingClientRect().top + window.pageYOffset, c = r.pageY - s, f = this.getScrollHandleStyle().top;
      let l;
      return c > f + this.scrollHandleHeight ? l = f + Math.min(
        this.scrollHandleHeight,
        this.visibleHeight - this.scrollHandleHeight
      ) : l = f - Math.max(this.scrollHandleHeight, 0), l;
    });
    b(this, "getScrollValueFromHandlePosition", (r) => r / this.scrollRatio);
    b(this, "getScrollHandleStyle", () => {
      const r = this.state.scrollPos * this.scrollRatio;
      return this.scrollHandleHeight = this.visibleHeight * this.scrollRatio, {
        height: this.scrollHandleHeight,
        top: r
      };
    });
    b(this, "adjustCustomScrollPosToContentPos", (r) => {
      this.setState({
        scrollPos: r
      });
    });
    b(this, "onScroll", (r) => {
      this.props.freezePosition || (this.hideScrollThumb(), this.adjustCustomScrollPosToContentPos(r.currentTarget.scrollTop), this.props.onScroll && this.props.onScroll(r));
    });
    b(this, "getScrolledElement", () => this.innerContainerRef.current);
    b(this, "onMouseDown", (r) => {
      !this.hasScroll || !this.isMouseEventOnScrollHandle(r) || (this.startDragHandlePos = this.getScrollHandleStyle().top, this.startDragMousePos = r.pageY, this.setState({
        onDrag: !0
      }), document.addEventListener("mousemove", this.onHandleDrag, {
        passive: !1
      }), document.addEventListener("mouseup", this.onHandleDragEnd, {
        passive: !1
      }));
    });
    b(this, "onTouchStart", () => {
      this.setState({
        onDrag: !0
      });
    });
    b(this, "onHandleDrag", (r) => {
      r.preventDefault();
      const o = r.pageY - this.startDragMousePos, i = pr(
        this.startDragHandlePos + o,
        0,
        this.visibleHeight - this.scrollHandleHeight
      ), s = this.getScrollValueFromHandlePosition(i);
      this.updateScrollPosition(s);
    });
    b(this, "onHandleDragEnd", (r) => {
      this.setState({
        onDrag: !1
      }), r.preventDefault(), document.removeEventListener("mousemove", this.onHandleDrag), document.removeEventListener("mouseup", this.onHandleDragEnd);
    });
    b(this, "getInnerContainerClasses", () => this.state.scrollPos && this.props.addScrolledClass ? "rcs-inner-container rcs-content-scrolled" : "rcs-inner-container");
    b(this, "getScrollStyles", () => {
      const r = this.scrollbarYWidth || 20, o = this.props.rtl ? "marginLeft" : "marginRight", i = {
        height: this.props.heightRelativeToParent || this.props.flex ? "100%" : "",
        overscrollBehavior: this.props.allowOuterScroll ? "auto" : "none"
      };
      i[o] = -1 * r;
      const s = {
        height: this.props.heightRelativeToParent || this.props.flex ? "100%" : "",
        overflowY: this.props.freezePosition ? "hidden" : "visible"
      };
      return s[o] = this.scrollbarYWidth ? 0 : r, {
        innerContainer: i,
        contentWrapper: s
      };
    });
    b(this, "getOuterContainerStyle", () => ({
      height: this.props.heightRelativeToParent || this.props.flex ? "100%" : ""
    }));
    b(this, "getRootStyles", () => {
      const r = {};
      return this.props.heightRelativeToParent ? r.height = this.props.heightRelativeToParent : this.props.flex && (r.flex = this.props.flex), r;
    });
    b(this, "enforceMinHandleHeight", (r) => {
      const o = this.props.minScrollHandleHeight || 38;
      if (r.height >= o)
        return r;
      const i = o - r.height, s = this.state.scrollPos / (this.contentHeight - this.visibleHeight), c = i * s, f = r.top - c;
      return {
        height: o,
        top: f
      };
    });
    b(this, "onMouseEnter", () => {
      this.setState({ visible: !0 });
    });
    b(this, "onMouseLeave", () => {
      this.setState({ visible: !1 });
    });
    this.scrollbarYWidth = 0, this.state = {
      scrollPos: 0,
      onDrag: !1,
      visible: !1
    }, this.hideScrollThumb = Po(() => {
      this.setState({
        onDrag: !1
      });
    }, 500);
  }
  componentDidMount() {
    typeof this.props.scrollTo < "u" ? this.updateScrollPosition(this.props.scrollTo) : this.forceUpdate();
  }
  componentDidUpdate(r, o) {
    const i = this.contentHeight, s = this.visibleHeight, c = this.getScrolledElement(), f = o.scrollPos >= i - s;
    this.contentHeight = c.scrollHeight, this.scrollbarYWidth = c.offsetWidth - c.clientWidth, this.visibleHeight = c.clientHeight, this.scrollRatio = this.contentHeight ? this.visibleHeight / this.contentHeight : 1, this.toggleScrollIfNeeded();
    const l = this.state === o;
    (this.props.freezePosition || r.freezePosition) && this.adjustFreezePosition(r), typeof this.props.scrollTo < "u" && this.props.scrollTo !== r.scrollTo ? this.updateScrollPosition(this.props.scrollTo) : this.props.keepAtBottom && l && f && this.updateScrollPosition(this.contentHeight - this.visibleHeight);
  }
  componentWillUnmount() {
    this.hideScrollThumb.cancel(), document.removeEventListener("mousemove", this.onHandleDrag), document.removeEventListener("mouseup", this.onHandleDragEnd);
  }
  render() {
    const r = this.getScrollStyles(), o = this.getRootStyles(), i = this.enforceMinHandleHeight(
      this.getScrollHandleStyle()
    ), s = [
      this.props.className || "",
      "rcs-custom-scroll",
      this.state.onDrag ? "rcs-scroll-handle-dragged" : ""
    ].join(" ");
    return /* @__PURE__ */ ce.jsx(
      _o,
      {
        className: s,
        style: o,
        ref: this.customScrollRef,
        children: /* @__PURE__ */ ce.jsxs(
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
              this.hasScroll ? /* @__PURE__ */ ce.jsx("div", { className: "rcs-positioning", children: /* @__PURE__ */ ce.jsx(
                Lr,
                {
                  "data-testid": "custom-scrollbar",
                  ref: this.customScrollbarRef,
                  className: `rcs-custom-scrollbar ${this.props.rtl ? "rcs-custom-scrollbar-rtl" : ""} ${this.state.visible ? "scroll-visible" : ""}`,
                  children: /* @__PURE__ */ ce.jsx(
                    "div",
                    {
                      "data-testid": "custom-scroll-handle",
                      ref: this.scrollHandleRef,
                      className: "rcs-custom-scroll-handle",
                      style: i,
                      children: /* @__PURE__ */ ce.jsx(
                        xo,
                        {
                          className: this.props.handleClass || "rcs-inner-handle"
                        }
                      )
                    }
                  )
                },
                "scrollbar"
              ) }) : null,
              /* @__PURE__ */ ce.jsx(
                "div",
                {
                  "data-testid": "inner-container",
                  ref: this.innerContainerRef,
                  className: this.getInnerContainerClasses(),
                  style: r.innerContainer,
                  onScroll: this.onScroll,
                  children: /* @__PURE__ */ ce.jsx(
                    "div",
                    {
                      ref: this.contentWrapperRef,
                      style: r.contentWrapper,
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
  Ao as CustomScroll
};
//# sourceMappingURL=index.es.js.map
