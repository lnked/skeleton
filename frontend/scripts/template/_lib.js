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
  typeof exports == 'object' && typeof module != 'undefined'
    ? (module.exports = t())
    : typeof define == 'function' && define.amd
      ? define(t)
      : (e.Template7 = t());
}(this, () => {
  function e() {
    for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
    let n = e[0],
      r = e[1];
    if (e.length === 2) {
      let i = new s(n),
        a = i.compile()(r);
      return (i = null), a;
    }
    return new s(n);
  }
  let t;
  t =
        typeof window != 'undefined'
          ? window
          : typeof global != 'undefined' ? global : void 0;
  var n = t,
    r = {
      quoteSingleRexExp: new RegExp("'", 'g'),
      quoteDoubleRexExp: new RegExp('"', 'g'),
      isFunction(e) {
        return typeof e == 'function';
      },
      escape(e) {
        return void 0 !== n && n.escape
          ? n.escape(e)
          : e
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
      },
      helperToSlices(e) {
        let t,
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
          let f = o[n],
            p = void 0,
            c = void 0;
          if (n === 0) s.push(f);
          else if (f.indexOf('"') === 0 || f.indexOf("'") === 0) {
            if (
              ((p = f.indexOf('"') === 0 ? a : l),
                (c = f.indexOf('"') === 0 ? '"' : "'"),
                f.match(p).length === 2)
            ) { s.push(f); } else {
              for (t = 0, i = n + 1; i < o.length; i += 1) {
                if (((f += ` ${o[i]}`), o[i].indexOf(c) >= 0)) {
                  (t = i), s.push(f);
                  break;
                }
              }
              t && (n = t);
            }
          } else if (f.indexOf('=') > 0) {
            let u = f.split('='),
              h = u[0],
              d = u[1];
            if (
              (p ||
                                ((p = d.indexOf('"') === 0 ? a : l),
                                  (c = d.indexOf('"') === 0 ? '"' : "'")),
                d.match(p).length !== 2)
            ) {
              for (t = 0, i = n + 1; i < o.length; i += 1) {
                if (((d += ` ${o[i]}`), o[i].indexOf(c) >= 0)) {
                  t = i;
                  break;
                }
              }
              t && (n = t);
            }
            const g = [h, d.replace(p, '')];
            s.push(g);
          } else s.push(f);
        }
        return s;
      },
      stringToBlocks(e) {
        let t,
          n,
          i = [];
        if (!e) return [];
        const a = e.split(/({{[^{^}]*}})/);
        for (t = 0; t < a.length; t += 1) {
          let l = a[t];
          if (l !== '') {
            if (l.indexOf('{{') < 0) { i.push({ type: 'plain', content: l }); } else {
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
              let o = r.helperToSlices(l),
                s = o[0],
                f = s === '>',
                p = [],
                c = {};
              for (n = 1; n < o.length; n += 1) {
                const u = o[n];
                Array.isArray(u)
                  ? (c[u[0]] = u[1] !== 'false' && u[1])
                  : p.push(u);
              }
              if (l.indexOf('{#') >= 0) {
                let h = '',
                  d = '',
                  g = 0,
                  v = void 0,
                  x = !1,
                  m = !1,
                  O = 0;
                for (n = t + 1; n < a.length; n += 1) {
                  if (
                    (a[n].indexOf('{{#') >= 0 && (O += 1),
                      a[n].indexOf('{{/') >= 0 && (O -= 1),
                      a[n].indexOf(`{{#${s}`) >= 0)
                  ) { (h += a[n]), m && (d += a[n]), (g += 1); } else if (a[n].indexOf(`{{/${s}`) >= 0) {
                    if (!(g > 0)) {
                      (v = n), (x = !0);
                      break;
                    }
                    (g -= 1), (h += a[n]), m && (d += a[n]);
                  } else {
                    a[n].indexOf('else') >= 0 && O === 0
                      ? (m = !0)
                      : (m || (h += a[n]),
                        m && (d += a[n]));
                  }
                }
                x &&
                                    (v && (t = v),
                                      s === 'raw'
                                        ? i.push({ type: 'plain', content: h })
                                        : i.push({
                                          type: 'helper',
                                          helperName: s,
                                          contextName: p,
                                          content: h,
                                          inverseContent: d,
                                          hash: c
                                        }));
              } else {
                l.indexOf(' ') > 0 &&
                                    (f &&
                                        ((s = '_partial'),
                                          p[0] &&
                                            (p[0] =
                                                `"${
                                                  p[0].replace(/"|'/g, '')
                                                }"`)),
                                      i.push({
                                        type: 'helper',
                                        helperName: s,
                                        contextName: p,
                                        hash: c
                                      }));
              }
            }
          }
        }
        return i;
      },
      parseJsVariable(e, t, n) {
        return e
          .split(/([+ -*\/^])/g)
          .map((e) => {
            if (e.indexOf(t) < 0) return e;
            if (!n) return JSON.stringify('');
            let r = n;
            return (
              e.indexOf(`${t}.`) >= 0 &&
                                e
                                  .split(`${t}.`)[1]
                                  .split('.')
                                  .forEach((e) => {
                                    r = r[e] ? r[e] : 'undefined';
                                  }),
              JSON.stringify(r)
            );
          })
          .join('');
      },
      parseJsParents(e, t) {
        return e
          .split(/([+ -*^])/g)
          .map((e) => {
            if (e.indexOf('../') < 0) return e;
            if (!t || t.length === 0) return JSON.stringify('');
            let n = e.split('../').length - 1,
              r = n > t.length ? t[t.length - 1] : t[n - 1],
              i = r;
            return (
              e
                .replace(/..\//g, '')
                .split('.')
                .forEach((e) => {
                  i = i[e] ? i[e] : 'undefined';
                }),
              JSON.stringify(i)
            );
          })
          .join('');
      },
      getCompileVar(e, t, n) {
        void 0 === n && (n = 'data_1');
        let r,
          i,
          a = t,
          l = 0;
        e.indexOf('../') === 0
          ? ((l = e.split('../').length - 1),
            (i = a.split('_')[1] - l),
            (a = `ctx_${i >= 1 ? i : 1}`),
            (r = e.split('../')[l].split('.')))
          : e.indexOf('@global') === 0
            ? ((a = 'Template7.global'),
              (r = e.split('@global.')[1].split('.')))
            : e.indexOf('@root') === 0
              ? ((a = 'root'), (r = e.split('@root.')[1].split('.')))
              : (r = e.split('.'));
        for (let o = 0; o < r.length; o += 1) {
          const s = r[o];
          if (s.indexOf('@') === 0) {
            let f = n.split('_')[1];
            l > 0 && (f = i),
            o > 0
              ? (a +=
                                      `[(data_${
                                        f
                                      } && data_${
                                        f
                                      }.${
                                        s.replace('@', '')
                                      })]`)
              : (a =
                                      `(data_${
                                        f
                                      } && data_${
                                        f
                                      }.${
                                        s.replace('@', '')
                                      })`);
          } else {
            isFinite(s)
              ? (a += `[${s}]`)
              : s === 'this' ||
                              s.indexOf('this.') >= 0 ||
                              s.indexOf('this[') >= 0 ||
                              s.indexOf('this(') >= 0
                ? (a = s.replace('this', t))
                : (a += `.${s}`);
          }
        }
        return a;
      },
      getCompiledArguments(e, t, n) {
        for (var i = [], a = 0; a < e.length; a += 1) {
          /^['"]/.test(e[a])
            ? i.push(e[a])
            : /^(true|false|\d+)$/.test(e[a])
              ? i.push(e[a])
              : i.push(r.getCompileVar(e[a], t, n));
        }
        return i.join(', ');
      }
    },
    i = {
      _partial: function(e, t) {
        const n = s.partials[e];
        if (!n || (n && !n.template)) return '';
        n.compiled || (n.compiled = new s(n.template).compile());
        const r = this;
        for (const i in t.hash) r[i] = t.hash[i];
        return n.compiled(r, t.data, t.root);
      },
      escape(e) {
        if (typeof e != 'string') { throw new Error('Template7: Passed context to "escape" helper should be a string'); }
        return r.escape(e);
      },
      if(e, t) {
        let n = e;
        return (
          r.isFunction(n) && (n = n.call(this)),
          n ? t.fn(this, t.data) : t.inverse(this, t.data)
        );
      },
      unless(e, t) {
        let n = e;
        return (
          r.isFunction(n) && (n = n.call(this)),
          n ? t.inverse(this, t.data) : t.fn(this, t.data)
        );
      },
      each(e, t) {
        let n = e,
          i = '',
          a = 0;
        if ((r.isFunction(n) && (n = n.call(this)), Array.isArray(n))) {
          for (
            t.hash.reverse && (n = n.reverse()), a = 0;
            a < n.length;
            a += 1
          ) {
            i += t.fn(n[a], {
              first: a === 0,
              last: a === n.length - 1,
              index: a
            });
          }
          t.hash.reverse && (n = n.reverse());
        } else for (const l in n) (a += 1), (i += t.fn(n[l], { key: l }));
        return a > 0 ? i : t.inverse(this);
      },
      with(e, t) {
        let n = e;
        return r.isFunction(n) && (n = e.call(this)), t.fn(n);
      },
      join(e, t) {
        let n = e;
        return (
          r.isFunction(n) && (n = n.call(this)),
          n.join(t.hash.delimiter || t.hash.delimeter)
        );
      },
      js(e, t) {
        let i,
          a = t.data,
          l = e;
        return (
          'index first last key'.split(' ').forEach((e) => {
            if (void 0 !== a[e]) {
              let t = new RegExp(`this.@${e}`, 'g'),
                n = new RegExp(`@${e}`, 'g');
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
                          ? `(function(){${l}})`
                          : `(function(){return (${l})})`),
          eval.call(this, i).call(this)
        );
      },
      js_if(e, t) {
        let n,
          i = t.data,
          a = e;
        return (
          'index first last key'.split(' ').forEach((e) => {
            if (void 0 !== i[e]) {
              let t = new RegExp(`this.@${e}`, 'g'),
                n = new RegExp(`@${e}`, 'g');
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
                          ? `(function(){${a}})`
                          : `(function(){return (${a})})`),
          eval.call(this, n).call(this)
            ? t.fn(this, t.data)
            : t.inverse(this, t.data)
        );
      }
    };
  i.js_compare = i.js_if;
  let a = {},
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
      if (typeof e != 'string') { throw new Error('Template7: Template must be a string'); }
      let s = r.stringToBlocks,
        f = r.getCompileVar,
        p = r.getCompiledArguments,
        c = s(e),
        u = `ctx_${t}`,
        h = `data_${t}`;
      if (c.length === 0) {
        return function() {
          return '';
        };
      }
      let d = '';
      (d +=
                t === 1
                  ? `(function (${u}, ${h}, root) {\n`
                  : `(function (${u}, ${h}) {\n`),
      t === 1 &&
                    ((d +=
                        'function isArray(arr){return Array.isArray(arr);}\n'),
                      (d +=
                        "function isFunction(func){return (typeof func === 'function');}\n"),
                      (d +=
                        'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n'),
                      (d += 'root = root || ctx_1 || {};\n')),
      (d += "var r = '';\n");
      let g;
      for (g = 0; g < c.length; g += 1) {
        const v = c[g];
        if (v.type !== 'plain') {
          let x = void 0,
            m = void 0;
          if (
            (v.type === 'variable' &&
                            ((x = f(v.contextName, u, h)),
                              (d += `r += c(${x}, ${u});`)),
              v.type === 'helper')
          ) {
            let O = void 0;
            if (u !== 'ctx_1') {
              for (
                var y = u.split('_')[1],
                  b = `ctx_${y - 1}`,
                  w = y - 2;
                w >= 1;
                w -= 1
              ) { b += `, ctx_${w}`; }
              O = `[${b}]`;
            } else O = `[${u}]`;
            if (v.helperName in i) {
              (m = p(v.contextName, u, h)),
              (d +=
                                    `r += (Template7.helpers.${
                                      v.helperName
                                    }).call(${
                                      u
                                    }, ${
                                      m && `${m}, `
                                    }{hash:${
                                      JSON.stringify(v.hash)
                                    }, data: ${
                                      h
                                    } || {}, fn: ${
                                      a(v, t + 1)
                                    }, inverse: ${
                                      l(v, t + 1)
                                    }, root: root, parents: ${
                                      O
                                    }});`);
            } else {
              if (v.contextName.length > 0) {
                throw new Error(`Template7: Missing helper: "${
                  v.helperName
                }"`);
              }
              (x = f(v.helperName, u, h)),
              (d += `if (${x}) {`),
              (d += `if (isArray(${x})) {`),
              (d +=
                                    `r += (Template7.helpers.each).call(${
                                      u
                                    }, ${
                                      x
                                    }, {hash:${
                                      JSON.stringify(v.hash)
                                    }, data: ${
                                      h
                                    } || {}, fn: ${
                                      a(v, t + 1)
                                    }, inverse: ${
                                      l(v, t + 1)
                                    }, root: root, parents: ${
                                      O
                                    }});`),
              (d += '}else {'),
              (d +=
                                    `r += (Template7.helpers.with).call(${
                                      u
                                    }, ${
                                      x
                                    }, {hash:${
                                      JSON.stringify(v.hash)
                                    }, data: ${
                                      h
                                    } || {}, fn: ${
                                      a(v, t + 1)
                                    }, inverse: ${
                                      l(v, t + 1)
                                    }, root: root, parents: ${
                                      O
                                    }});`),
              (d += '}}');
            }
          }
        } else {
          d +=
                        `r +='${
                          v.content
                            .replace(/\r/g, '\\r')
                            .replace(/\n/g, '\\n')
                            .replace(/'/g, "\\'")
                        }';`;
        }
      }
      return (
        (d += '\nreturn r;})'),
        t === 1 ? ((o.compiled = eval.call(n, d)), o.compiled) : d
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
}));
// # sourceMappingURL=template7.min.js.map
