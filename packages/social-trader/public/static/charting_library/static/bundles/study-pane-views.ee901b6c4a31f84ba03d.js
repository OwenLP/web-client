(window.webpackJsonp = window.webpackJsonp || []).push([
  ["study-pane-views"],
  {
    psYU: function(e, t, i) {
      var n, r, s, o, a, d, l, h;
      i.r(t),
        i.d(t, "VertLinePaneView", function() {
          return h;
        }),
        (n = i("Eyy1")),
        (r = i("aO4+")),
        (s = i("k9/m")),
        (o = i("VdBB")),
        (a = i("Zy3/")),
        (d = i("a7Ha")),
        (l = i("pJOz")),
        (h = (function() {
          function e(e, t, i) {
            (this._data = []),
              (this._invalidated = !0),
              (this._provider = e),
              (this._model = t),
              (this._hitTestResult =
                void 0 !== i
                  ? new o.HitTestResult(o.HitTestResult.CUSTOM, i)
                  : new o.HitTestResult(o.HitTestResult.REGULAR));
          }
          return (
            (e.prototype.update = function() {
              this._invalidated = !0;
            }),
            (e.prototype.renderer = function() {
              var e, t, i, n, r;
              for (
                this._invalidated &&
                  (this._updateViewInternal(), (this._invalidated = !1)),
                  e = new a.CompositeRenderer(),
                  t = 0,
                  i = this._data;
                t < i.length;
                t++
              )
                (n = i[t]),
                  (r = new l.TrendLineRenderer()).setData(n),
                  r.setHitTest(this._hitTestResult),
                  e.append(r);
              return e;
            }),
            (e.prototype._updateViewInternal = function() {
              var e,
                t,
                i,
                o,
                a,
                l,
                h,
                p = this;
              (this._data = []),
                (e = this._provider.priceScale()),
                (t = this._model.timeScale()),
                !e ||
                  e.isEmpty() ||
                  t.isEmpty() ||
                  (0 !== (i = this._provider.graphics().vertlines()).size &&
                    null !==
                      (o = this._model.timeScale().visibleBarsStrictRange()) &&
                    null !== (a = this._provider.firstValue()) &&
                    ((l = o.firstBar()),
                    (h = o.lastBar()),
                    i.forEach(function(i, o) {
                      var u,
                        c,
                        v,
                        _,
                        w,
                        f,
                        m,
                        T,
                        R,
                        g,
                        y,
                        E,
                        x,
                        B = p._provider.properties().graphics.vertlines[o];
                      if (B.visible.value())
                        for (u = 0, c = i; u < c.length; u++)
                          for (
                            _ = (v = c[u]).indexes, w = 0, f = v.items;
                            w < f.length;
                            w++
                          )
                            (T = _[(m = f[w]).index]) ===
                              s.REMOVE_INDEX_MAGIC_NUMBER ||
                              T < l ||
                              h < T ||
                              ((R = t.indexToCoordinate(T) + 1),
                              (g = m.extendBottom
                                ? e.height()
                                : e.priceToCoordinate(
                                    Object(n.ensureDefined)(m.startPrice),
                                    a
                                  )),
                              (y = m.extendTop
                                ? 0
                                : e.priceToCoordinate(
                                    Object(n.ensureDefined)(m.endPrice),
                                    a
                                  )),
                              (E = new r.Point(R, g)),
                              (x = new r.Point(R, y)),
                              p._data.push({
                                points: [E, x],
                                extendleft: m.extendBottom,
                                extendright: m.extendTop,
                                leftend: d.LineEnd.Normal,
                                rightend: d.LineEnd.Normal,
                                width: t.width(),
                                height: e.height(),
                                color: B.color.value(),
                                linewidth: B.width.value(),
                                linestyle: B.style.value()
                              }));
                    })));
            }),
            e
          );
        })());
    }
  }
]);
