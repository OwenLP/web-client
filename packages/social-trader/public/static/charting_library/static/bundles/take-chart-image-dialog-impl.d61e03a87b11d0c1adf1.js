(window.webpackJsonp = window.webpackJsonp || []).push([
  ["take-chart-image-dialog-impl"],
  {
    "/g3O": function(e, t) {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 11.6" width="15px" height="11.6px" fill="currentColor"><path d="M15 1.4c-.3.1-1 .4-1.7.5.4-.2 1.1-1 1.3-1.6-.4.3-1.4.7-1.9.7-.6-.7-1.4-1-2.3-1-1.7 0-3.1 1.3-3.1 3 0 .2 0 .4.1.7C5.1 3.6 2.4 2.5.9.6 0 2.1.8 3.9 1.8 4.5c-.4 0-1 0-1.3-.3 0 1 .5 2.4 2.4 2.9-.4.2-1 .1-1.3.1.1.9 1.4 2 2.8 2-.6.5-2.3 1.4-4.4 1.1 1.4.8 3.1 1.3 4.8 1.3 5 0 8.8-3.9 8.6-8.6.5-.4 1.1-.9 1.6-1.6z"/></svg>';
    },
    "1O6C": function(e, t, n) {
      var o, r, i, s, a, c, l, p;
      n.d(t, "a", function() {
        return p;
      }),
        (o = n("mrSG")),
        (r = n("q1tI")),
        (i = n("TSYQ")),
        (s = n("+EG+")),
        (a = n("jAh7")),
        (c = n("QpNh")),
        (l = n("aYmi")),
        (p = (function(e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (
              (t._manager = new a.OverlapManager()),
              (t._handleSlot = function(e) {
                t._manager.setContainer(e);
              }),
              t
            );
          }
          return (
            o.__extends(t, e),
            (t.prototype.render = function() {
              var e = this.props,
                t = e.rounded,
                n = void 0 === t || t,
                a = e.shadowed,
                p = void 0 === a || a,
                u = e.fullscreen,
                d = void 0 !== u && u,
                h = e.className,
                m = i(
                  h,
                  l.dialog,
                  n && l.rounded,
                  p && l.shadowed,
                  d && l.fullscreen
                ),
                w = Object(c.a)(this.props);
              return r.createElement(
                r.Fragment,
                null,
                r.createElement(
                  s.b.Provider,
                  { value: this._manager },
                  r.createElement(
                    "div",
                    o.__assign({}, w, {
                      className: m,
                      style: this._createStyles(),
                      ref: this.props.reference,
                      onFocus: this.props.onFocus,
                      onMouseDown: this.props.onMouseDown,
                      onMouseUp: this.props.onMouseUp,
                      onClick: this.props.onClick,
                      onKeyDown: this.props.onKeyDown,
                      tabIndex: -1
                    }),
                    this.props.children
                  )
                ),
                r.createElement(s.a, { reference: this._handleSlot })
              );
            }),
            (t.prototype._createStyles = function() {
              var e = this.props,
                t = e.bottom,
                n = e.left,
                o = e.width;
              return {
                bottom: t,
                left: n,
                right: e.right,
                top: e.top,
                zIndex: e.zIndex,
                maxWidth: o,
                height: e.height
              };
            }),
            t
          );
        })(r.PureComponent));
    },
    "8MIK": function(e, t, n) {
      e.exports = {
        modal: "modal-C2LSTwhC-",
        content: "content-tr28wPlV-",
        form: "form-2GifjSKe-",
        copyForm: "copyForm-1HuPoKA0-",
        copyBtn: "copyBtn-1oB8tEqo-",
        shadow: "shadow-2JTdO0Fb-",
        actions: "actions-3fKk-h7d-",
        link: "link-1alPBTTQ-",
        socials: "socials-rht5Uvp--"
      };
    },
    AiMB: function(e, t, n) {
      var o, r, i, s, a, c, l, p;
      n.d(t, "a", function() {
        return l;
      }),
        n.d(t, "b", function() {
          return p;
        }),
        (o = n("mrSG")),
        (r = n("q1tI")),
        (i = n("i8i4")),
        (s = n("0waE")),
        (a = n("jAh7")),
        (c = n("+EG+")),
        (l = (function(e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t._uuid = Object(s.guid)()), t;
          }
          return (
            o.__extends(t, e),
            (t.prototype.componentWillUnmount = function() {
              this._manager().removeWindow(this._uuid);
            }),
            (t.prototype.render = function() {
              return i.createPortal(
                r.createElement(
                  p.Provider,
                  { value: this },
                  this.props.children
                ),
                this._manager().ensureWindow(this._uuid)
              );
            }),
            (t.prototype.moveToTop = function() {
              this._manager().moveToTop(this._uuid);
            }),
            (t.prototype._manager = function() {
              return null === this.context
                ? Object(a.getRootOverlapManager)()
                : this.context;
            }),
            (t.contextType = c.b),
            t
          );
        })(r.PureComponent)),
        (p = r.createContext(null));
    },
    GyvH: function(e, t) {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 15" width="22" height="15"><g fill="none" fill-rule="evenodd" stroke-width="2"><path stroke="#757575" d="M6.25 5.812L11 10.087l4.75-4.275M11 9.868V.315"/><path stroke="#ADAEB0" d="M21 10v4H1v-4"/></g><path d="M.008 12.47V9.994H1.96v3.003h18.095V9.988l.958.021.957.021.02 2.46.02 2.458H.008v-2.477z"/><path d="M8.642 9.27a673.518 673.518 0 0 0-2.658-2.396l-.369-.325.657-.716.658-.716 1.49 1.35c.819.741 1.525 1.348 1.57 1.348.054 0 .079-1.143.079-3.716V.382H11.946v3.717c0 2.129.029 3.716.067 3.716.037 0 .738-.607 1.558-1.349l1.491-1.35.508.543c.28.298.57.626.647.73l.14.187-2.632 2.366c-1.447 1.3-2.668 2.372-2.712 2.381-.044.01-1.111-.915-2.37-2.054z"/></svg>';
    },
    QpNh: function(e, t, n) {
      function o(e) {
        var t,
          n,
          o,
          i,
          s,
          a = Object.entries(e).filter(r),
          c = {};
        for (t = 0, n = a; t < n.length; t++)
          (i = (o = n[t])[0]), (s = o[1]), (c[i] = s);
        return c;
      }
      function r(e) {
        var t = e[0],
          n = e[1];
        return 0 === t.indexOf("data-") && "string" == typeof n;
      }
      n.d(t, "a", function() {
        return o;
      });
    },
    UJLh: function(e, t, n) {
      e.exports = { modal: "modal-GUK9cvUQ-", backdrop: "backdrop-1qZHPwi_-" };
    },
    aYmi: function(e, t, n) {
      e.exports = {
        dialog: "dialog-2APwxL3O-",
        rounded: "rounded-tXI9mwGE-",
        shadowed: "shadowed-2M13-xZa-",
        fullscreen: "fullscreen-2RqU2pqU-"
      };
    },
    fMMV: function(e, t, n) {
      function o(e, t, n, o) {
        return (
          void 0 === o && (o = {}),
          c.__awaiter(this, void 0, void 0, function() {
            var r, i, s, a, u, d, h;
            return c.__generator(this, function(m) {
              if (((r = new FormData()), void 0 !== o.previews))
                for (i = 0, s = o.previews; i < s.length; i++)
                  (a = s[i]), r.append("previews[]", a);
              return (
                void 0 !== o.cme && r.append("cme", String(o.cme)),
                void 0 !== o.wl && r.append("wl", String(o.wl)),
                void 0 !== o.onWidget &&
                  r.append("onWidget", String(o.onWidget)),
                o.isReport && r.append("isReport", String(o.isReport)),
                (u = window.urlParams) &&
                  u.locale &&
                  r.append("language", u.locale),
                (d = e.activeChartWidget.value()),
                void 0 !== (h = d.widgetCustomer()) && r.append("customer", h),
                r.append("timezone", d.properties().timezone.value()),
                r.append("images", JSON.stringify(e.images())),
                (function(e, t, n, o) {
                  void 0 === o && (o = {});
                  c.__awaiter(this, void 0, void 0, function() {
                    var r, i, s;
                    return c.__generator(this, function(a) {
                      switch (a.label) {
                        case 0:
                          (r = l.enabled("charting_library_base")
                            ? o.snapshotUrl ||
                              "https://www.tradingview.com/snapshot/"
                            : "/snapshot/"),
                            (a.label = 1);
                        case 1:
                          return (
                            a.trys.push([1, 4, , 5]),
                            [
                              4,
                              Object(p.fetch)(r, {
                                body: e,
                                method: "POST",
                                credentials: "same-origin"
                              })
                            ]
                          );
                        case 2:
                          return [4, (i = a.sent()).text()];
                        case 3:
                          return (s = a.sent()), i.ok ? t(s) : n(), [3, 5];
                        case 4:
                          return a.sent(), n(), [3, 5];
                        case 5:
                          return [2];
                      }
                    });
                  });
                })(r, t, n, o),
                [2]
              );
            });
          })
        );
      }
      function r(e) {
        var t = m(
          "tv-spinner",
          "tv-spinner--shown",
          "tv-spinner--size_" + (e.size || S.DEFAULT_SIZE)
        );
        return d.createElement(
          "div",
          { className: t, style: e.style, role: "progressbar" },
          d.createElement(
            "div",
            { className: "tv-spinner__spinner-layer" },
            d.createElement("div", {
              className: "tv-spinner__background tv-spinner__width_element"
            }),
            d.createElement("div", {
              className:
                "tv-spinner__circle-clipper tv-spinner__width_element tv-spinner__circle-clipper--left"
            }),
            d.createElement("div", {
              className:
                "tv-spinner__circle-clipper tv-spinner__width_element tv-spinner__circle-clipper--right"
            })
          )
        );
      }
      function i(e, t, n) {
        function r(e) {
          s ||
            ((s = document.createElement("div")), document.body.appendChild(s)),
            h.render(d.createElement(N, e), s);
        }
        function i() {
          r({ isOpened: !1 });
        }
        var s;
        void 0 === t && (t = {}),
          Object(u.trackEvent)("GUI", "Get image button"),
          r({ isOpened: !1 }),
          o(
            e,
            function(o) {
              n && n(o),
                r({
                  isOpened: !0,
                  onClose: i,
                  imageUrl: l.enabled("charting_library_base")
                    ? (t.snapshotUrl ? "" : "https://www.tradingview.com/x/") +
                      o
                    : Object(a.isProd)()
                    ? "https://www.tradingview.com/x/" + o + "/"
                    : window.location.protocol +
                      "//" +
                      window.location.host +
                      "/x/" +
                      o +
                      "/",
                  symbol: e.activeChartWidget
                    .value()
                    .symbolProperty()
                    .value()
                });
            },
            function() {
              r({
                isOpened: !0,
                onClose: i,
                error: window.t("URL cannot be received")
              });
            },
            {
              onWidget: e.onWidget,
              snapshotUrl: t.snapshotUrl,
              onInvalidSnapshotImage: i
            }
          ),
          r({ isOpened: !0, onClose: i });
      }
      function s(e, t, n) {
        o(
          e,
          function(e) {
            n && n(e);
          },
          function() {
            console.warn(window.t("Error while trying to create snapshot."));
          },
          { snapshotUrl: t.snapshotUrl }
        );
      }
      var a,
        c,
        l,
        p,
        u,
        d,
        h,
        m,
        w,
        v,
        f,
        g,
        _,
        y,
        b,
        E,
        C,
        x,
        S,
        I,
        O,
        U,
        k,
        M,
        T,
        N;
      n.r(t),
        n("YFKU"),
        (a = n("Wt0y")),
        (c = n("mrSG")),
        n("HbRj"),
        (l = n("Kxc7")),
        (p = n("BHQF")),
        (u = n("tITk")),
        (d = n("q1tI")),
        (h = n("i8i4")),
        (m = n("TSYQ")),
        (w = n("1O6C")),
        (v = n("uqKQ")),
        (f = n("RgaO")),
        (g = n("UJLh")),
        (_ = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            c.__extends(t, e),
            (t.prototype.render = function() {
              var e = this.props,
                t = e.zIndex,
                n = e.onClickOutside,
                o = e.children,
                r = e.className;
              return d.createElement(
                "div",
                { className: g.modal, style: { zIndex: t } },
                d.createElement("div", { className: g.backdrop }),
                d.createElement(
                  f.a,
                  { mouseDown: !0, touchStart: !0, handler: n },
                  d.createElement(
                    w.a,
                    c.__assign({}, this.props, { className: m(r) }),
                    o
                  )
                )
              );
            }),
            (t.defaultProps = { width: 500 }),
            t
          );
        })(d.PureComponent)),
        (y = Object(v.a)(_)),
        (b = n("AVTG")),
        (E = n("jjrI")),
        (C = n("L0Sj")),
        (x = n("oj21")),
        (S = n("c2JX")),
        n("SzKR"),
        (function(e) {
          function t(e, t) {
            return "cme" === TradingView.widgetCustomer
              ? t + " from cmegroup.com via @tradingview $" + e
              : "#" + e + " chart " + t + " via https://www.tradingview.com";
          }
          function n(e, t) {
            var n, o, r, i;
            return (
              void 0 === e && (e = "about:blank"),
              void 0 === t && (t = "snapshot_tweet"),
              (n = 550),
              (o = 420),
              (r = Math.round(screen.width / 2 - n / 2)),
              (i = Math.round(screen.height / 2 - o / 2)),
              window.open(
                e,
                t,
                "scrollbars=yes,resizable=yes,toolbar=no,location=yes,\n\t\t\t\twidth=" +
                  n +
                  ",height=" +
                  o +
                  ",\n\t\t\t\tleft=" +
                  r +
                  ",top=" +
                  i
              )
            );
          }
          (e.getStatus = t),
            (e.shareSnapshot = function(e) {
              var o = n();
              return {
                onFailure: function() {
                  o.close();
                },
                onSuccess: function(n) {
                  o.location.href = (function(e, n) {
                    return (
                      "https://twitter.com/intent/tweet?&status=" +
                      encodeURIComponent(
                        t(
                          e,
                          (function(e) {
                            return (
                              window.location.protocol +
                              "//" +
                              window.location.host +
                              "/x/" +
                              e +
                              "/"
                            );
                          })(n)
                        )
                      )
                    );
                  })(e, n);
                }
              };
            }),
            (e.shareSnapshotInstantly = function(e, o) {
              n(
                (function(e, n) {
                  return (
                    "https://twitter.com/intent/tweet?&status=" +
                    encodeURIComponent(t(e, n))
                  );
                })(e, o)
              );
            });
        })(I || (I = {})),
        (O = n("ycI/")),
        (U = n("Ialn")),
        (k = n("8MIK")),
        (M = n("/g3O")),
        (T = n("GyvH")),
        (N = (function(e) {
          function t(t) {
            var n = e.call(this, t) || this;
            return (
              (n._input = null),
              (n._hideMessages = function() {
                n.setState({ message: "", error: "" });
              }),
              (n._setInput = function(e) {
                n._input = e;
              }),
              (n._select = function() {
                null !== n._input && n._input.select();
              }),
              (n._shareTwitter = function() {
                I.shareSnapshotInstantly(
                  n.props.symbol || "",
                  n.props.imageUrl || ""
                );
              }),
              (n._onClose = function() {
                n.props.onClose && n.props.onClose(), (n._copyBtn = null);
              }),
              (n.state = { message: t.message, error: t.error }),
              n
            );
          }
          return (
            c.__extends(t, e),
            (t.prototype.componentWillReceiveProps = function(e) {
              this.setState({ message: e.message, error: e.error });
            }),
            (t.prototype.componentDidUpdate = function(e) {
              var t = this;
              !e.imageUrl &&
                this.props.imageUrl &&
                setTimeout(function() {
                  null !== t._input && (t._input.select(), t._input.focus());
                });
            }),
            (t.prototype.render = function() {
              var e = this,
                t =
                  !this.props.imageUrl &&
                  !this.props.message &&
                  !this.props.error,
                n = m(k.copyBtn, !U.IS_RTL && k.shadow);
              return d.createElement(
                y,
                {
                  isOpened: this.props.isOpened,
                  className: k.modal,
                  onClickOutside: this._onClose,
                  "data-dialog-type": "take-snapshot-modal"
                },
                d.createElement(
                  b.b,
                  { onClose: this._onClose },
                  window.t("Image URL")
                ),
                d.createElement(b.c, {
                  text: this.state.message,
                  isError: !1,
                  onClickOutside: this._hideMessages
                }),
                d.createElement(b.c, {
                  text: this.state.error,
                  isError: !0,
                  onClickOutside: this._hideMessages
                }),
                d.createElement(
                  b.a,
                  null,
                  d.createElement(O.a, { keyCode: 27, handler: this._onClose }),
                  d.createElement(
                    "div",
                    { className: k.content },
                    t && d.createElement(r, { size: "mini" }),
                    d.createElement(
                      "div",
                      {
                        className: k.form,
                        style: {
                          visibility: this.props.imageUrl ? "visible" : "hidden"
                        }
                      },
                      d.createElement(
                        "div",
                        { className: k.copyForm },
                        d.createElement(C.b, {
                          reference: this._setInput,
                          readOnly: !0,
                          value: this.props.imageUrl || "",
                          onClick: this._select,
                          onFocus: this._select,
                          strictLeftDirectionInput: U.IS_RTL,
                          style: U.IS_RTL ? { paddingLeft: 84 } : void 0
                        }),
                        d.createElement(
                          "div",
                          {
                            ref: function(t) {
                              return t && e._setupClipboard(t);
                            },
                            "data-clipboard-text": this.props.imageUrl,
                            className: n
                          },
                          d.createElement(
                            x.a,
                            { type: "primary", theme: "ghost" },
                            window.t("Copy")
                          )
                        )
                      ),
                      d.createElement(
                        "div",
                        { className: k.actions },
                        d.createElement(
                          "a",
                          {
                            className: k.link,
                            href: this.props.imageUrl,
                            target: "_blank"
                          },
                          d.createElement(E.a, { icon: T }),
                          d.createElement("span", null, window.t("Save image"))
                        ),
                        d.createElement(
                          "span",
                          { className: k.socials, onClick: this._shareTwitter },
                          d.createElement(E.a, { icon: M }),
                          d.createElement("span", null, window.t("Tweet"))
                        )
                      )
                    )
                  )
                )
              );
            }),
            (t.prototype._setupClipboard = function(e) {
              var t = this;
              this._copyBtn ||
                ((this._copyBtn = e),
                n
                  .e("clipboard")
                  .then(
                    function(o) {
                      var r = n("Ddwv"),
                        i = new r(e);
                      i.on("success", function() {
                        TradingView.trackEvent("GUI", "Copied Image Link"),
                          t.setState({
                            message: window.t("Copied to clipboard")
                          });
                      }),
                        i.on("error", function() {
                          t.setState({
                            message: window.t(
                              "Sorry, the Copy Link button doesn't work in your browser. Please select the link and copy it manually."
                            )
                          });
                        });
                    }.bind(null, n)
                  )
                  .catch(n.oe));
            }),
            (t.defaultProps = { imageUrl: "" }),
            t
          );
        })(d.Component)),
        n.d(t, "getImageOfChart", function() {
          return i;
        }),
        n.d(t, "getImageOfChartSilently", function() {
          return s;
        });
    },
    uqKQ: function(e, t, n) {
      function o(e) {
        return (function(t) {
          function n() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            r.__extends(n, t),
            (n.prototype.render = function() {
              var t,
                n = this.props,
                o = n.isOpened,
                a = n.root;
              return o
                ? ((t = i.createElement(
                    e,
                    r.__assign({}, this.props, { zIndex: 150 })
                  )),
                  "parent" === a ? t : i.createElement(s.a, null, t))
                : null;
            }),
            n
          );
        })(i.PureComponent);
      }
      var r, i, s;
      n.d(t, "a", function() {
        return o;
      }),
        (r = n("mrSG")),
        (i = n("q1tI")),
        (s = n("AiMB"));
    }
  }
]);
