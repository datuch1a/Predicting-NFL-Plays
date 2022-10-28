//Smmoth Scroll
! function () {
    function e() {
       z.keyboardSupport && m("keydown", a)
    }
 
    function t() {
       if (!A && document.body) {
          A = !0;
          var t = document.body,
             o = document.documentElement,
             n = window.innerHeight,
             r = t.scrollHeight;
          if (B = document.compatMode.indexOf("CSS") >= 0 ? o : t, D = t, e(), top != self) X = !0;
          else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
             var a = document.createElement("div");
             a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + B.scrollHeight + "px", document.body.appendChild(a);
             var i;
             T = function () {
                i || (i = setTimeout(function () {
                   L || (a.style.height = "0", a.style.height = B.scrollHeight + "px", i = null)
                }, 500))
             }, setTimeout(T, 10), m("resize", T);
             var l = {
                attributes: !0,
                childList: !0,
                characterData: !1
             };
             if (M = new W(T), M.observe(t, l), B.offsetHeight <= n) {
                var c = document.createElement("div");
                c.style.clear = "both", t.appendChild(c)
             }
          }
          z.fixedBackground || L || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
       }
    }
 
    function o() {
       M && M.disconnect(), w(_, r), w("mousedown", i), w("keydown", a), w("resize", T), w("load", t)
    }
 
    function n(e, t, o) {
       if (p(t, o), 1 != z.accelerationMax) {
          var n = Date.now(),
             r = n - j;
          if (r < z.accelerationDelta) {
             var a = (1 + 50 / r) / 2;
             a > 1 && (a = Math.min(a, z.accelerationMax), t *= a, o *= a)
          }
          j = Date.now()
       }
       if (q.push({
             x: t,
             y: o,
             lastX: 0 > t ? .99 : -.99,
             lastY: 0 > o ? .99 : -.99,
             start: Date.now()
          }), !P) {
          var i = e === document.body,
             l = function (n) {
                for (var r = Date.now(), a = 0, c = 0, u = 0; u < q.length; u++) {
                   var d = q[u],
                      s = r - d.start,
                      f = s >= z.animationTime,
                      m = f ? 1 : s / z.animationTime;
                   z.pulseAlgorithm && (m = x(m));
                   var w = d.x * m - d.lastX >> 0,
                      h = d.y * m - d.lastY >> 0;
                   a += w, c += h, d.lastX += w, d.lastY += h, f && (q.splice(u, 1), u--)
                }
                i ? window.scrollBy(a, c) : (a && (e.scrollLeft += a), c && (e.scrollTop += c)), t || o || (q = []), q.length ? V(l, e, 1e3 / z.frameRate + 1) : P = !1
             };
          V(l, e, 0), P = !0
       }
    }
 
    function r(e) {
       A || t();
       var o = e.target,
          r = u(o);
       if (!r || e.defaultPrevented || e.ctrlKey) return !0;
       if (h(D, "embed") || h(o, "embed") && /\.pdf/i.test(o.src) || h(D, "object") || o.shadowRoot) return !0;
       var a = -e.wheelDeltaX || e.deltaX || 0,
          i = -e.wheelDeltaY || e.deltaY || 0;
       return O && (e.wheelDeltaX && b(e.wheelDeltaX, 120) && (a = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))), e.wheelDeltaY && b(e.wheelDeltaY, 120) && (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))), a || i || (i = -e.wheelDelta || 0), 1 === e.deltaMode && (a *= 40, i *= 40), !z.touchpadSupport && v(i) ? !0 : (Math.abs(a) > 1.2 && (a *= z.stepSize / 120), Math.abs(i) > 1.2 && (i *= z.stepSize / 120), n(r, a, i), e.preventDefault(), void l())
    }
 
    function a(e) {
       var t = e.target,
          o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== K.spacebar;
       document.body.contains(D) || (D = document.activeElement);
       var r = /^(textarea|select|embed|object)$/i,
          a = /^(button|submit|radio|checkbox|file|color|image)$/i;
       if (e.defaultPrevented || r.test(t.nodeName) || h(t, "input") && !a.test(t.type) || h(D, "video") || g(e) || t.isContentEditable || o) return !0;
       if ((h(t, "button") || h(t, "input") && a.test(t.type)) && e.keyCode === K.spacebar) return !0;
       if (h(t, "input") && "radio" == t.type && R[e.keyCode]) return !0;
       var i, c = 0,
          d = 0,
          s = u(D),
          f = s.clientHeight;
       switch (s == document.body && (f = window.innerHeight), e.keyCode) {
          case K.up:
             d = -z.arrowScroll;
             break;
          case K.down:
             d = z.arrowScroll;
             break;
          case K.spacebar:
             i = e.shiftKey ? 1 : -1, d = -i * f * .9;
             break;
          case K.pageup:
             d = .9 * -f;
             break;
          case K.pagedown:
             d = .9 * f;
             break;
          case K.home:
             d = -s.scrollTop;
             break;
          case K.end:
             var m = s.scrollHeight - s.scrollTop - f;
             d = m > 0 ? m + 10 : 0;
             break;
          case K.left:
             c = -z.arrowScroll;
             break;
          case K.right:
             c = z.arrowScroll;
             break;
          default:
             return !0
       }
       n(s, c, d), e.preventDefault(), l()
    }
 
    function i(e) {
       D = e.target
    }
 
    function l() {
       clearTimeout(E), E = setInterval(function () {
          I = {}
       }, 1e3)
    }
 
    function c(e, t) {
       for (var o = e.length; o--;) I[F(e[o])] = t;
       return t
    }
 
    function u(e) {
       var t = [],
          o = document.body,
          n = B.scrollHeight;
       do {
          var r = I[F(e)];
          if (r) return c(t, r);
          if (t.push(e), n === e.scrollHeight) {
             var a = s(B) && s(o),
                i = a || f(B);
             if (X && d(B) || !X && i) return c(t, $())
          } else if (d(e) && f(e)) return c(t, e)
       } while (e = e.parentElement)
    }
 
    function d(e) {
       return e.clientHeight + 10 < e.scrollHeight
    }
 
    function s(e) {
       var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
       return "hidden" !== t
    }
 
    function f(e) {
       var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
       return "scroll" === t || "auto" === t
    }
 
    function m(e, t) {
       window.addEventListener(e, t, !1)
    }
 
    function w(e, t) {
       window.removeEventListener(e, t, !1)
    }
 
    function h(e, t) {
       return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }
 
    function p(e, t) {
       e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (Y.x !== e || Y.y !== t) && (Y.x = e, Y.y = t, q = [], j = 0)
    }
 
    function v(e) {
       return e ? (N.length || (N = [e, e, e]), e = Math.abs(e), N.push(e), N.shift(), clearTimeout(C), C = setTimeout(function () {
          window.localStorage && (localStorage.SS_deltaBuffer = N.join(","))
       }, 1e3), !y(120) && !y(100)) : void 0
    }
 
    function b(e, t) {
       return Math.floor(e / t) == e / t
    }
 
    function y(e) {
       return b(N[0], e) && b(N[1], e) && b(N[2], e)
    }
 
    function g(e) {
       var t = e.target,
          o = !1;
       if (-1 != document.URL.indexOf("www.youtube.com/watch"))
          do
             if (o = t.classList && t.classList.contains("html5-video-controls")) break; while (t = t.parentNode);
       return o
    }
 
    function S(e) {
       var t, o, n;
       return e *= z.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * z.pulseNormalize
    }
 
    function x(e) {
       return e >= 1 ? 1 : 0 >= e ? 0 : (1 == z.pulseNormalize && (z.pulseNormalize /= S(1)), S(e))
    }
 
    function k(e) {
       for (var t in e) H.hasOwnProperty(t) && (z[t] = e[t])
    }
    var D, M, T, E, C, H = {
          frameRate: 150,
          animationTime: 400,
          stepSize: 100,
          pulseAlgorithm: !0,
          pulseScale: 4,
          pulseNormalize: 1,
          accelerationDelta: 50,
          accelerationMax: 3,
          keyboardSupport: !0,
          arrowScroll: 50,
          touchpadSupport: !1,
          fixedBackground: !0,
          excluded: ""
       },
       z = H,
       L = !1,
       X = !1,
       Y = {
          x: 0,
          y: 0
       },
       A = !1,
       B = document.documentElement,
       N = [],
       O = /^Mac/.test(navigator.platform),
       K = {
          left: 37,
          up: 38,
          right: 39,
          down: 40,
          spacebar: 32,
          pageup: 33,
          pagedown: 34,
          end: 35,
          home: 36
       },
       R = {
          37: 1,
          38: 1,
          39: 1,
          40: 1
       },
       q = [],
       P = !1,
       j = Date.now(),
       F = function () {
          var e = 0;
          return function (t) {
             return t.uniqueID || (t.uniqueID = e++)
          }
       }(),
       I = {};
    window.localStorage && localStorage.SS_deltaBuffer && (N = localStorage.SS_deltaBuffer.split(","));
    var _, V = function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e, t, o) {
             window.setTimeout(e, o || 1e3 / 60)
          }
       }(),
       W = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
       $ = function () {
          var e;
          return function () {
             if (!e) {
                var t = document.createElement("div");
                t.style.cssText = "height:10000px;width:1px;", document.body.appendChild(t);
                var o = document.body.scrollTop;
                document.documentElement.scrollTop;
                window.scrollBy(0, 3), e = document.body.scrollTop != o ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(t)
             }
             return e
          }
       }(),
       U = window.navigator.userAgent,
       G = /Edge/.test(U),
       J = /chrome/i.test(U) && !G,
       Q = /safari/i.test(U) && !G,
       Z = /mobile/i.test(U),
       ee = /Windows NT 6.1/i.test(U) && /rv:11/i.test(U),
       te = (J || Q || ee) && !Z;
    "onwheel" in document.createElement("div") ? _ = "wheel" : "onmousewheel" in document.createElement("div") && (_ = "mousewheel"), _ && te && (m(_, r), m("mousedown", i), m("load", t)), k.destroy = o, window.SmoothScrollOptions && k(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () {
       return k
    }) : "object" == typeof exports ? module.exports = k : window.SmoothScroll = k
 }();