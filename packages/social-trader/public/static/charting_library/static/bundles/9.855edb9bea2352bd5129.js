(window.webpackJsonp = window.webpackJsonp || []).push([
  [9],
  {
    DxCR: function(t, e, i) {
      (function(t) {
        function o(t, e) {
          return '<label for="' + e + '">' + t + "</label>";
        }
        function r(t, e) {
          (this._model = e),
            (this._bindings = []),
            (this._property = t),
            (this.supportThemeSwitcher = !1);
        }
        function n(t) {
          return function(e) {
            return e < t ? t : e;
          };
        }
        function s(t) {
          return function(e) {
            return e > t ? t : e;
          };
        }
        function a(t) {
          return function(e) {
            var i = parseInt(e, 10);
            return V(i) ? t : i;
          };
        }
        function l(t) {
          var e = new I();
          return function(i) {
            var o = e.parse(i);
            return V(o) ? t : o;
          };
        }
        function c(t, e, i, o, r, n, s) {
          H.call(this, t, e, o, r, n),
            (this._transformFunction = i),
            (this._setter = s),
            this._attachToControl(t, o);
        }
        function u(t, e, i, o, r) {
          c.call(this, t, e, l(e.value()), i, o, r),
            this.addFormatter(function(t) {
              return new I().format(t);
            });
        }
        function h(t, e, i, o, r, n) {
          (this._subControlIds = e),
            H.call(this, t, i, o, r, n),
            this._forEachSubControl(function(t) {
              this._attachToControl(t, o);
            });
        }
        function p(t, e, i, o, r, n, s) {
          (this._model = o),
            (this._mainSeries = n),
            (this._toIntTransformer = a(s)),
            (this._disabled = !1),
            H.call(this, t, e, i, o, r);
          var l = this;
          i &&
            t.change(function() {
              l.setValueToProperty(l.value());
            }),
            this._mainSeries
              .dataEvents()
              .barReceived()
              .subscribe(this, function() {
                l.setValue(this.property().value());
              });
        }
        function d(t, e, i, o, r, n, s) {
          H.call(this, t, e, i, o, r),
            (this._transform = n),
            i &&
              t.on(
                "accept-symbol",
                function(t, e) {
                  this.setValueToProperty(e), this.setValue(e);
                }.bind(this)
              ),
            s &&
              (s.subscribe(this, this._updateDisplayedSymbol),
              (this._updateDelegate = s));
        }
        function f(t, e, i, o, r, n, s, a) {
          H.call(this, t, e, o, r, n),
            (this._transformFunction = i),
            (this._propertyChangedHook = a),
            (this._setter = s);
          var l = this;
          o &&
            t.change(function() {
              l._setter
                ? l._setter.call(l, l.value())
                : l.setValueToProperty(l.value());
            });
        }
        function v(t, e) {
          H.call(this, t, e);
        }
        function g(t, e, i, o, r, n) {
          if (!t.is(":checkbox, :radio")) return new m(t, e, i, o, r);
          H.call(this, t, e, i, o, r), (this._setter = n);
          var s = this;
          i &&
            t.change(function() {
              s._setter
                ? s._setter.call(s, s.value())
                : s.setValueToProperty(s.value());
            });
        }
        function _(t, e, i, o, r, n) {
          H.call(this, t, e, i, o, r), (this._inverted = !0 === n);
        }
        function m(t, e, i, o, r) {
          H.call(this, t, e, i, o, r);
          var n = this;
          i &&
            t.click(function() {
              var t = $(this)
                .toggleClass("active")
                .hasClass("active");
              n.setValueToProperty(t);
            });
        }
        function b(t, e, i, o, r, n) {
          var s, a;
          (s = t.is("input") ? t : t.find("input")),
            H.call(this, s, e, i, o, r),
            (this._transparencyProperty = n),
            this.applyOldTransparency(),
            (a = this),
            i &&
              s.change(function() {
                a.setValueToProperty(a.value());
              });
        }
        function y(e, i, o, r, n, s) {
          function a(t, e) {
            var i = c.control().slider("option", "min"),
              o = c.control().slider("option", "max"),
              r = c._property.value();
            ((i <= r && r <= o) || (i < e.value && e.value < o)) &&
              c.setValueToProperty(e.value);
          }
          function l(t, e) {
            c.setValueToProperty(e.value);
          }
          isNumber(i.value()) ||
            (B.logWarn(
              "Property cannot be binded to control, bad value (expect number): " +
                i.value()
            ),
            (i = new t())),
            H.call(this, e, i, o, r, n);
          var c = this;
          o &&
            (s
              ? (e.bind("slidechange", a), e.bind("slide", a))
              : (e.bind("slidechange", l), e.bind("slide", l))),
            e.bind("slidestart", function(t, e) {
              r.beginUndoMacro(n);
            }),
            e.bind("slidestop", function(t, e) {
              r.endUndoMacro();
            });
        }
        function C(t, e, i, o, r) {
          (this._control = t),
            (this._wv = e),
            (this._transformFunction = i),
            (this._undoModel = o),
            (this._undoText = r),
            this._attachToControl(this._control),
            (this._setValueBinded = this.setValue.bind(this));
        }
        function T(t, e, i, o, r, n) {
          (this._not = !!n), C.apply(this, arguments);
        }
        function k(t, e, i, o, r, n, s, a) {
          (this._propFrom = e[0]),
            (this._propTo = e[1]),
            (this._control = t),
            (this._applyOnFly = o),
            (this._undoModel = r),
            (this._undoText = s),
            (this._properties = e),
            (this._inputsText = n),
            (this._transformers = i);
          var l = this;
          t.slider({
            range: !0,
            min: i[0],
            max: i[1],
            values: [l._propFrom.value(), l._propTo.value()]
          }),
            (this.$rangeHandleFrom = $(t.find(".ui-slider-handle")[0]).addClass(
              "from"
            )),
            (this.$rangeHandleTo = $(t.find(".ui-slider-handle")[1]).addClass(
              "to"
            )),
            this.setValue(this._propFrom, 0),
            this.setValue(this._propTo, 1),
            a &&
              ($(a).on("change", function(t) {
                $(this).is(":checked")
                  ? (l._control.slider("enable"),
                    $(l._inputsText[0]).prop("disabled", !1),
                    $(l._inputsText[1]).prop("disabled", !1))
                  : (l._control.slider("disable"),
                    $(l._inputsText[0]).prop("disabled", !0),
                    $(l._inputsText[1]).prop("disabled", !0));
              }),
              $(a).is(":checked")
                ? (l._control.slider("enable"),
                  $(l._inputsText[0]).prop("disabled", !1),
                  $(l._inputsText[1]).prop("disabled", !1))
                : (l._control.slider("disable"),
                  $(l._inputsText[0]).prop("disabled", !0),
                  $(l._inputsText[1]).prop("disabled", !0))),
            n &&
              ($(n[0]).val(this._control.slider("values", 0)),
              $(n[1]).val(this._control.slider("values", 1)),
              t.slider({
                slide: function(t, e) {
                  $(n[0]).val(e.values[0]), $(n[1]).val(e.values[1]);
                }
              }),
              $(n).each(function() {
                $(this).on("keydown", function(t) {
                  parseInt($(n[0]).val()) < l._transformers[0]
                    ? $(n[0]).val(l._transformers[0])
                    : parseInt($(n[1]).val()) > l._transformers[1] &&
                      $(n[1]).val(l._transformers[1]),
                    -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
                      (65 === t.keyCode && !0 === t.ctrlKey) ||
                      (67 === t.keyCode && !0 === t.ctrlKey) ||
                      (88 === t.keyCode && !0 === t.ctrlKey) ||
                      (t.keyCode >= 35 && t.keyCode <= 39) ||
                      ((t.shiftKey || t.keyCode < 48 || t.keyCode > 57) &&
                        (t.keyCode < 96 || t.keyCode > 105) &&
                        t.preventDefault());
                });
              }),
              $(n[0]).on("keyup", function(t) {
                parseInt($(this).val()) < l._transformers[0]
                  ? $(this).val(l._transformers[0])
                  : parseInt($(this).val()) > l._transformers[1] &&
                    $(this).val(l._transformers[1]),
                  parseInt($(this).val()) > parseInt($(n[1]).val()) &&
                    $(this).val(n[1].val()),
                  l._control.slider("values", 0, $(this).val()),
                  k.prototype.setValueToProperty.call(
                    l,
                    l._control.slider("values"),
                    "from"
                  );
              }),
              $(n[1]).on("keyup", function(t) {
                parseInt($(this).val()) < l._transformers[0]
                  ? $(this).val(l._transformers[0])
                  : parseInt($(this).val()) > l._transformers[1] &&
                    $(this).val(l._transformers[1]),
                  parseInt($(this).val()) < $(n[0]).val() &&
                    $(this).val(n[0].val()),
                  l._control.slider("values", 1, $(this).val()),
                  k.prototype.setValueToProperty.call(
                    l,
                    l._control.slider("values"),
                    "to"
                  );
              })),
            this._propFrom
              .listeners()
              .subscribe(this, k.prototype.propertyChanged),
            this._propTo
              .listeners()
              .subscribe(this, k.prototype.propertyChanged),
            o &&
              t.on("slide", function(t, e) {
                l.setValueToProperty(l._control.slider("values"), e.handle);
              }),
            t.slider({
              stop: function(t, e) {
                n &&
                  ($(n[0]).val(l._control.slider("values", 0)),
                  $(n[1]).val(l._control.slider("values", 1))),
                  l.setValueToProperty(l._control.slider("values"), e.handle);
              },
              start: function(t, e) {
                n &&
                  ($(n[0]).val(l._control.slider("values", 0)),
                  $(n[1]).val(l._control.slider("values", 1))),
                  l.setValueToProperty(l._control.slider("values"), e.handle);
              }
            });
        }
        function w(t, e, i, o, r, n) {
          H.call(this, t, e, i, o, r), (this._separator = n || " ");
          var s = this;
          i &&
            t.change(function() {
              s.setValueToProperty(s.value());
            });
        }
        var x, M, V, S, E, P, O, F, I, D, R, A, H, B, L;
        i("jgM0"),
          i("QBwY"),
          (x = i("56W2")),
          (M = i("Eyy1").ensureNotNull),
          (V = i("ivNn").isNaN),
          (S = i("eJTA")),
          (E = S.rgba),
          (P = S.rgbaToString),
          (O = S.parseRgb),
          (F = i("XPit").TimePointIndexSearchMode),
          (I = i("zXvd").NumericFormatter),
          (D = i("T6Of").LimitedPrecisionNumericFormatter),
          (R = i("Tmoa")),
          (A = i("jNEI").addColorPicker),
          (H = i("2h0C").Binding),
          (B = i("uOxu").getLogger("Chart.PropertyPage")),
          (L = i("MWAT").allPriceScaleSelectionStrategyInfo),
          (r.prototype.model = function() {
            return this._model;
          }),
          (r.prototype.bindControl = function(t) {
            return this._bindings.push(t), t;
          }),
          (r.prototype.unbindControl = function(t) {
            var e = this._bindings.indexOf(t);
            -1 !== e && this._bindings.splice(e, 1);
          }),
          (r.prototype.loadData = function() {
            var t, e, i;
            for (t = 0; t < this._bindings.length; t++)
              (e = this._bindings[t]).properties
                ? ((i = e.properties()),
                  e.setValue(i[0], 0),
                  e.setValue(i[1], 1))
                : e.property &&
                  (e.transparencyProperty && e.transparencyProperty()
                    ? e.applyOldTransparency()
                    : e.setValue(e.property().value()));
          }),
          (r.prototype.saveData = function() {
            var t, e;
            for (
              this._model.beginUndoMacro(), t = 0;
              t < this._bindings.length;
              t++
            )
              (e = this._bindings[t]).changed() &&
                this._model.setProperty(e.property(), e.value());
            this._model.endUndoMacro();
          }),
          (r.prototype.createLineWidthEditor = function() {
            var t = this._model._chartWidget.widget().prop("ownerDocument");
            return $('<div class="linewidth-slider">', t).slider({
              max: 4,
              min: 1,
              step: 1
            });
          }),
          (r.prototype.createColorPicker = function(t) {
            return A(null, t);
          }),
          (r.prototype.createTextEditor = function(t, e) {
            var i = {};
            return (
              t && (i.width = t),
              e && (i.height = e),
              $(document.createElement("textarea"))
                .css(i)
                .addClass("tv-control-input")
            );
          }),
          (r.prototype.createCombo = function(t) {
            var e = $(document.createElement("select")),
              i = t.reduce(function(t, e) {
                return t.add(
                  $(document.createElement("option")).prop({
                    value: e,
                    text: e
                  })
                );
              }, $());
            return e.append(i);
          }),
          (r.prototype.createKeyCombo = function(t) {
            var e = $(document.createElement("select"));
            return (
              $.each(t || [], function(t, i) {
                $(document.createElement("option"))
                  .prop({ value: t, text: i })
                  .appendTo(e);
              }),
              e
            );
          }),
          (r.prototype.createFontEditor = function(t) {
            var e =
              t ||
              TradingView.factoryDefaults("chartproperties.editorFontsList");
            return this.createCombo(e);
          }),
          (r.prototype.createFontSizeEditor = function(t) {
            var e = t || [10, 11, 12, 14, 16, 20, 24, 28, 32, 40];
            return this.createCombo(e).addClass("tv-select-container-fontsize");
          }),
          (r.prototype.createSeriesMinTickEditor = function() {
            var t,
              e,
              i =
                "<select><option value='default'>" +
                $.t("Default") +
                "</option>",
              o = [
                { priceScale: 1, minMove: 1, frac: !1 },
                { priceScale: 10, minMove: 1, frac: !1 },
                { priceScale: 100, minMove: 1, frac: !1 },
                { priceScale: 1e3, minMove: 1, frac: !1 },
                { priceScale: 1e4, minMove: 1, frac: !1 },
                { priceScale: 1e5, minMove: 1, frac: !1 },
                { priceScale: 1e6, minMove: 1, frac: !1 },
                { priceScale: 1e7, minMove: 1, frac: !1 },
                { priceScale: 1e8, minMove: 1, frac: !1 },
                { priceScale: 2, minMove: 1, frac: !0 },
                { priceScale: 4, minMove: 1, frac: !0 },
                { priceScale: 8, minMove: 1, frac: !0 },
                { priceScale: 16, minMove: 1, frac: !0 },
                {
                  priceScale: 32,
                  minMove: 1,
                  frac: !0
                },
                { priceScale: 64, minMove: 1, frac: !0 },
                { priceScale: 128, minMove: 1, frac: !0 },
                { priceScale: 320, minMove: 1, frac: !0 }
              ];
            for (t in o)
              i +=
                "<option value='" +
                ((e = o[t]).priceScale + "," + e.minMove + "," + e.frac) +
                "'>" +
                (e.minMove + "/" + e.priceScale) +
                "</option>";
            return (i += "</select>"), $(i);
          }),
          (r.prototype.createPriceScaleStrategyEditor = function() {
            var t =
              L().reduce(function(t, e) {
                return (
                  t + "<option value='" + e.name + "'>" + e.title + "</option>"
                );
              }, "<select>") + "</select>";
            return $(t);
          }),
          (r.prototype.createPrecisionEditor = function() {
            var t,
              e =
                "<select><option value='default'>" +
                $.t("Default") +
                "</option>";
            for (t = 0; t <= 8; t++)
              e += "<option value='" + t + "'>" + t + "</option>";
            return (e += "</select>"), $(e);
          }),
          (r.prototype.createLabeledCell = function(t, e, i) {
            var o,
              r,
              n,
              s,
              a = null;
            return (
              "number" == typeof t.valueOf()
                ? ((a = t), (o = e), (r = i))
                : ((o = t), (r = e)),
              (o += ""),
              (n = this._labelToId(o)),
              (s = $("<td>")),
              $("<label>")
                .html(o.length > 0 ? $.t(o) : "")
                .attr("for", n)
                .appendTo(s),
              a && s.attr("colspan", a),
              r && r.attr("id", n),
              s
            );
          }),
          (r.prototype.createTableInTable = function(t) {
            var e = $("<tr>").appendTo(t),
              i = $("<td>").appendTo(e);
            return $('<table cellpadding="0" cellspacing="0">').appendTo(i);
          }),
          (r.prototype._labelToId = function(t) {
            return (
              "control" +
              t.replace(/(^| )\w/g, function(t) {
                return "-" + t.trim().toLowerCase();
              }) +
              Math.floor(1e3 * Math.random())
            );
          }),
          (r.prototype.addRow = function(t) {
            return $(document.createElement("tr")).appendTo(t);
          }),
          (r.prototype.addLabeledRow = function(t, e, i, r) {
            var n,
              s = e && e.length > 0 ? $.t(e) : "",
              a = $(document.createElement("tr")),
              l = $(document.createElement("td")).html(s);
            return (
              r && ((r = parseInt(r)), V(r) && (r = 2), l.attr("colspan", r)),
              i && ((n = this._labelToId(e)), i.attr("id", n), l.html(o(s, n))),
              a.append(l).appendTo(t)
            );
          }),
          (r.prototype.addEditorRow = function(t, e, i, o) {
            var r = $(document.createElement("td"));
            return (
              (i.row = this.addLabeledRow(t, e, i, o)),
              i.appendTo(r.appendTo(i.row)),
              i
            );
          }),
          (r.prototype.addColorPickerRow = function(t, e) {
            return this.addEditorRow(t, e, this.createColorPicker());
          }),
          (r.prototype.addOffsetEditorRow = function(t, e) {
            var i = $("<input/>");
            return (
              i.attr("type", "text"),
              i.css("width", "100px"),
              i.addClass("ticker"),
              this.addEditorRow(t, e, i)
            );
          }),
          (r.prototype.addFontEditorRow = function(t, e) {
            return this.addEditorRow(t, e, this.createFontEditor());
          }),
          (r.prototype.refreshStateControls = function(t, e, i) {
            var o, r, n;
            for (o = 0; o < e.length; o++) {
              n = t[(r = e[o]).id];
              try {
                n.toggle(this.parseRule(r.visible, e, i));
              } catch (t) {
                continue;
              }
              n.attr("disabled", !this.parseRule(r.visible, e, i));
            }
          }),
          (r.prototype.parseRule = function(t, e, i) {
            if (!t) return !0;
            var o = t.split("==");
            return !(o.length < 2) && i[o[0]].value() === o[1];
          }),
          (r.prototype.destroy = function() {
            for (var t = this._bindings.length; t--; )
              this._bindings[t].destroy();
            this._bindings.length = 0;
          }),
          (r.prototype.bindInteger = function(t, e, i, o, r) {
            var l = [a(e.value())];
            void 0 !== o && l.push(n(1)),
              void 0 !== r && l.push(s(1e3)),
              this.bindControl(new c(t, e, l, !1, this.model(), i));
          }),
          (r.prototype.bindColor = function(t, e, i) {
            this.bindControl(new b(t, e, !0, this.model(), i));
          }),
          (r.prototype.bindBoolean = function(t, e, i) {
            this.bindControl(new g(t, e, !0, this.model(), i));
          }),
          inherit(c, H),
          (c.prototype.value = function() {
            var t,
              e = this._control.val();
            if (this._transformFunction)
              if (Array.isArray(this._transformFunction))
                for (t = 0; t < this._transformFunction.length; t++)
                  e = this._transformFunction[t](e);
              else e = this._transformFunction(e);
            return e;
          }),
          (c.prototype.setValue = function(t) {
            var e = this._control.val(),
              i = this._formatValue(t);
            e !== i && this._control.val(i);
          }),
          (c.prototype.setValueToProperty = function(t) {
            this._setter
              ? this._setter.call(this, this.value())
              : this._undoModel.setProperty(this._property, t, this._undoText),
              (this._changed = !1);
          }),
          inherit(u, c),
          inherit(h, H),
          (h.prototype._forEachSubControl = function(t) {
            this._subControlIds.forEach(function(e) {
              var i = "#" + e,
                o = this.control().find(i);
              t.call(this, o);
            }, this);
          }),
          (h.prototype._parseSessions = function(t) {
            var e,
              i,
              o = t.split("-", 2);
            return (
              2 !== o.length && (o = ["0", "0"]),
              (e = parseInt(o[0])),
              (i = parseInt(o[1])),
              [Math.floor(e / 100), e % 100, Math.floor(i / 100), i % 100]
            );
          }),
          (h.prototype.value = function() {
            var t,
              e,
              i,
              o = [];
            return (
              this._forEachSubControl(function(t) {
                o.push(t.val());
              }),
              (t = function(t, e) {
                return (
                  e.forEach(function(e) {
                    t = e(t);
                  }),
                  ("0" + t).slice(-2)
                );
              }),
              (e = [a(0), n(0), s(23)]),
              (i = [a(0), n(0), s(59)]),
              t(o[0], e) + t(o[1], i) + "-" + t(o[2], e) + t(o[3], i)
            );
          }),
          (h.prototype.setValue = function(t) {
            var e = this._parseSessions(t);
            this._forEachSubControl(function(t) {
              var i = t.val(),
                o = ("0" + e[0]).slice(-2);
              e.shift(), i !== o && t.val(o);
            });
          }),
          inherit(p, H),
          (p.prototype.value = function() {
            var t, e, i;
            return this._disabled
              ? (this._control.attr("disabled", !0), null)
              : ((t = this._control.val()),
                (e = this._toIntTransformer(t)) < 0 && (e = 0),
                (i = this._mainSeries.bars().size()) <= e && (e = i - 1),
                1e3 *
                  M(
                    this._mainSeries
                      .bars()
                      .valueAt(M(this._mainSeries.bars().lastIndex()) - e)
                  )[TradingView.TIME_PLOT]);
          }),
          (p.prototype.setValue = function(t) {
            var e, i;
            if (this._disabled || null == t) this._control.attr("disabled", !0);
            else {
              if (t < 0)
                return (
                  this._control.val(-t),
                  void this._property.setValue(this.value())
                );
              null !==
              (e = this._mainSeries
                .data()
                .plotValueToTimePointIndex(
                  t / 1e3,
                  TradingView.TIME_PLOT,
                  F.FromRight
                ))
                ? ((i = M(this._mainSeries.bars().lastIndex()) - e),
                  this._control.val() !== i.toString() && this._control.val(i))
                : (this._disabled = !0);
            }
          }),
          inherit(d, H),
          (d.prototype.value = function() {
            return this._control.val();
          }),
          (d.prototype.setValue = function(t) {
            var e = this.value();
            this._transform && (t = this._transform(t)),
              t && e !== t && this._control.val(t);
          }),
          (d.prototype._updateDisplayedSymbol = function() {
            this.setValue(this._property.value());
          }),
          (d.prototype.destroy = function() {
            H.prototype.destroy.call(this),
              this._updateDelegate &&
                this._updateDelegate.unsubscribe(
                  this,
                  this._updateDisplayedSymbol
                );
          }),
          inherit(f, H),
          (f.prototype.value = function() {
            var t = this._control.val();
            return (
              this._transformFunction && (t = this._transformFunction(t)), t
            );
          }),
          (f.prototype.setValue = function(t) {
            var e, i;
            if (((t = "" + t), this._control.val(t), this._control.selectbox))
              try {
                (e = this._control.find("[value='" + x(t) + "']")).length > 0 &&
                  ((i = e[0]),
                  this._control.selectbox("change", i.value, i.text));
              } catch (t) {}
          }),
          (f.prototype.propertyChanged = function(t) {
            var e = t.value();
            "function" == typeof this._propertyChangedHook &&
              (e = this._propertyChangedHook(e)),
              this.setValue(e);
          }),
          inherit(v, H),
          (v.prototype.value = function() {
            return this._property.value();
          }),
          (v.prototype.setValue = function(t) {
            return this._control.html(t);
          }),
          inherit(g, H),
          (g.prototype.value = function() {
            return this.control().is(":checked");
          }),
          (g.prototype.setValue = function(t) {
            var e, i, o, r;
            return (
              this.control().is(".visibility-checker") &&
                (t
                  ? (this.control()
                      .closest("tr")
                      .find(".slider-range")
                      .slider("enable"),
                    this.control()
                      .closest("tr")
                      .find('input[type="text"]')
                      .each(function() {
                        $(this).prop("disabled", !1);
                      }))
                  : (this.control()
                      .closest("tr")
                      .find(".slider-range")
                      .slider("disable"),
                    this.control()
                      .closest("tr")
                      .find('input[type="text"]')
                      .each(function() {
                        $(this).prop("disabled", !0);
                      }))),
              this.control().is(".visibility-switch") &&
                ((e = { opacity: t ? 1 : 0.5 }),
                (i = t ? "enable" : "disable"),
                (o = this.control().data("hides"))
                  ? o.closest("td").css(e)
                  : (r = this.control())
                      .parent()
                      .parent()
                      .data("visible", t)
                      .find("td")
                      .filter(function() {
                        var t = $(this);
                        return (
                          !t.find("label").length &&
                          t.find(":checkbox").attr("id") !== r.attr("id")
                        );
                      })
                      .each(function() {
                        var o = $(this),
                          r = o.children();
                        r.each(function() {
                          var r = $(this);
                          r.is(".ui-slider")
                            ? r.slider(i)
                            : r.is("select")
                            ? (r.selectbox(i), o.css(e))
                            : r.is(".custom-select")
                            ? (r.data(i)(), o.css(e))
                            : r.is(".tvcolorpicker-container")
                            ? (r.find("input").prop("disabled", !t), o.css(e))
                            : (r.prop("disabled", !t), o.css(e));
                        });
                      })),
              this.control().attr("checked", !!t)
            );
          }),
          (g.prototype.destroy = function() {
            H.prototype.destroy.call(this), this._control.off("change");
          }),
          inherit(_, H),
          (_.prototype.value = function() {
            return this.control().is(":disabled");
          }),
          (_.prototype.setValue = function(t) {
            return (
              (t = Boolean(t)),
              this._inverted && (t = !t),
              this.control()
                .parents("label")
                .toggleClass("disabled", t),
              this.control().attr("disabled", t)
            );
          }),
          inherit(m, H),
          (m.prototype.value = function() {
            return this.control().hasClass("active");
          }),
          (m.prototype.setValue = function(t) {
            return this.control().toggleClass("active", !!t);
          }),
          inherit(b, H),
          (b.prototype.applyOldTransparency = function() {
            var t, e, i;
            this.transparencyProperty() &&
              (R.isHexColor(this.property().value())
                ? ((t = this.transparencyProperty().value
                    ? this.transparencyProperty().value()
                    : this.transparencyProperty()),
                  (e = O(this.property().value())),
                  (i = (100 - t) / 100),
                  this.control().val(P(E(e, i))))
                : this.control().val(this.property().value()),
              this.control().change());
          }),
          (b.prototype.transparencyProperty = function() {
            return this._transparencyProperty;
          }),
          (b.prototype.value = function() {
            return this._control.val();
          }),
          (b.prototype.setValue = function(t) {
            this._control.val(t),
              this._control.change(),
              this._control.color && this._control.color.fromString(t);
          }),
          inherit(y, H),
          (y.prototype.value = function() {
            return this._control.slider("option", "value");
          }),
          (y.prototype.setValue = function(t) {
            this._control.slider("option", "value", t);
          }),
          (C.prototype._attachToControl = function(t) {
            var e = this;
            this._wv.subscribe(this._setValueBinded, { callWithLast: !0 }),
              $(this._control).on("change", function() {
                e.setValueToProperty(e.value());
              });
          }),
          (C.prototype.control = function() {
            return this._control;
          }),
          (C.prototype.value = function() {
            var t = $(this._control).val();
            return (
              this._transformFunction && (t = this._transformFunction(t)), t
            );
          }),
          (C.prototype.setValue = function(t) {
            $(this._control).val(t);
          }),
          (C.prototype.setValueToProperty = function(t) {
            this._undoModel.undoHistory.setWatchedValue(
              this._wv,
              t,
              this._undoText
            );
          }),
          (C.prototype.watchedValue = function() {
            return this._wv;
          }),
          (C.prototype.destroy = function() {
            this._wv.unsubscribe(this._setValueBinded);
          }),
          inherit(T, C),
          (T.prototype._attachToControl = function(t) {
            var e = this;
            this._wv.subscribe(this.setValue.bind(this), { callWithLast: !0 }),
              $(this._control).on("click", function() {
                e.setValueToProperty(e.value());
              });
          }),
          (T.prototype.value = function() {
            var t = $(this._control).attr("checked");
            return (
              this._not && (t = !t),
              this._transformFunction && (t = this._transformFunction(t)),
              t
            );
          }),
          (T.prototype.setValue = function(t) {
            this._not && (t = !t), $(this._control).attr("checked", !!t);
          }),
          (k.prototype.properties = function() {
            return this._properties;
          }),
          (k.prototype.value = function(t) {
            return this._control.slider("values", t);
          }),
          (k.prototype.setValue = function(t, e) {
            void 0 === e &&
              (t === this._propFrom && (e = 0), t === this._propTo && (e = 1)),
              this._control.slider("values", e, t.value()),
              this._inputsText && $(this._inputsText[e]).val(t.value());
          }),
          (k.prototype.propertyChanged = function(t) {
            this.setValue(t);
          }),
          (k.prototype.setValueToProperty = function(t, e) {
            ($(e).hasClass("from") || "from" === e) &&
              (this._undoModel.beginUndoMacro(this._undoText[0]),
              this._undoModel.setProperty(
                this._propFrom,
                t[0],
                this._undoText[0]
              ),
              this._propFrom.setValue(t[0], 0),
              this._undoModel.endUndoMacro()),
              ($(e).hasClass("to") || "to" === e) &&
                (this._undoModel.beginUndoMacro(this._undoText[1]),
                this._undoModel.setProperty(
                  this._propTo,
                  t[1],
                  this._undoText[1]
                ),
                this._propTo.setValue(t[1], 1),
                this._undoModel.endUndoMacro());
          }),
          (k.prototype.destroy = function() {
            this._propFrom &&
              this._propTo &&
              (this._propFrom
                .listeners()
                .unsubscribe(this, H.prototype.propertyChanged),
              this._propTo
                .listeners()
                .unsubscribe(this, H.prototype.propertyChanged));
          }),
          inherit(w, H),
          (w.prototype.value = function() {
            var t = [];
            return (
              this._control.each(function() {
                var e = $(this);
                e.is(":checked") && t.push(e.attr("value"));
              }),
              t.join(this._separator)
            );
          }),
          (w.prototype.setValue = function(t) {
            var e = t.split(this._separator).filter(Boolean);
            this._control.each(function() {
              var t = $(this),
                i = -1 !== e.indexOf(t.attr("value"));
              t.attr("checked", i), t.parents("label").toggleClass("active", i);
            });
          }),
          (e.PropertyPage = r),
          (e.UppercaseTransformer = function(t) {
            return t.toUpperCase();
          }),
          (e.GreateTransformer = n),
          (e.LessTransformer = s),
          (e.ToIntTransformer = a),
          (e.ToFloatTransformer = l),
          (e.ToFloatTransformerWithDynamicDefaultValue = function(t) {
            var e = new I();
            return function(i) {
              var o = e.parse(i);
              return V(o) ? t() : o;
            };
          }),
          (e.ToFloatLimitedPrecisionTransformer = function(t, e) {
            var i = new D(e);
            return function(e) {
              var o = i.format(e);
              return V(o) ? t : o;
            };
          }),
          (e.ToAsciiTransformer = function() {
            return function(t) {
              for (
                var e = t, i = t.replace(/[^\u0000-\u007F]/, "");
                i.length !== e.length;

              )
                i = (e = i).replace(/[^\u0000-\u007F]/, "");
              return i;
            };
          }),
          (e.ReplaceEmptyTransformer = function(t) {
            return function(e) {
              return 0 === e.length ? t : e;
            };
          }),
          (e.SymbolInfoSymbolTransformer = function(t, e) {
            return function(i) {
              var o = t();
              return i === e.value() && o && (o.ticker || o.full_name)
                ? o.ticker || o.full_name
                : i;
            };
          }),
          (e.SimpleStringBinder = c),
          (e.FloatBinder = u),
          (e.SessionBinder = h),
          (e.BarTimeBinder = p),
          (e.SymbolBinder = d),
          (e.SimpleComboBinder = f),
          (e.StaticContentBinder = v),
          (e.BooleanBinder = g),
          (e.DisabledBinder = _),
          (e.ColorBinding = b),
          (e.SliderBinder = y),
          (e.CheckboxWVBinding = T),
          (e.RangeBinder = k),
          (e.generateLabelElementStr = o);
      }.call(this, i("tc+8")));
    },
    QBwY: function(t, e, i) {
      var o, r, n;
      (r = [i("P5fv"), i("iGnl"), i("vBzC"), i("Qwlt"), i("MIQu")]),
        void 0 ===
          (n =
            "function" ==
            typeof (o = function(t) {
              return t.widget("ui.slider", t.ui.mouse, {
                version: "1.12.1",
                widgetEventPrefix: "slide",
                options: {
                  animate: !1,
                  classes: {
                    "ui-slider": "ui-corner-all",
                    "ui-slider-handle": "ui-corner-all",
                    "ui-slider-range": "ui-corner-all ui-widget-header"
                  },
                  distance: 0,
                  max: 100,
                  min: 0,
                  orientation: "horizontal",
                  range: !1,
                  step: 1,
                  value: 0,
                  values: null,
                  change: null,
                  slide: null,
                  start: null,
                  stop: null
                },
                numPages: 5,
                _create: function() {
                  (this._keySliding = !1),
                    (this._mouseSliding = !1),
                    (this._animateOff = !0),
                    (this._handleIndex = null),
                    this._detectOrientation(),
                    this._mouseInit(),
                    this._calculateNewMax(),
                    this._addClass(
                      "ui-slider ui-slider-" + this.orientation,
                      "ui-widget ui-widget-content"
                    ),
                    this._refresh(),
                    (this._animateOff = !1);
                },
                _refresh: function() {
                  this._createRange(),
                    this._createHandles(),
                    this._setupEvents(),
                    this._refreshValue();
                },
                _createHandles: function() {
                  var e,
                    i,
                    o = this.options,
                    r = this.element.find(".ui-slider-handle"),
                    n = [];
                  for (
                    i = (o.values && o.values.length) || 1,
                      r.length > i &&
                        (r.slice(i).remove(), (r = r.slice(0, i))),
                      e = r.length;
                    e < i;
                    e++
                  )
                    n.push("<span tabindex='0'></span>");
                  (this.handles = r.add(t(n.join("")).appendTo(this.element))),
                    this._addClass(
                      this.handles,
                      "ui-slider-handle",
                      "ui-state-default"
                    ),
                    (this.handle = this.handles.eq(0)),
                    this.handles.each(function(e) {
                      t(this)
                        .data("ui-slider-handle-index", e)
                        .attr("tabIndex", 0);
                    });
                },
                _createRange: function() {
                  var e = this.options;
                  e.range
                    ? (!0 === e.range &&
                        (e.values
                          ? e.values.length && 2 !== e.values.length
                            ? (e.values = [e.values[0], e.values[0]])
                            : t.isArray(e.values) &&
                              (e.values = e.values.slice(0))
                          : (e.values = [this._valueMin(), this._valueMin()])),
                      this.range && this.range.length
                        ? (this._removeClass(
                            this.range,
                            "ui-slider-range-min ui-slider-range-max"
                          ),
                          this.range.css({ left: "", bottom: "" }))
                        : ((this.range = t("<div>").appendTo(this.element)),
                          this._addClass(this.range, "ui-slider-range")),
                      ("min" !== e.range && "max" !== e.range) ||
                        this._addClass(
                          this.range,
                          "ui-slider-range-" + e.range
                        ))
                    : (this.range && this.range.remove(), (this.range = null));
                },
                _setupEvents: function() {
                  this._off(this.handles),
                    this._on(this.handles, this._handleEvents),
                    this._hoverable(this.handles),
                    this._focusable(this.handles);
                },
                _destroy: function() {
                  this.handles.remove(),
                    this.range && this.range.remove(),
                    this._mouseDestroy();
                },
                _mouseCapture: function(e) {
                  var i,
                    o,
                    r,
                    n,
                    s,
                    a,
                    l,
                    c = this,
                    u = this.options;
                  return (
                    !u.disabled &&
                    ((this.elementSize = {
                      width: this.element.outerWidth(),
                      height: this.element.outerHeight()
                    }),
                    (this.elementOffset = this.element.offset()),
                    (i = { x: e.pageX, y: e.pageY }),
                    (o = this._normValueFromMouse(i)),
                    (r = this._valueMax() - this._valueMin() + 1),
                    this.handles.each(function(e) {
                      var i = Math.abs(o - c.values(e));
                      (r > i ||
                        (r === i &&
                          (e === c._lastChangedValue ||
                            c.values(e) === u.min))) &&
                        ((r = i), (n = t(this)), (s = e));
                    }),
                    !1 !== this._start(e, s) &&
                      ((this._mouseSliding = !0),
                      (this._handleIndex = s),
                      this._addClass(n, null, "ui-state-active"),
                      n.trigger("focus"),
                      (a = n.offset()),
                      (l = !t(e.target)
                        .parents()
                        .addBack()
                        .is(".ui-slider-handle")),
                      (this._clickOffset = l
                        ? { left: 0, top: 0 }
                        : {
                            left: e.pageX - a.left - n.width() / 2,
                            top:
                              e.pageY -
                              a.top -
                              n.height() / 2 -
                              (parseInt(n.css("borderTopWidth"), 10) || 0) -
                              (parseInt(n.css("borderBottomWidth"), 10) || 0) +
                              (parseInt(n.css("marginTop"), 10) || 0)
                          }),
                      this.handles.hasClass("ui-state-hover") ||
                        this._slide(e, s, o),
                      (this._animateOff = !0),
                      !0))
                  );
                },
                _mouseStart: function() {
                  return !0;
                },
                _mouseDrag: function(t) {
                  var e = { x: t.pageX, y: t.pageY },
                    i = this._normValueFromMouse(e);
                  return this._slide(t, this._handleIndex, i), !1;
                },
                _mouseStop: function(t) {
                  return (
                    this._removeClass(this.handles, null, "ui-state-active"),
                    (this._mouseSliding = !1),
                    this._stop(t, this._handleIndex),
                    this._change(t, this._handleIndex),
                    (this._handleIndex = null),
                    (this._clickOffset = null),
                    (this._animateOff = !1),
                    !1
                  );
                },
                _detectOrientation: function() {
                  this.orientation =
                    "vertical" === this.options.orientation
                      ? "vertical"
                      : "horizontal";
                },
                _normValueFromMouse: function(t) {
                  var e, i, o, r, n;
                  return (
                    "horizontal" === this.orientation
                      ? ((e = this.elementSize.width),
                        (i =
                          t.x -
                          this.elementOffset.left -
                          (this._clickOffset ? this._clickOffset.left : 0)))
                      : ((e = this.elementSize.height),
                        (i =
                          t.y -
                          this.elementOffset.top -
                          (this._clickOffset ? this._clickOffset.top : 0))),
                    (o = i / e) > 1 && (o = 1),
                    o < 0 && (o = 0),
                    "vertical" === this.orientation && (o = 1 - o),
                    (r = this._valueMax() - this._valueMin()),
                    (n = this._valueMin() + o * r),
                    this._trimAlignValue(n)
                  );
                },
                _uiHash: function(t, e, i) {
                  var o = {
                    handle: this.handles[t],
                    handleIndex: t,
                    value: void 0 !== e ? e : this.value()
                  };
                  return (
                    this._hasMultipleValues() &&
                      ((o.value = void 0 !== e ? e : this.values(t)),
                      (o.values = i || this.values())),
                    o
                  );
                },
                _hasMultipleValues: function() {
                  return this.options.values && this.options.values.length;
                },
                _start: function(t, e) {
                  return this._trigger("start", t, this._uiHash(e));
                },
                _slide: function(t, e, i) {
                  var o,
                    r = this.value(),
                    n = this.values();
                  this._hasMultipleValues() &&
                    ((o = this.values(e ? 0 : 1)),
                    (r = this.values(e)),
                    2 === this.options.values.length &&
                      !0 === this.options.range &&
                      (i = 0 === e ? Math.min(o, i) : Math.max(o, i)),
                    (n[e] = i)),
                    i !== r &&
                      !1 !== this._trigger("slide", t, this._uiHash(e, i, n)) &&
                      (this._hasMultipleValues()
                        ? this.values(e, i)
                        : this.value(i));
                },
                _stop: function(t, e) {
                  this._trigger("stop", t, this._uiHash(e));
                },
                _change: function(t, e) {
                  this._keySliding ||
                    this._mouseSliding ||
                    ((this._lastChangedValue = e),
                    this._trigger("change", t, this._uiHash(e)));
                },
                value: function(t) {
                  return arguments.length
                    ? ((this.options.value = this._trimAlignValue(t)),
                      this._refreshValue(),
                      void this._change(null, 0))
                    : this._value();
                },
                values: function(e, i) {
                  var o, r, n;
                  if (arguments.length > 1)
                    return (
                      (this.options.values[e] = this._trimAlignValue(i)),
                      this._refreshValue(),
                      void this._change(null, e)
                    );
                  if (!arguments.length) return this._values();
                  if (!t.isArray(arguments[0]))
                    return this._hasMultipleValues()
                      ? this._values(e)
                      : this.value();
                  for (
                    o = this.options.values, r = arguments[0], n = 0;
                    n < o.length;
                    n += 1
                  )
                    (o[n] = this._trimAlignValue(r[n])), this._change(null, n);
                  this._refreshValue();
                },
                _setOption: function(e, i) {
                  var o,
                    r = 0;
                  switch (
                    ("range" === e &&
                      !0 === this.options.range &&
                      ("min" === i
                        ? ((this.options.value = this._values(0)),
                          (this.options.values = null))
                        : "max" === i &&
                          ((this.options.value = this._values(
                            this.options.values.length - 1
                          )),
                          (this.options.values = null))),
                    t.isArray(this.options.values) &&
                      (r = this.options.values.length),
                    this._super(e, i),
                    e)
                  ) {
                    case "orientation":
                      this._detectOrientation(),
                        this._removeClass(
                          "ui-slider-horizontal ui-slider-vertical"
                        )._addClass("ui-slider-" + this.orientation),
                        this._refreshValue(),
                        this.options.range && this._refreshRange(i),
                        this.handles.css(
                          "horizontal" === i ? "bottom" : "left",
                          ""
                        );
                      break;
                    case "value":
                      (this._animateOff = !0),
                        this._refreshValue(),
                        this._change(null, 0),
                        (this._animateOff = !1);
                      break;
                    case "values":
                      for (
                        this._animateOff = !0, this._refreshValue(), o = r - 1;
                        o >= 0;
                        o--
                      )
                        this._change(null, o);
                      this._animateOff = !1;
                      break;
                    case "step":
                    case "min":
                    case "max":
                      (this._animateOff = !0),
                        this._calculateNewMax(),
                        this._refreshValue(),
                        (this._animateOff = !1);
                      break;
                    case "range":
                      (this._animateOff = !0),
                        this._refresh(),
                        (this._animateOff = !1);
                  }
                },
                _setOptionDisabled: function(t) {
                  this._super(t),
                    this._toggleClass(null, "ui-state-disabled", !!t);
                },
                _value: function() {
                  var t = this.options.value;
                  return (t = this._trimAlignValue(t));
                },
                _values: function(t) {
                  var e, i, o;
                  if (arguments.length)
                    return (
                      (e = this.options.values[t]),
                      (e = this._trimAlignValue(e))
                    );
                  if (this._hasMultipleValues()) {
                    for (
                      i = this.options.values.slice(), o = 0;
                      o < i.length;
                      o += 1
                    )
                      i[o] = this._trimAlignValue(i[o]);
                    return i;
                  }
                  return [];
                },
                _trimAlignValue: function(t) {
                  if (t <= this._valueMin()) return this._valueMin();
                  if (t >= this._valueMax()) return this._valueMax();
                  var e = this.options.step > 0 ? this.options.step : 1,
                    i = (t - this._valueMin()) % e,
                    o = t - i;
                  return (
                    2 * Math.abs(i) >= e && (o += i > 0 ? e : -e),
                    parseFloat(o.toFixed(5))
                  );
                },
                _calculateNewMax: function() {
                  var t = this.options.max,
                    e = this._valueMin(),
                    i = this.options.step,
                    o = Math.round((t - e) / i) * i;
                  (t = o + e) > this.options.max && (t -= i),
                    (this.max = parseFloat(t.toFixed(this._precision())));
                },
                _precision: function() {
                  var t = this._precisionOf(this.options.step);
                  return (
                    null !== this.options.min &&
                      (t = Math.max(t, this._precisionOf(this.options.min))),
                    t
                  );
                },
                _precisionOf: function(t) {
                  var e = t.toString(),
                    i = e.indexOf(".");
                  return -1 === i ? 0 : e.length - i - 1;
                },
                _valueMin: function() {
                  return this.options.min;
                },
                _valueMax: function() {
                  return this.max;
                },
                _refreshRange: function(t) {
                  "vertical" === t && this.range.css({ width: "", left: "" }),
                    "horizontal" === t &&
                      this.range.css({ height: "", bottom: "" });
                },
                _refreshValue: function() {
                  var e,
                    i,
                    o,
                    r,
                    n,
                    s = this.options.range,
                    a = this.options,
                    l = this,
                    c = !this._animateOff && a.animate,
                    u = {};
                  this._hasMultipleValues()
                    ? this.handles.each(function(o) {
                        (i =
                          ((l.values(o) - l._valueMin()) /
                            (l._valueMax() - l._valueMin())) *
                          100),
                          (u[
                            "horizontal" === l.orientation ? "left" : "bottom"
                          ] = i + "%"),
                          t(this)
                            .stop(1, 1)
                            [c ? "animate" : "css"](u, a.animate),
                          !0 === l.options.range &&
                            ("horizontal" === l.orientation
                              ? (0 === o &&
                                  l.range
                                    .stop(1, 1)
                                    [c ? "animate" : "css"](
                                      { left: i + "%" },
                                      a.animate
                                    ),
                                1 === o &&
                                  l.range[c ? "animate" : "css"](
                                    { width: i - e + "%" },
                                    { queue: !1, duration: a.animate }
                                  ))
                              : (0 === o &&
                                  l.range
                                    .stop(1, 1)
                                    [c ? "animate" : "css"](
                                      { bottom: i + "%" },
                                      a.animate
                                    ),
                                1 === o &&
                                  l.range[c ? "animate" : "css"](
                                    { height: i - e + "%" },
                                    { queue: !1, duration: a.animate }
                                  ))),
                          (e = i);
                      })
                    : ((o = this.value()),
                      (r = this._valueMin()),
                      (n = this._valueMax()),
                      (i = n !== r ? ((o - r) / (n - r)) * 100 : 0),
                      (u[
                        "horizontal" === this.orientation ? "left" : "bottom"
                      ] = i + "%"),
                      this.handle
                        .stop(1, 1)
                        [c ? "animate" : "css"](u, a.animate),
                      "min" === s &&
                        "horizontal" === this.orientation &&
                        this.range
                          .stop(1, 1)
                          [c ? "animate" : "css"](
                            { width: i + "%" },
                            a.animate
                          ),
                      "max" === s &&
                        "horizontal" === this.orientation &&
                        this.range.stop(1, 1)[c ? "animate" : "css"](
                          {
                            width: 100 - i + "%"
                          },
                          a.animate
                        ),
                      "min" === s &&
                        "vertical" === this.orientation &&
                        this.range
                          .stop(1, 1)
                          [c ? "animate" : "css"](
                            { height: i + "%" },
                            a.animate
                          ),
                      "max" === s &&
                        "vertical" === this.orientation &&
                        this.range
                          .stop(1, 1)
                          [c ? "animate" : "css"](
                            { height: 100 - i + "%" },
                            a.animate
                          ));
                },
                _handleEvents: {
                  keydown: function(e) {
                    var i,
                      o,
                      r,
                      n = t(e.target).data("ui-slider-handle-index");
                    switch (e.keyCode) {
                      case t.ui.keyCode.HOME:
                      case t.ui.keyCode.END:
                      case t.ui.keyCode.PAGE_UP:
                      case t.ui.keyCode.PAGE_DOWN:
                      case t.ui.keyCode.UP:
                      case t.ui.keyCode.RIGHT:
                      case t.ui.keyCode.DOWN:
                      case t.ui.keyCode.LEFT:
                        if (
                          (e.preventDefault(),
                          !this._keySliding &&
                            ((this._keySliding = !0),
                            this._addClass(
                              t(e.target),
                              null,
                              "ui-state-active"
                            ),
                            !1 === this._start(e, n)))
                        )
                          return;
                    }
                    switch (
                      ((r = this.options.step),
                      (i = o = this._hasMultipleValues()
                        ? this.values(n)
                        : this.value()),
                      e.keyCode)
                    ) {
                      case t.ui.keyCode.HOME:
                        o = this._valueMin();
                        break;
                      case t.ui.keyCode.END:
                        o = this._valueMax();
                        break;
                      case t.ui.keyCode.PAGE_UP:
                        o = this._trimAlignValue(
                          i +
                            (this._valueMax() - this._valueMin()) /
                              this.numPages
                        );
                        break;
                      case t.ui.keyCode.PAGE_DOWN:
                        o = this._trimAlignValue(
                          i -
                            (this._valueMax() - this._valueMin()) /
                              this.numPages
                        );
                        break;
                      case t.ui.keyCode.UP:
                      case t.ui.keyCode.RIGHT:
                        if (i === this._valueMax()) return;
                        o = this._trimAlignValue(i + r);
                        break;
                      case t.ui.keyCode.DOWN:
                      case t.ui.keyCode.LEFT:
                        if (i === this._valueMin()) return;
                        o = this._trimAlignValue(i - r);
                    }
                    this._slide(e, n, o);
                  },
                  keyup: function(e) {
                    var i = t(e.target).data("ui-slider-handle-index");
                    this._keySliding &&
                      ((this._keySliding = !1),
                      this._stop(e, i),
                      this._change(e, i),
                      this._removeClass(t(e.target), null, "ui-state-active"));
                  }
                }
              });
            })
              ? o.apply(e, r)
              : o) || (t.exports = n);
    },
    "Y+MS": function(t, e, i) {
      var o = (function() {
        function t(t, e) {
          (this.mouseFlag = !1),
            (this.accuracy = 2),
            (this.value = 1),
            (this.colorInput = t),
            (this.$el = $(
              '<div class="transparency-slider wide-slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">',
              t.prop("ownerDocument")
            )),
            e && this.$el.hide(),
            (this.$gradient = $('<div class="gradient">').appendTo(this.$el)),
            (this.$roller = $(
              '<a href="#" class="ui-slider-handle ui-state-default ui-corner-all without-shift-handle-left">'
            ).appendTo(this.$gradient));
        }
        return (
          (t.prototype.calculateRollerPosition = function(t) {
            var e = t.pageX,
              i = this.$gradient.offset().left,
              o = e - i,
              r = this.$gradient.width();
            return o > r ? 100 : o < 0 ? 0 : ~~((o / r) * 100);
          }),
          (t.prototype.toRgb = function(t) {
            var e;
            return ~t.indexOf("#")
              ? t
              : (e = t.match(/[0-9.]+/g))
              ? "rgb(" + e.slice(0, 3).join(", ") + ")"
              : "rgb(127, 127, 127)";
          }),
          (t.prototype.setValue = function(t) {
            this.value = 1 !== t ? t.toFixed(this.accuracy) : t;
          }),
          (t.prototype.updateRoller = function() {
            this.$roller.css("left", 100 - 100 * this.value + "%");
          }),
          (t.prototype.rollerMoveHandler = function(t) {
            if (this.mouseFlag) {
              var e = this.calculateRollerPosition(t);
              this.setValue((100 - e) / 100),
                $(this).trigger("change", [this.val()]),
                this.$roller.css("left", e + "%");
            }
            t.preventDefault();
          }),
          (t.prototype.mouseupHandler = function(t) {
            this.mouseFlag &&
              ((this.mouseFlag = !1),
              $(this).trigger("afterChange", [this.val()]));
          }),
          (t.prototype.initEvents = function() {
            var t = this.$el.prop("ownerDocument"),
              e = function(t) {
                return this.rollerMoveHandler(t);
              }.bind(this),
              i = function(o) {
                return (
                  $(t).off("mousemove mouseup", e),
                  $(t).off("mouseup", i),
                  this.mouseupHandler(o)
                );
              }.bind(this);
            this.$el.on(
              "mousedown",
              function(o) {
                (this.mouseFlag = !0),
                  $(t).on("mousemove mouseup", e),
                  $(t).on("mouseup", i),
                  o.preventDefault();
              }.bind(this)
            ),
              this.colorInput.on(
                "change",
                function(t) {
                  this.updateColor();
                }.bind(this)
              );
          }),
          (t.prototype.removeEvents = function() {}),
          (t.prototype.updateColor = function() {
            var t = this.colorInput.val() || "black",
              e = this.toRgb(t),
              i = [
                "-moz-linear-gradient(left, %COLOR 0%, transparent 100%)",
                "-webkit-gradient(linear, left top, right top, color-stop(0%,%COLOR), color-stop(100%,transparent))",
                "-webkit-linear-gradient(left, %COLOR 0%,transparent 100%)",
                "-o-linear-gradient(left, %COLOR 0%,transparent 100%)",
                "linear-gradient(to right, %COLOR 0%,transparent 100%)"
              ];
            $.browser.msie
              ? this.$gradient.css(
                  "filter",
                  [
                    "progid:DXImageTransform.Microsoft.gradient(startColorstr='",
                    e,
                    "', EndColor=0, GradientType=1)"
                  ].join("")
                )
              : i.forEach(
                  function(t) {
                    this.$gradient.css(
                      "background-image",
                      t.replace(/%COLOR/, e)
                    );
                  }.bind(this)
                );
          }),
          (t.prototype.val = function(t) {
            return (
              void 0 !== t && (this.setValue(+t), this.updateRoller()),
              this.value
            );
          }),
          function(e, i) {
            return new t(e, i);
          }
        );
      })();
      t.exports = o;
    },
    "d2+F": function(t, e, i) {
      var o, r, n, s, a, l, c, u, h, p, d, f, v, g, _, m;
      i("zNST"),
        i("utoz"),
        (o = i("eJTA")),
        (r = o.rgba),
        (n = o.areEqualRgb),
        (s = o.areEqualRgba),
        (a = o.normalizeHue),
        (l = o.normalizeHsvSaturation),
        (c = o.normalizeValue),
        (u = o.hsv),
        (h = o.rgbToHsv),
        (p = o.hsvToRgb),
        (d = o.rgbToString),
        (f = o.rgbaToString),
        (v = o.parseRgb),
        (g = o.parseRgba),
        (_ = i("Y+MS")),
        (m = i("wmOI").ESC),
        (function(t) {
          function e(t) {
            return "" === t ? t : f(g(t));
          }
          function i(t) {
            t && (t.join || (t = t ? ("" + t).split(",") : []), (C = t));
          }
          function o(k) {
            function w(e, i, o) {
              var n = t(this);
              (e = f(r(v(e), i))),
                $.call(this, e),
                n
                  .removeData("tvcolorpicker")
                  .removeData("tvcolorpicker-custom-color"),
                o && (S.call(n), n.blur());
            }
            function $(e) {
              var i = t(this);
              i.val(e),
                i.change(),
                e ? i.trigger("pick-color", e) : i.trigger("pick-transparent"),
                x.call(this, e);
            }
            function x(e) {
              "" !== e
                ? (t(this).removeClass("tvcolorpicker-gradient-widget"),
                  t(this).css({ backgroundColor: e, color: e }))
                : t(this).addClass("tvcolorpicker-gradient-widget");
            }
            function M(e, i) {
              var o, r, s, a, l, c, u;
              return (
                (i = i || {}),
                (r = (o = this).prop("ownerDocument")),
                (s = t(o)
                  .val()
                  .toLowerCase()),
                (a = r.createElement("table")),
                (l = r.createElement("tbody")),
                a.appendChild(l),
                (u = 0),
                t.each(e, function(e, r) {
                  var a, h;
                  u++,
                    e % y == 0 && (c = t("<tr></tr>").appendTo(l)),
                    (a = t('<td class="tvcolorpicker-cell"></td>').appendTo(c)),
                    (h = t(
                      '<div class="tvcolorpicker-transparency"><div class="tvcolorpicker-swatch"></div></div>'
                    )
                      .appendTo(a)
                      .find(".tvcolorpicker-swatch")
                      .data("color", r)),
                    i.addClass && h.addClass(i.addClass),
                    r &&
                      ((r = r.toLowerCase()),
                      s && n(v(s), v(r)) && h.addClass("active"),
                      h.css({ backgroundColor: r }).data("color", r),
                      h.bind("click", function() {
                        w.call(o, r, P.val(), !0);
                      }));
                }),
                t(a).addClass("tvcolorpicker-table"),
                u ? a : t()
              );
            }
            function V(e) {
              function i(t) {
                var e = t.originalEvent,
                  i =
                    t.offsetX ||
                    t.layerX ||
                    (e && (e.offsetX || e.layerX)) ||
                    0,
                  o =
                    t.offsetY ||
                    t.layerY ||
                    (e && (e.offsetY || e.layerY)) ||
                    0;
                V.css({ left: i + "px", top: o + "px" }),
                  (z[0] = a(i / A)),
                  (z[1] = l(1 - o / R)),
                  F.css({ backgroundColor: d(p(u(z[0], z[1], 1))) }),
                  b();
              }
              function o(e) {
                1 == e.which &&
                  ((H = !1),
                  j.is(".opened") &&
                    t(W)
                      .get(0)
                      .focus());
              }
              function n(e) {
                var i = (function(e) {
                  var i = e.pageY,
                    o = t(D),
                    r = i - o.offset().top;
                  return r > o.height() ? o.height() : r < 0 ? 0 : r;
                })(e);
                I.css({ top: i + "px" }),
                  (z[2] = c(1 - Math.max(0, Math.min(i, R)) / R)),
                  b();
              }
              function m(e) {
                1 == e.which &&
                  ((B = !1),
                  t(U).unbind("mouseup", m),
                  j.is(".opened") &&
                    t(W)
                      .get(0)
                      .focus());
              }
              function b() {
                var t, e;
                L &&
                  ((L = !1),
                  j.find(".tvcolorpicker-swatch.active").removeClass("active")),
                  (t = r(p(z), P.val())),
                  s(g(W.val().toUpperCase()), t) ||
                    ((e = f(t)),
                    W.data("tvcolorpicker-custom-color", e),
                    $.call(W, e));
              }
              var y,
                k,
                x,
                V,
                S,
                O,
                F,
                I,
                D,
                R,
                A,
                H,
                B,
                L,
                z,
                N = !1,
                W = t(this),
                U = W.prop("ownerDocument"),
                j = t('<div class="tvcolorpicker-popup opened">'),
                G = t(
                  '<div class="tvcolorpicker-swatches-area"></div>'
                ).appendTo(j);
              return (
                G.append(
                  M.call(this, [
                    "rgb(0, 0, 0)",
                    "rgb(66, 66, 66)",
                    "rgb(101, 101, 101)",
                    "rgb(152, 152, 152)",
                    "rgb(182, 182, 182)",
                    "rgb(203, 203, 203)",
                    "rgb(216, 216, 216)",
                    "rgb(238, 238, 238)",
                    "rgb(242, 242, 242)",
                    "rgb(255, 255, 255)"
                  ])
                ),
                G.append(
                  M.call(this, [
                    "rgb(151, 0, 0)",
                    "rgb(255, 0, 0)",
                    "rgb(255, 152, 0)",
                    "rgb(255, 255, 0)",
                    "rgb(0, 255, 0)",
                    "rgb(0, 255, 255)",
                    "rgb(73, 133, 231)",
                    "rgb(0, 0, 255)",
                    "rgb(152, 0, 255)",
                    "rgb(255, 0, 255)"
                  ])
                ),
                G.append(
                  M.call(this, [
                    "rgb(230, 184, 175)",
                    "rgb(244, 204, 204)",
                    "rgb(252, 229, 205)",
                    "rgb(255, 242, 204)",
                    "rgb(217, 234, 211)",
                    "rgb(208, 224, 227)",
                    "rgb(201, 218, 248)",
                    "rgb(207, 226, 243)",
                    "rgb(217, 210, 233)",
                    "rgb(234, 209, 220)",
                    "rgb(221, 126, 107)",
                    "rgb(234, 153, 153)",
                    "rgb(249, 203, 156)",
                    "rgb(255, 229, 153)",
                    "rgb(182, 215, 168)",
                    "rgb(162, 196, 201)",
                    "rgb(164, 194, 244)",
                    "rgb(159, 197, 232)",
                    "rgb(180, 167, 214)",
                    "rgb(213, 166, 189)",
                    "rgb(204, 65, 37)",
                    "rgb(224, 102, 102)",
                    "rgb(246, 178, 107)",
                    "rgb(255, 217, 102)",
                    "rgb(147, 196, 125)",
                    "rgb(118, 165, 175)",
                    "rgb(109, 158, 235)",
                    "rgb(111, 168, 220)",
                    "rgb(142, 124, 195)",
                    "rgb(194, 123, 160)",
                    "rgb(166, 28, 0)",
                    "rgb(204, 0, 0)",
                    "rgb(230, 145, 56)",
                    "rgb(241, 194, 50)",
                    "rgb(106, 168, 79)",
                    "rgb(69, 129, 142)",
                    "rgb(60, 120, 216)",
                    "rgb(61, 133, 198)",
                    "rgb(103, 78, 167)",
                    "rgb(166, 77, 121)",
                    "rgb(133, 32, 12)",
                    "rgb(153, 0, 0)",
                    "rgb(180, 95, 6)",
                    "rgb(191, 144, 0)",
                    "rgb(56, 118, 29)",
                    "rgb(19, 79, 92)",
                    "rgb(17, 85, 204)",
                    "rgb(11, 83, 148)",
                    "rgb(53, 28, 117)",
                    "rgb(116, 27, 71)",
                    "rgb(91, 15, 0)",
                    "rgb(102, 0, 0)",
                    "rgb(120, 63, 4)",
                    "rgb(127, 96, 0)",
                    "rgb(39, 78, 19)",
                    "rgb(12, 52, 61)",
                    "rgb(28, 69, 135)",
                    "rgb(7, 55, 99)",
                    "rgb(32, 18, 77)",
                    "rgb(76, 17, 48)"
                  ])
                ),
                (y = t('<div class="tvcolorpicker-custom-area"></div>')
                  .css({ display: "none" })
                  .appendTo(j)),
                (k = t('<div class="tvcolorpicker-hsv"></div>').appendTo(y)),
                (x = t('<div class="tvcolorpicker-hs"></div>').appendTo(k)),
                (V = t('<div class="tvcolorpicker-hs-handle"></div>').appendTo(
                  x
                )),
                (S = t('<div class="tvcolorpicker-hs-area"></div>').appendTo(
                  x
                )),
                (O = t('<div class="tvcolorpicker-vv">').appendTo(k)),
                (F = t('<div class="tvcolorpicker-v"></div>').appendTo(O)),
                (I = t('<div class="tvcolorpicker-v-handle"></div>').appendTo(
                  F
                )),
                (D = t('<div class="tvcolorpicker-v-area"></div>').appendTo(F)),
                (P = _(t(this), e.hideTransparency)).initEvents(),
                P.updateColor(),
                P.$el.appendTo(j),
                P.val(g(W.val() || T)[3]),
                (R = x.height()),
                (A = x.width()),
                (H = !1),
                (B = !1),
                (L = !0),
                (z = [0, 0, 0.5]),
                S.bind("mousedown", function(e) {
                  1 == e.which &&
                    ((H = !0),
                    t(U).bind("mouseup", o),
                    i(e),
                    e.preventDefault());
                }),
                S.bind("mousemove", function(t) {
                  H && (i(t), t.preventDefault());
                }),
                t(P).on(
                  "change",
                  function() {
                    N ? b() : w.call(this, t(this).val() || T, P.val());
                  }.bind(this)
                ),
                t(P).on(
                  "afterChange",
                  function() {
                    t(this).focus();
                  }.bind(this)
                ),
                O.bind("mousedown", function(e) {
                  1 == e.which &&
                    ((B = !0),
                    t(U).bind("mouseup", m),
                    n(e),
                    e.preventDefault());
                }),
                t(U).bind("mousemove", function(t) {
                  B && (n(t), t.preventDefault());
                }),
                t(
                  '<a class="tvcolorpicker-custom-button _tv-button">' +
                    window.t("Custom color...") +
                    "</a>"
                )
                  .appendTo(j)
                  .bind("click", function() {
                    var e,
                      i = t(this).is(".active");
                    i ||
                      y.css({
                        minWidth: G.width() + "px",
                        minHeight: G.height() + "px"
                      }),
                      t(this)[i ? "removeClass" : "addClass"]("active"),
                      (N = t(this).is(".active")),
                      y.css({ display: i ? "none" : "block" }),
                      G.css({ display: i ? "block" : "none" }),
                      i
                        ? W.removeData("tvcolorpicker-custom-color")
                        : ((R = x.height()),
                          (A = x.width()),
                          (e = v(W.val() || T)),
                          (z = h(e)),
                          V.css({
                            left: ~~(z[0] * A) + "px",
                            top: ~~((1 - z[1]) * R) + "px"
                          }),
                          I.css({ top: ~~((1 - z[2]) * R) + "px" }),
                          F.css({ backgroundColor: d(p(u(z[0], z[1], 1))) }));
                  }),
                j.append(
                  t(
                    M.call(this, C, { addClass: "tvcolorpicker-user" })
                  ).addClass("tvcolorpicker-user-swatches")
                ),
                t(U.body).append(j),
                (function(e, i, o) {
                  var r,
                    n = t(e).prop("ownerDocument"),
                    s = n.defaultView,
                    a = t(e).offset(),
                    l = (t(n).scrollLeft(), t(n).scrollTop()),
                    c = t(e).outerWidth(),
                    u = t(e).outerHeight(),
                    h = t(s).width(),
                    p = t(s).height(),
                    d = t(i).outerWidth(),
                    f = t(i).outerHeight(),
                    v =
                      "function" == typeof o.direction
                        ? o.direction()
                        : o.direction;
                  switch (v) {
                    default:
                    case "down":
                      r = { top: a.top + u + o.offset, left: a.left + o.drift };
                      break;
                    case "right":
                      r = { top: a.top + o.drift, left: a.left + c + o.offset };
                  }
                  r.top + f > p + l && (r.top = p - f + l),
                    a.left + d > h && (r.left = h - d),
                    (r.left += "px"),
                    (r.top += "px"),
                    i.css(r);
                })(W, j, e),
                U.addEventListener("keydown", E, !1),
                j
              );
            }
            function S() {
              var e = t(this).prop("ownerDocument") || document;
              t(e)
                .find(".tvcolorpicker-popup")
                .removeClass("opened")
                .remove(),
                t(P).off("change"),
                t(P).off("afterChange"),
                e.removeEventListener("keydown", E, !1),
                t(O).data("tvcolorpicker", null),
                t(O).each(function() {
                  var e,
                    i = t(this).data("tvcolorpicker-custom-color");
                  i &&
                    ((function(e) {
                      var i = !1,
                        o = v(e);
                      return (
                        t.each(C, function(t, e) {
                          if (n(v(e), o)) return (i = !0), !1;
                        }),
                        !i && ((C = [d(o)].concat(C.slice(0, b - 1))), !0)
                      );
                    })(i) && t(this).trigger("customcolorchange", [C]),
                    t(this).data("tvcolorpicker-custom-color", null)),
                    (e = t(this).data("tvcolorpicker-previous-color")) &&
                      e != t(this).val() &&
                      t(this).trigger("change"),
                    t(this).removeData("tvcolorpicker-previous-color");
                });
            }
            function E(t) {
              t.keyCode === m && (S.call(O), O.blur());
            }
            var P, O;
            return (
              (k = t.extend({}, o.options, k || {})),
              (O = this),
              k && "customColors" in k && i(k.customColors),
              this.each(function() {
                function i() {
                  var t = e(s.val());
                  x.call(s, t);
                }
                var o,
                  r,
                  n,
                  s = t(this);
                s.val(e(s.val())),
                  (o = null),
                  (r = !1),
                  s
                    .addClass("tvcolorpicker-widget")
                    .attr("autocomplete", "off")
                    .attr("readonly", !0),
                  (n = function() {
                    s.data("tvcolorpicker") ||
                      (S.call(s),
                      (o = V.call(s, k)),
                      s.data("tvcolorpicker-custom-color", null),
                      s.data("tvcolorpicker", o),
                      s.data("tvcolorpicker-previous-color", s.val()),
                      o.bind("mousedown click", function(e) {
                        t(e.target)
                          .parents()
                          .andSelf()
                          .is(o) &&
                          (s.focus(),
                          (r = !0),
                          setTimeout(function() {
                            r = !1;
                          }, 0));
                      }));
                  }),
                  s.on("touchstart", n),
                  s.focus(n),
                  S.call(s),
                  s.bind("blur", function(t) {
                    r ? t.stopPropagation() : S.call(s);
                  }),
                  s.change(function(t) {
                    i();
                  }),
                  i();
              })
            );
          }
          var b, y, C, T;
          if (!t) throw new Error("This program cannot be run in DOS mode");
          (o.setCustomColors = i),
            (t.fn.tvcolorpicker = o),
            (b = 29),
            (y = 10),
            (C = []),
            (T = "rgb(14, 15, 16)"),
            (o.options = { direction: "down", offset: 0, drift: 0 });
        })(window.jQuery);
    },
    jNEI: function(t, e, i) {
      function o(t, e) {
        void 0 === e && (e = {});
        var i = $('<span class="tvcolorpicker-container">');
        return (
          null !== t && i.appendTo(t),
          void 0 !== e.addClass && i.addClass(e.addClass),
          $('<div class="tvcolorpicker-transparency">').appendTo(i),
          $('<input class="colorpicker-widget">')
            .tvcolorpicker({
              customColors: (function(t) {
                var e,
                  i,
                  o,
                  r = [];
                for (e = 0, i = t; e < i.length; e++)
                  (o = i[e]), null !== Object(s.tryParseRgb)(o) && r.push(o);
                return r;
              })(Object(a.getJSON)("pickerCustomColors", [])),
              direction: e.direction,
              hideTransparency: !!e.hideTransparency
            })
            .on("change", function() {
              var t, e, i;
              $(this).css(
                "border-color",
                ((t = $(this).val() || l),
                (e = Object(s.parseRgb)(t)),
                (i = e.map(function(t) {
                  return t > 50 ? t - 50 : 0;
                })),
                Object(s.rgbToString)(i))
              );
            })
            .bind("customcolorchange", function(t, e) {
              Object(a.setJSON)("pickerCustomColors", e);
            })
            .appendTo(i),
          i
        );
      }
      var r, n, s, a, l;
      i.r(e),
        i.d(e, "addColorPicker", function() {
          return o;
        }),
        (r = i("P5fv")),
        (n = i("d2+F")),
        (s = i("eJTA")),
        (a = i("Vdly")),
        (l = "#727272");
    },
    utoz: function(t, e, i) {},
    vBzC: function(t, e, i) {
      var o, r, n;
      (r = [i("P5fv"), i("Qwlt")]),
        void 0 ===
          (n =
            "function" ==
            typeof (o = function(t) {
              return (t.ui.keyCode = {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
              });
            })
              ? o.apply(e, r)
              : o) || (t.exports = n);
    },
    zNST: function(t, e, i) {}
  }
]);
