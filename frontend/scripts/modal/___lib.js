/**
 * Template7 1.3.1
 * Mobile-first HTML template engine
 *
 * http://www.idangero.us/template7/
 *
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: October 25, 2017
 */
!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define(t)
      : (e.Template7 = t());
})(this, function() {
  'use strict';
  function e() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = e[0],
      r = e[1];
    if (2 === e.length) {
      var i = new s(n),
        a = i.compile()(r);
      return (i = null), a;
    }
    return new s(n);
  }
  var t;
  t =
        'undefined' != typeof window
          ? window
          : 'undefined' != typeof global ? global : void 0;
  var n = t,
    r = {
      quoteSingleRexExp: new RegExp("'", 'g'),
      quoteDoubleRexExp: new RegExp('"', 'g'),
      isFunction: function(e) {
        return 'function' == typeof e;
      },
      escape: function(e) {
        return void 0 !== n && n.escape
          ? n.escape(e)
          : e
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
      },
      helperToSlices: function(e) {
        var t,
          n,
          i,
          a = r.quoteDoubleRexExp,
          l = r.quoteSingleRexExp,
          o = e
            .replace(/[{}#}]/g, '')
            .trim()
            .split(' '),
          s = [];
        for (n = 0; n < o.length; n += 1) {
          var f = o[n],
            p = void 0,
            c = void 0;
          if (0 === n) s.push(f);
          else if (0 === f.indexOf('"') || 0 === f.indexOf("'"))
            if (
              ((p = 0 === f.indexOf('"') ? a : l),
                (c = 0 === f.indexOf('"') ? '"' : "'"),
                2 === f.match(p).length)
            )
              s.push(f);
            else {
              for (t = 0, i = n + 1; i < o.length; i += 1)
                if (((f += ' ' + o[i]), o[i].indexOf(c) >= 0)) {
                  (t = i), s.push(f);
                  break;
                }
              t && (n = t);
            }
          else if (f.indexOf('=') > 0) {
            var u = f.split('='),
              h = u[0],
              d = u[1];
            if (
              (p ||
                                ((p = 0 === d.indexOf('"') ? a : l),
                                  (c = 0 === d.indexOf('"') ? '"' : "'")),
                2 !== d.match(p).length)
            ) {
              for (t = 0, i = n + 1; i < o.length; i += 1)
                if (((d += ' ' + o[i]), o[i].indexOf(c) >= 0)) {
                  t = i;
                  break;
                }
              t && (n = t);
            }
            var g = [h, d.replace(p, '')];
            s.push(g);
          } else s.push(f);
        }
        return s;
      },
      stringToBlocks: function(e) {
        var t,
          n,
          i = [];
        if (!e) return [];
        var a = e.split(/({{[^{^}]*}})/);
        for (t = 0; t < a.length; t += 1) {
          var l = a[t];
          if ('' !== l)
            if (l.indexOf('{{') < 0)
              i.push({ type: 'plain', content: l });
            else {
              if (l.indexOf('{/') >= 0) continue;
              if (
                ((l = l
                  .replace(/{{([#\/])*([ ])*/, '{{$1')
                  .replace(/([ ])*}}/, '}}')),
                  l.indexOf('{#') < 0 &&
                                    l.indexOf(' ') < 0 &&
                                    l.indexOf('else') < 0)
              ) {
                i.push({
                  type: 'variable',
                  contextName: l.replace(/[{}]/g, '')
                });
                continue;
              }
              var o = r.helperToSlices(l),
                s = o[0],
                f = '>' === s,
                p = [],
                c = {};
              for (n = 1; n < o.length; n += 1) {
                var u = o[n];
                Array.isArray(u)
                  ? (c[u[0]] = 'false' !== u[1] && u[1])
                  : p.push(u);
              }
              if (l.indexOf('{#') >= 0) {
                var h = '',
                  d = '',
                  g = 0,
                  v = void 0,
                  x = !1,
                  m = !1,
                  O = 0;
                for (n = t + 1; n < a.length; n += 1)
                  if (
                    (a[n].indexOf('{{#') >= 0 && (O += 1),
                      a[n].indexOf('{{/') >= 0 && (O -= 1),
                      a[n].indexOf('{{#' + s) >= 0)
                  )
                    (h += a[n]), m && (d += a[n]), (g += 1);
                  else if (a[n].indexOf('{{/' + s) >= 0) {
                    if (!(g > 0)) {
                      (v = n), (x = !0);
                      break;
                    }
                    (g -= 1), (h += a[n]), m && (d += a[n]);
                  } else
                    a[n].indexOf('else') >= 0 && 0 === O
                      ? (m = !0)
                      : (m || (h += a[n]),
                        m && (d += a[n]));
                x &&
                                    (v && (t = v),
                                      'raw' === s
                                        ? i.push({ type: 'plain', content: h })
                                        : i.push({
                                          type: 'helper',
                                          helperName: s,
                                          contextName: p,
                                          content: h,
                                          inverseContent: d,
                                          hash: c
                                        }));
              } else
                l.indexOf(' ') > 0 &&
                                    (f &&
                                        ((s = '_partial'),
                                          p[0] &&
                                            (p[0] =
                                                '"' +
                                                p[0].replace(/"|'/g, '') +
                                                '"')),
                                      i.push({
                                        type: 'helper',
                                        helperName: s,
                                        contextName: p,
                                        hash: c
                                      }));
            }
        }
        return i;
      },
      parseJsVariable: function(e, t, n) {
        return e
          .split(/([+ -*\/^])/g)
          .map(function(e) {
            if (e.indexOf(t) < 0) return e;
            if (!n) return JSON.stringify('');
            var r = n;
            return (
              e.indexOf(t + '.') >= 0 &&
                                e
                                  .split(t + '.')[1]
                                  .split('.')
                                  .forEach(function(e) {
                                    r = r[e] ? r[e] : 'undefined';
                                  }),
              JSON.stringify(r)
            );
          })
          .join('');
      },
      parseJsParents: function(e, t) {
        return e
          .split(/([+ -*^])/g)
          .map(function(e) {
            if (e.indexOf('../') < 0) return e;
            if (!t || 0 === t.length) return JSON.stringify('');
            var n = e.split('../').length - 1,
              r = n > t.length ? t[t.length - 1] : t[n - 1],
              i = r;
            return (
              e
                .replace(/..\//g, '')
                .split('.')
                .forEach(function(e) {
                  i = i[e] ? i[e] : 'undefined';
                }),
              JSON.stringify(i)
            );
          })
          .join('');
      },
      getCompileVar: function(e, t, n) {
        void 0 === n && (n = 'data_1');
        var r,
          i,
          a = t,
          l = 0;
        0 === e.indexOf('../')
          ? ((l = e.split('../').length - 1),
            (i = a.split('_')[1] - l),
            (a = 'ctx_' + (i >= 1 ? i : 1)),
            (r = e.split('../')[l].split('.')))
          : 0 === e.indexOf('@global')
            ? ((a = 'Template7.global'),
              (r = e.split('@global.')[1].split('.')))
            : 0 === e.indexOf('@root')
              ? ((a = 'root'), (r = e.split('@root.')[1].split('.')))
              : (r = e.split('.'));
        for (var o = 0; o < r.length; o += 1) {
          var s = r[o];
          if (0 === s.indexOf('@')) {
            var f = n.split('_')[1];
            l > 0 && (f = i),
            o > 0
              ? (a +=
                                      '[(data_' +
                                      f +
                                      ' && data_' +
                                      f +
                                      '.' +
                                      s.replace('@', '') +
                                      ')]')
              : (a =
                                      '(data_' +
                                      f +
                                      ' && data_' +
                                      f +
                                      '.' +
                                      s.replace('@', '') +
                                      ')');
          } else
            isFinite(s)
              ? (a += '[' + s + ']')
              : 'this' === s ||
                              s.indexOf('this.') >= 0 ||
                              s.indexOf('this[') >= 0 ||
                              s.indexOf('this(') >= 0
                ? (a = s.replace('this', t))
                : (a += '.' + s);
        }
        return a;
      },
      getCompiledArguments: function(e, t, n) {
        for (var i = [], a = 0; a < e.length; a += 1)
          /^['"]/.test(e[a])
            ? i.push(e[a])
            : /^(true|false|\d+)$/.test(e[a])
              ? i.push(e[a])
              : i.push(r.getCompileVar(e[a], t, n));
        return i.join(', ');
      }
    },
    i = {
      _partial: function(e, t) {
        var n = s.partials[e];
        if (!n || (n && !n.template)) return '';
        n.compiled || (n.compiled = new s(n.template).compile());
        var r = this;
        for (var i in t.hash) r[i] = t.hash[i];
        return n.compiled(r, t.data, t.root);
      },
      escape: function(e) {
        if ('string' != typeof e)
          throw new Error(
            'Template7: Passed context to "escape" helper should be a string'
          );
        return r.escape(e);
      },
      if: function(e, t) {
        var n = e;
        return (
          r.isFunction(n) && (n = n.call(this)),
          n ? t.fn(this, t.data) : t.inverse(this, t.data)
        );
      },
      unless: function(e, t) {
        var n = e;
        return (
          r.isFunction(n) && (n = n.call(this)),
          n ? t.inverse(this, t.data) : t.fn(this, t.data)
        );
      },
      each: function(e, t) {
        var n = e,
          i = '',
          a = 0;
        if ((r.isFunction(n) && (n = n.call(this)), Array.isArray(n))) {
          for (
            t.hash.reverse && (n = n.reverse()), a = 0;
            a < n.length;
            a += 1
          )
            i += t.fn(n[a], {
              first: 0 === a,
              last: a === n.length - 1,
              index: a
            });
          t.hash.reverse && (n = n.reverse());
        } else for (var l in n) (a += 1), (i += t.fn(n[l], { key: l }));
        return a > 0 ? i : t.inverse(this);
      },
      with: function(e, t) {
        var n = e;
        return r.isFunction(n) && (n = e.call(this)), t.fn(n);
      },
      join: function(e, t) {
        var n = e;
        return (
          r.isFunction(n) && (n = n.call(this)),
          n.join(t.hash.delimiter || t.hash.delimeter)
        );
      },
      js: function(e, t) {
        var i,
          a = t.data,
          l = e;
        return (
          'index first last key'.split(' ').forEach(function(e) {
            if (void 0 !== a[e]) {
              var t = new RegExp('this.@' + e, 'g'),
                n = new RegExp('@' + e, 'g');
              l = l
                .replace(t, JSON.stringify(a[e]))
                .replace(n, JSON.stringify(a[e]));
            }
          }),
          t.root &&
                        l.indexOf('@root') >= 0 &&
                        (l = r.parseJsVariable(l, '@root', t.root)),
          l.indexOf('@global') >= 0 &&
                        (l = r.parseJsVariable(
                          l,
                          '@global',
                          n.Template7.global
                        )),
          l.indexOf('../') >= 0 &&
                        (l = r.parseJsParents(l, t.parents)),
          (i =
                        l.indexOf('return') >= 0
                          ? '(function(){' + l + '})'
                          : '(function(){return (' + l + ')})'),
          eval.call(this, i).call(this)
        );
      },
      js_if: function(e, t) {
        var n,
          i = t.data,
          a = e;
        return (
          'index first last key'.split(' ').forEach(function(e) {
            if (void 0 !== i[e]) {
              var t = new RegExp('this.@' + e, 'g'),
                n = new RegExp('@' + e, 'g');
              a = a
                .replace(t, JSON.stringify(i[e]))
                .replace(n, JSON.stringify(i[e]));
            }
          }),
          t.root &&
                        a.indexOf('@root') >= 0 &&
                        (a = r.parseJsVariable(a, '@root', t.root)),
          a.indexOf('@global') >= 0 &&
                        (a = r.parseJsVariable(a, '@global', s.global)),
          a.indexOf('../') >= 0 &&
                        (a = r.parseJsParents(a, t.parents)),
          (n =
                        a.indexOf('return') >= 0
                          ? '(function(){' + a + '})'
                          : '(function(){return (' + a + ')})'),
          eval.call(this, n).call(this)
            ? t.fn(this, t.data)
            : t.inverse(this, t.data)
        );
      }
    };
  i.js_compare = i.js_if;
  var a = {},
    l = {},
    o = n.document.createElement('script');
  n.document.head.appendChild(o);
  var s = function(e) {
      this.template = e;
    },
    f = { options: {}, partials: {}, helpers: {} };
  return (
    (s.prototype.compile = function(e, t) {
      function a(e, t) {
        return e.content
          ? o.compile(e.content, t)
          : function() {
            return '';
          };
      }
      function l(e, t) {
        return e.inverseContent
          ? o.compile(e.inverseContent, t)
          : function() {
            return '';
          };
      }
      void 0 === e && (e = this.template), void 0 === t && (t = 1);
      var o = this;
      if (o.compiled) return o.compiled;
      if ('string' != typeof e)
        throw new Error('Template7: Template must be a string');
      var s = r.stringToBlocks,
        f = r.getCompileVar,
        p = r.getCompiledArguments,
        c = s(e),
        u = 'ctx_' + t,
        h = 'data_' + t;
      if (0 === c.length)
        return function() {
          return '';
        };
      var d = '';
      (d +=
                1 === t
                  ? '(function (' + u + ', ' + h + ', root) {\n'
                  : '(function (' + u + ', ' + h + ') {\n'),
      1 === t &&
                    ((d +=
                        'function isArray(arr){return Array.isArray(arr);}\n'),
                      (d +=
                        "function isFunction(func){return (typeof func === 'function');}\n"),
                      (d +=
                        'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n'),
                      (d += 'root = root || ctx_1 || {};\n')),
      (d += "var r = '';\n");
      var g;
      for (g = 0; g < c.length; g += 1) {
        var v = c[g];
        if ('plain' !== v.type) {
          var x = void 0,
            m = void 0;
          if (
            ('variable' === v.type &&
                            ((x = f(v.contextName, u, h)),
                              (d += 'r += c(' + x + ', ' + u + ');')),
              'helper' === v.type)
          ) {
            var O = void 0;
            if ('ctx_1' !== u) {
              for (
                var y = u.split('_')[1],
                  b = 'ctx_' + (y - 1),
                  w = y - 2;
                w >= 1;
                w -= 1
              )
                b += ', ctx_' + w;
              O = '[' + b + ']';
            } else O = '[' + u + ']';
            if (v.helperName in i)
              (m = p(v.contextName, u, h)),
              (d +=
                                    'r += (Template7.helpers.' +
                                    v.helperName +
                                    ').call(' +
                                    u +
                                    ', ' +
                                    (m && m + ', ') +
                                    '{hash:' +
                                    JSON.stringify(v.hash) +
                                    ', data: ' +
                                    h +
                                    ' || {}, fn: ' +
                                    a(v, t + 1) +
                                    ', inverse: ' +
                                    l(v, t + 1) +
                                    ', root: root, parents: ' +
                                    O +
                                    '});');
            else {
              if (v.contextName.length > 0)
                throw new Error(
                  'Template7: Missing helper: "' +
                                        v.helperName +
                                        '"'
                );
              (x = f(v.helperName, u, h)),
              (d += 'if (' + x + ') {'),
              (d += 'if (isArray(' + x + ')) {'),
              (d +=
                                    'r += (Template7.helpers.each).call(' +
                                    u +
                                    ', ' +
                                    x +
                                    ', {hash:' +
                                    JSON.stringify(v.hash) +
                                    ', data: ' +
                                    h +
                                    ' || {}, fn: ' +
                                    a(v, t + 1) +
                                    ', inverse: ' +
                                    l(v, t + 1) +
                                    ', root: root, parents: ' +
                                    O +
                                    '});'),
              (d += '}else {'),
              (d +=
                                    'r += (Template7.helpers.with).call(' +
                                    u +
                                    ', ' +
                                    x +
                                    ', {hash:' +
                                    JSON.stringify(v.hash) +
                                    ', data: ' +
                                    h +
                                    ' || {}, fn: ' +
                                    a(v, t + 1) +
                                    ', inverse: ' +
                                    l(v, t + 1) +
                                    ', root: root, parents: ' +
                                    O +
                                    '});'),
              (d += '}}');
            }
          }
        } else
          d +=
                        "r +='" +
                        v.content
                          .replace(/\r/g, '\\r')
                          .replace(/\n/g, '\\n')
                          .replace(/'/g, "\\'") +
                        "';";
      }
      return (
        (d += '\nreturn r;})'),
        1 === t ? ((o.compiled = eval.call(n, d)), o.compiled) : d
      );
    }),
    (f.options.get = function() {
      return a;
    }),
    (f.partials.get = function() {
      return l;
    }),
    (f.helpers.get = function() {
      return i;
    }),
    Object.defineProperties(s, f),
    (e.registerHelper = function(e, t) {
      s.helpers[e] = t;
    }),
    (e.unregisterHelper = function(e) {
      (s.helpers[e] = void 0), delete s.helpers[e];
    }),
    (e.registerPartial = function(e, t) {
      s.partials[e] = { template: t };
    }),
    (e.unregisterPartial = function(e) {
      s.partials[e] && ((s.partials[e] = void 0), delete s.partials[e]);
    }),
    (e.compile = function(e, t) {
      return new s(e, t).compile();
    }),
    (e.options = s.options),
    (e.helpers = s.helpers),
    (e.partials = s.partials),
    e
  );
});
//# sourceMappingURL=template7.min.js.map
