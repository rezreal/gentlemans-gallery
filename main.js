(self["webpackChunk"] = self["webpackChunk"] || []).push([["main"],{

/***/ 67629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigMenu": () => (/* binding */ ConfigMenu)
/* harmony export */ });
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34795);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9249);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(87371);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45754);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11987);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(95058);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(77162);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2784);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13358);
/* harmony import */ var _demo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(88435);
/* harmony import */ var _ConfigMenu_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25674);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(49663);






var _jsxFileName = "/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/app/ConfigMenu.tsx";


function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }







var ConfigMenu = /*#__PURE__*/function (_Component) {
  (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_3__["default"])(ConfigMenu, _Component);

  var _super = _createSuper(ConfigMenu);

  function ConfigMenu(props) {
    var _this;

    (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ConfigMenu);

    _this = _super.call(this, props);
    _this.fileSelector = void 0;
    _this.goodImageSelector = void 0;
    _this.badImageSelector = void 0;
    _this.punishImageSelector = void 0;
    _this.state = {
      files: {
        HARD_PUNISH: [],
        FOCUS: [],
        SOFT_PUNISH: []
      }
    };
    _this.fileSelector = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createRef();
    _this.goodImageSelector = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createRef();
    _this.badImageSelector = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createRef();
    _this.punishImageSelector = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createRef();
    return _this;
  }

  (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_2__["default"])(ConfigMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fileSelector.current.webkitdirectory = 'true';
      this.goodImageSelector.current.webkitdirectory = 'true';
      this.badImageSelector.current.webkitdirectory = 'true';
      this.punishImageSelector.current.webkitdirectory = 'true';
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
        className: "setupForms",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("details", {
          open: true,
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("summary", {
            children: "Configure Pury.fi"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 52,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
            children: ["This tool runs", ' ', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("a", {
              href: "https://www.patreon.com/puryfi",
              children: ["with AI support from Pury.fi", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("img", {
                width: "64",
                alt: "Pury.fi",
                src: "https://pury.fi/site/wp-content/uploads/2021/09/breast_round_black.png"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 57,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 55,
              columnNumber: 13
            }, this), ". Please install the Puri.fy Firefox extension to use this site."]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 9
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("details", {
          open: true,
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("summary", {
            children: "Select local gallery"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 68,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
            children: "Just select a directory that contains images. Yay."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 69,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "form-group",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Select a gallery folder", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                ref: this.fileSelector,
                type: "file",
                onChange: function onChange(e) {
                  return _this2.props.handleFileSelection(e);
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 73,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 71,
              columnNumber: 13
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 70,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
            children: ["Suggestions/PRs for a public domain sample gallery are welcome!", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
              onClick: function onClick() {
                return (0,_demo__WEBPACK_IMPORTED_MODULE_9__.loadDemoImages)().then(function (dis) {
                  return (//this.props.handleAlternativeSelection(dis)
                    alert('FIXME! need to be reimplemented')
                  );
                });
              },
              children: "Load demo images"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 82,
              columnNumber: 13
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 80,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 9
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("details", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("summary", {
            children: "Select alternative Mode gallery"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 95,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
            children: "This gallery uses images from two folders where one folder containers desireable images and other folders contains undesirable or forbidden images."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 96,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("fieldset", {
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Good images:", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                ref: this.goodImageSelector,
                type: "file",
                onChange: function onChange(e) {
                  return _this2.setState(function (state) {
                    return Object.assign({}, state, {
                      files: Object.assign({}, state.files, {
                        FOCUS: Array.from(e.target.files)
                      })
                    });
                  });
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 104,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 102,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("br", {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 118,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Bad images:", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                ref: this.badImageSelector,
                type: "file",
                onChange: function onChange(e) {
                  return _this2.setState(function (state) {
                    return Object.assign({}, state, {
                      files: Object.assign({}, state.files, {
                        SOFT_PUNISH: Array.from(e.target.files)
                      })
                    });
                  });
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 121,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 119,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("br", {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 135,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Forbidden images (harsh punishment):", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                ref: this.punishImageSelector,
                type: "file",
                onChange: function onChange(e) {
                  return _this2.setState(function (state) {
                    return Object.assign({}, state, {
                      files: Object.assign({}, state.files, {
                        HARD_PUNISH: Array.from(e.target.files)
                      })
                    });
                  });
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 138,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 136,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
              onClick: function onClick() {
                return _this2.props.handleAlternativeSelection(_this2.state.files);
              },
              children: "Set Images"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 152,
              columnNumber: 13
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 101,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 9
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("details", {
          open: true,
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("summary", {
            children: "Rules"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 163,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("ul", {
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: ["Making Progress by looking at ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("br", {}, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 166,
                columnNumber: 45
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("select", {
                multiple: true,
                value: this.props.settings.rules.regionMapping.FOCUS,
                onChange: function onChange(e) {
                  return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    rules: Object.assign({}, _this2.props.settings.rules, {
                      regionMapping: Object.assign({}, _this2.props.settings.rules.regionMapping, {
                        FOCUS: Array.from(e.target.options).filter(function (i) {
                          return i.selected;
                        }).map(function (i) {
                          return i.value;
                        })
                      })
                    })
                  }));
                },
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FACE_FEMALE",
                  children: "female Face"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 187,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FACE_MALE",
                  children: "male Face"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 188,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ARMPITS_EXPOSED",
                  children: "armpits (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 189,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEET_COVERED",
                  children: "feet (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 190,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEET_EXPOSED",
                  children: "feet (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 191,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BELLY_EXPOSED",
                  children: "belly (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 192,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BELLY_COVERED",
                  children: "belly (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 193,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ANUS_EXPOSED",
                  children: "anus (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 194,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ANUS_COVERED",
                  children: "anus (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 195,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BUTTOCKS_EXPOSED",
                  children: "buttocks (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 196,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_GENITALIA_EXPOSED",
                  children: "male genitalia (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 197,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_GENITALIA_COVERED",
                  children: "male genitalia (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 200,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_BREAST_EXPOSED",
                  children: "male breast (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 203,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_BREAST_COVERED",
                  children: "male breast (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 206,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_BREAST_EXPOSED",
                  children: "female breast (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 209,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_BREAST_COVERED",
                  children: "female breast (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 212,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_GENITALIA_EXPOSED",
                  children: "female genitalia (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 215,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_GENITALIA_COVERED",
                  children: "female genitalia (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 218,
                  columnNumber: 17
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 167,
                columnNumber: 15
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("br", {}, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 222,
                columnNumber: 15
              }, this), "for", ' ', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                type: "number",
                value: this.props.settings.rules.focusDuration,
                min: "1",
                max: "20",
                onChange: function onChange(e) {
                  return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    rules: Object.assign({}, _this2.props.settings.rules, {
                      focusDuration: e.target.valueAsNumber
                    })
                  }));
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 224,
                columnNumber: 15
              }, this), ' ', "seconds"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 165,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: ["Do not stare at ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("br", {}, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 242,
                columnNumber: 31
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("select", {
                multiple: true,
                value: this.props.settings.rules.regionMapping.SOFT_PUNISH,
                onChange: function onChange(e) {
                  return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    rules: Object.assign({}, _this2.props.settings.rules, {
                      regionMapping: Object.assign({}, _this2.props.settings.rules.regionMapping, {
                        SOFT_PUNISH: Array.from(e.target.options).filter(function (i) {
                          return i.selected;
                        }).map(function (i) {
                          return i.value;
                        })
                      })
                    })
                  }));
                },
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FACE_FEMALE",
                  children: "female Face"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 263,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FACE_MALE",
                  children: "male Face"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 264,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ARMPITS_EXPOSED",
                  children: "armpits (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 265,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEET_COVERED",
                  children: "feet (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 266,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEET_EXPOSED",
                  children: "feet (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 267,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BELLY_EXPOSED",
                  children: "belly (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 268,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BELLY_COVERED",
                  children: "belly (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 269,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ANUS_EXPOSED",
                  children: "anus (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 270,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ANUS_COVERED",
                  children: "anus (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 271,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BUTTOCKS_EXPOSED",
                  children: "buttocks (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 272,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_GENITALIA_EXPOSED",
                  children: "male genitalia (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 273,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_GENITALIA_COVERED",
                  children: "male genitalia (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 276,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_BREAST_EXPOSED",
                  children: "male breast (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 279,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_BREAST_COVERED",
                  children: "male breast (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 282,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_BREAST_EXPOSED",
                  children: "female breast (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 285,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_BREAST_COVERED",
                  children: "female breast (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 288,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_GENITALIA_EXPOSED",
                  children: "female genitalia (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 291,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_GENITALIA_COVERED",
                  children: "female genitalia (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 294,
                  columnNumber: 17
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 243,
                columnNumber: 15
              }, this), ' ', "!"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 241,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: ["Especially do not stare at (Hard punished) ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("br", {}, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 301,
                columnNumber: 58
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("select", {
                multiple: true,
                value: this.props.settings.rules.regionMapping.HARD_PUNISH,
                onChange: function onChange(e) {
                  return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    rules: Object.assign({}, _this2.props.settings.rules, {
                      regionMapping: Object.assign({}, _this2.props.settings.rules.regionMapping, {
                        HARD_PUNISH: Array.from(e.target.options).filter(function (i) {
                          return i.selected;
                        }).map(function (i) {
                          return i.value;
                        })
                      })
                    })
                  }));
                },
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FACE_FEMALE",
                  children: "female Face"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 322,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FACE_MALE",
                  children: "male Face"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 323,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ARMPITS_EXPOSED",
                  children: "armpits (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 324,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEET_COVERED",
                  children: "feet (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 325,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEET_EXPOSED",
                  children: "feet (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 326,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BELLY_EXPOSED",
                  children: "belly (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 327,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BELLY_COVERED",
                  children: "belly (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 328,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ANUS_EXPOSED",
                  children: "anus (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 329,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "ANUS_COVERED",
                  children: "anus (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 330,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "BUTTOCKS_EXPOSED",
                  children: "buttocks (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 331,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_GENITALIA_EXPOSED",
                  children: "male genitalia (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 332,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_GENITALIA_COVERED",
                  children: "male genitalia (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 335,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_BREAST_EXPOSED",
                  children: "male breast (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 338,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "MALE_BREAST_COVERED",
                  children: "male breast (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 341,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_BREAST_EXPOSED",
                  children: "female breast (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 344,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_BREAST_COVERED",
                  children: "female breast (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 347,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_GENITALIA_EXPOSED",
                  children: "female genitalia (exposed)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 350,
                  columnNumber: 17
                }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                  value: "FEMALE_GENITALIA_COVERED",
                  children: "female genitalia (covered)"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 353,
                  columnNumber: 17
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 302,
                columnNumber: 15
              }, this), ' ', "!"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 300,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: "Not following these rules will be punished."
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 359,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                  type: "checkbox",
                  checked: this.props.settings.rules.showGaze,
                  onChange: function onChange(e) {
                    return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                      rules: Object.assign({}, _this2.props.settings.rules, {
                        showGaze: e.target.checked
                      })
                    }));
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 362,
                  columnNumber: 17
                }, this), ' ', "Gaze tracing"]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 361,
                columnNumber: 15
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 360,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                  type: "checkbox",
                  checked: this.props.settings.rules.allowSkipImage,
                  onChange: function onChange(e) {
                    return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                      rules: Object.assign({}, _this2.props.settings.rules, {
                        allowSkipImage: e.target.checked
                      })
                    }));
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 380,
                  columnNumber: 17
                }, this), ' ', "Allow skip image"]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 379,
                columnNumber: 15
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 378,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: ["Visual Warning", ' ', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("select", {
                  value: this.props.settings.rules.softFilter,
                  onChange: function onChange(e) {
                    return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                      rules: Object.assign({}, _this2.props.settings.rules, {
                        softFilter: e.target.value
                      })
                    }));
                  },
                  children: [' ', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                    value: "saturate",
                    children: "Saturate"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 412,
                    columnNumber: 19
                  }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("option", {
                    value: "pixelate",
                    children: "Pixelate"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 413,
                    columnNumber: 19
                  }, this)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 399,
                  columnNumber: 17
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 397,
                columnNumber: 15
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 396,
              columnNumber: 13
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                  type: "checkbox",
                  checked: this.props.settings.rules.playSounds,
                  onChange: function onChange(e) {
                    return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                      rules: Object.assign({}, _this2.props.settings.rules, {
                        playSounds: e.target.checked
                      })
                    }));
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 419,
                  columnNumber: 17
                }, this), ' ', "Play Sounds"]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 418,
                columnNumber: 15
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 417,
              columnNumber: 13
            }, this), document.fullscreenEnabled ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                  type: "checkbox",
                  checked: this.props.settings.rules.fullscreen,
                  onChange: function onChange(e) {
                    return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                      rules: Object.assign({}, _this2.props.settings.rules, {
                        fullscreen: e.target.checked
                      })
                    }));
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 438,
                  columnNumber: 19
                }, this), ' ', "Fullscreen"]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 437,
                columnNumber: 17
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 436,
              columnNumber: 15
            }, this) : '', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("li", {
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                  type: "checkbox",
                  checked: this.props.settings.rules.shuffleGallery,
                  onChange: function onChange(e) {
                    return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                      rules: Object.assign({}, _this2.props.settings.rules, {
                        shuffleGallery: e.target.checked
                      })
                    }));
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 459,
                  columnNumber: 17
                }, this), ' ', "Shuffle Gallery"]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 458,
                columnNumber: 15
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 457,
              columnNumber: 13
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
            onClick: function onClick(e) {
              return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                rules: _rules__WEBPACK_IMPORTED_MODULE_8__.defaultRules
              }));
            },
            children: "Reset to defaults"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 476,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 162,
          columnNumber: 9
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("details", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("summary", {
            children: "XToys.app"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 489,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "form-group",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Use XToys.app?", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                type: "checkbox",
                checked: this.props.settings.xtoys.use,
                onChange: function onChange(e) {
                  return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    xtoys: Object.assign({}, _this2.props.settings.xtoys, {
                      use: e.target.checked
                    })
                  }));
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 493,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 491,
              columnNumber: 13
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 490,
            columnNumber: 11
          }, this), this.props.settings.xtoys.use ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
                children: ["You have to register a custom toy at", ' ', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("a", {
                  href: "https://xtoys.app/me/custom-toys",
                  children: "XToys.app"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 513,
                  columnNumber: 19
                }, this), ". Create a new Websocket toy, choose the type \"Generic Input/Output\". Choose a name and/or description as you prefer. Click \"Generate Websocket Info\". Then save your toy and add the generated websocket and token codes here:"]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 511,
                columnNumber: 17
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: ["Websocket:", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                  type: "text",
                  value: this.props.settings.xtoys.websocket,
                  onChange: function onChange(e) {
                    return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                      xtoys: Object.assign({}, _this2.props.settings.xtoys, {
                        websocket: e.target.value
                      })
                    }));
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 521,
                  columnNumber: 19
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 519,
                columnNumber: 17
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: ["Token:", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                  type: "text",
                  value: this.props.settings.xtoys.token,
                  onChange: function onChange(e) {
                    return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                      xtoys: Object.assign({}, _this2.props.settings.xtoys, {
                        token: e.target.value
                      })
                    }));
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 537,
                  columnNumber: 19
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 535,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 510,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 509,
            columnNumber: 13
          }, this) : '']
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 488,
          columnNumber: 9
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("details", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("summary", {
            children: "Tobii EyeX"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 559,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
            children: ["You can try this gallery via mouse but it is intended to be used with a eye tracking devices. Currently the Tobii Eye 4C is supported using the", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("a", {
              href: "https://github.com/rezreal/Tobii-EyeX-Web-Socket-Server/releases",
              target: "_blank",
              children: "Tobii-EyeX-Web-Socket-Server"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 564,
              columnNumber: 13
            }, this), ". As a preparation, install your Tobii Tracking software and launch the ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("em", {
              children: "TobiiSocketServer.exe"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 571,
              columnNumber: 17
            }, this), "."]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 560,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "form-group",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Use Tobii?", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                type: "checkbox",
                checked: this.props.settings.tobii.use,
                onChange: function onChange(e) {
                  return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    tobii: Object.assign({}, _this2.props.settings.tobii, {
                      use: e.target.checked
                    })
                  }));
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 576,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 574,
              columnNumber: 13
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 573,
            columnNumber: 11
          }, this), this.props.settings.tobii.use ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "form-group",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Disable mouse?", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                type: "checkbox",
                checked: this.props.settings.tobii.disableMouse,
                onChange: function onChange(e) {
                  return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    tobii: Object.assign({}, _this2.props.settings.tobii, {
                      disableMouse: e.target.checked
                    })
                  }));
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 595,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 593,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 592,
            columnNumber: 13
          }, this) : '', this.props.settings.tobii.use ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "form-group",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Tobii Websocket Server", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                type: "text",
                value: this.props.settings.tobii.server || '',
                onChange: function onChange(e) {
                  _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    tobii: Object.assign({}, _this2.props.settings.tobii, {
                      server: e.target.value
                    })
                  }));
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 617,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 615,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 614,
            columnNumber: 13
          }, this) : '']
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 558,
          columnNumber: 9
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("details", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("summary", {
            children: "WebGazer"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 638,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
            children: "You can use WebGazer to track your gaze via webcam. You must permit access to use of your camera. The video is only processed locally and not sent anywhere."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 639,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "form-group",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Use Webgazer?", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                type: "checkbox",
                checked: this.props.settings.webgazer.use,
                onChange: /*#__PURE__*/function () {
                  var _ref = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6___default().mark(function _callee(e) {
                    return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_6___default().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                              webgazer: Object.assign({}, _this2.props.settings.webgazer, {
                                use: e.target.checked
                              })
                            }));

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 647,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 645,
              columnNumber: 13
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 644,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 637,
          columnNumber: 9
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("details", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("summary", {
            children: "DG-Labs Coyote"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 665,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
            children: "Punishments and teasing should be real! Link your DG-Labs Coyote EStim device to feel real punishments. Make sure you run a web-bluetooth compatible browser (e.g. Chrome or Edge)."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 666,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "form-group",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
              children: ["Use Coyote?", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                type: "checkbox",
                checked: this.props.settings.coyote.use,
                onChange: function onChange(e) {
                  return _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                    coyote: Object.assign({}, _this2.props.settings.coyote, {
                      use: e.target.checked
                    })
                  }));
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 674,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 672,
              columnNumber: 13
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 671,
            columnNumber: 11
          }, this), this.props.settings.coyote.use ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "form-group",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
              onClick: function onClick(e) {
                return _this2.props.onSelectCoyoteDeviceClicked();
              },
              children: !this.props.settings.coyote.pairedDeviceId ? 'Select device' : 'Reconnect device'
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 691,
              columnNumber: 15
            }, this), this.props.settings.coyote.pairedDeviceId ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                children: ["DeviceId:", ' ', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                  type: "text",
                  readOnly: true,
                  value: this.props.settings.coyote.pairedDeviceId
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 700,
                  columnNumber: 21
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 698,
                columnNumber: 19
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
                onClick: function onClick() {
                  return _this2.props.onForgetCoyoteDeviceClicked();
                },
                children: "Forget Device"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 706,
                columnNumber: 19
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
                className: "form-group",
                children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("label", {
                  children: ["Power Level (Channel A)", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
                    type: "number",
                    step: "7",
                    value: this.props.settings.coyote.powerLevel,
                    onChange: function onChange(e) {
                      _this2.props.onSettingsChanged(Object.assign({}, _this2.props.settings, {
                        coyote: Object.assign({}, _this2.props.settings.coyote, {
                          powerLevel: e.target.valueAsNumber
                        })
                      }));
                    }
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 714,
                    columnNumber: 23
                  }, this)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 712,
                  columnNumber: 21
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 711,
                columnNumber: 19
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 697,
              columnNumber: 17
            }, this) : '']
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 690,
            columnNumber: 13
          }, this) : '']
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 664,
          columnNumber: 9
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 7
      }, this);
    }
  }]);

  return ConfigMenu;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/***/ }),

/***/ 63047:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encodePower": () => (/* binding */ encodePower),
/* harmony export */   "pairDevice": () => (/* binding */ pairDevice),
/* harmony export */   "parsePattern": () => (/* binding */ parsePattern),
/* harmony export */   "parsePower": () => (/* binding */ parsePower)
/* harmony export */ });
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34795);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77162);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__);


var coyoteService = '955a180b-0fe2-f5aa-a094-84b8d4f3e8ad';
var configCharacteristic = '955a1507-0fe2-f5aa-a094-84b8d4f3e8ad';
var POWER_CHARACTERISTIC = '955a1504-0fe2-f5aa-a094-84b8d4f3e8ad';
var PATTERN_A_CHARACTERISTIC = '955a1506-0fe2-f5aa-a094-84b8d4f3e8ad';
var PATTERN_B_CHARACTERISTIC = '955a1505-0fe2-f5aa-a094-84b8d4f3e8ad';
var batteryService = '955a180a-0fe2-f5aa-a094-84b8d4f3e8ad';
var batteryCharacteristic = '955a1500-0fe2-f5aa-a094-84b8d4f3e8ad';

function flipFirstAndThirdByte(buffer) {
  var bufferBytes = new Uint8Array(buffer);
  var b = bufferBytes[0];
  bufferBytes[0] = bufferBytes[2];
  bufferBytes[2] = b;
}
/**
 * @param {number} powerA
 * @param {number} powerB
 * @return {ArrayBuffer}
 */


function encodePower(_ref) {
  var powerA = _ref.powerA,
      powerB = _ref.powerB;

  /**
   * notify/write: 3 bytes: zero(2) ~ uint(11).as("powerLevelB") ~uint(11).as("powerLevelA")
   * 0 0 a a a a a a | a a a a a b b b | b b b b b b b b
   * Power levels must likely be a multiple of "powerStep" and between 0 and "maxPower"
   * (as obtained through config attribute.)
   */
  var buffer = new ArrayBuffer(3);
  var view = new DataView(buffer);
  view.setUint8(0, powerA >>> 5 & 63);
  view.setUint8(1, (powerA & 31) << 3 | (powerB & 2047) >>> 8);
  view.setUint8(2, powerB & 255);
  flipFirstAndThirdByte(buffer);
  return buffer;
}
/**
 * @return {[number, number]} powerA and powerB
 */

function parsePower(dataView) {
  flipFirstAndThirdByte(dataView.buffer); // notify/write: 3 bytes: flipFirstAndThirdByte(zero(2) ~ uint(11).as("powerLevelB") ~uint(11).as("powerLevelA")

  var powerA = dataView.getUint16(0) >> 3; // push the remainder of B out of the first 2 bytes

  var powerB = dataView.getUint16(1) & 2047; // push the remainder A out of the last 2 bytes

  return {
    powerA: powerA,
    powerB: powerB
  };
}
/**
 * @param {DataView} dataView
 * @return {[number, number, number]} ax ay az
 */

function parsePattern(dataView) {
  flipFirstAndThirdByte(dataView.buffer); // flipFirstAndThirdByte(zero(4) ~ uint(5).as("az") ~ uint(10).as("ay") ~ uint(5).as("ax"))
  // 0000zzzz | zyyyyyyy | yyyxxxxx

  var az = (dataView.getUint16(0) & 3968) >>> 7;
  var ay = (dataView.getUint16(0) & 127) << 3 | (dataView.getUint8(2) & 224) >>> 5;
  var ax = dataView.getUint8(2) & 31;
  return {
    pulseDuration: ax,
    pauseDuration: ay,
    amplitude: az
  };
}

function encodePattern(_ref2) {
  var pulseDuration = _ref2.pulseDuration,
      pauseDuration = _ref2.pauseDuration,
      amplitude = _ref2.amplitude;
  var buffer = new ArrayBuffer(3); // flipFirstAndThirdByte(zero(4) ~ uint(5).as("az") ~ uint(10).as("ay") ~ uint(5).as("ax"))
  // 0000zzzz | zyyyyyyy | yyyxxxxx

  var view = new DataView(buffer);
  view.setUint8(0, (amplitude & 30) >>> 1);
  view.setUint16(1, (amplitude & 1) << 15 | (pauseDuration & 1023) << 5 | pulseDuration & 31);
  flipFirstAndThirdByte(buffer);
  return buffer;
}

/**
 * Must be triggered via user intent.
 */
function pairDevice(_x, _x2, _x3) {
  return _pairDevice.apply(this, arguments);
}

function _pairDevice() {
  _pairDevice = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(batteryChangeCallback, powerChangedCallback, previousDeviceId) {
    var _bluetooth;

    var filters, previousDevices, previousDevice, device, server, service, config, configValue, maxPower, powerStep, powerCharacteristic, power, patternACharacteristic, patternBCharacteristic, patternA, patternB, untilA, untilB, battery, batteryLevelCharacteristic, batteryLevel, timerHandle, startTimer, stopTimer;
    return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            stopTimer = function _stopTimer() {
              clearInterval(timerHandle);
              timerHandle = undefined;
            };

            startTimer = function _startTimer() {
              if (timerHandle !== undefined) {
                return;
              }

              timerHandle = window.setInterval( /*#__PURE__*/(0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
                return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(untilA > Date.now())) {
                          _context.next = 3;
                          break;
                        }

                        _context.next = 3;
                        return patternACharacteristic.writeValue(encodePattern(patternA));

                      case 3:
                        if (!(untilB > Date.now())) {
                          _context.next = 6;
                          break;
                        }

                        _context.next = 6;
                        return patternACharacteristic.writeValue(encodePattern(patternB));

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })), 40);
            };

            filters = [{
              namePrefix: 'D-LAB'
            }];
            _context2.next = 5;
            return (_bluetooth = navigator.bluetooth) == null ? void 0 : _bluetooth.getDevices();

          case 5:
            previousDevices = _context2.sent;
            previousDevice = previousDevices == null ? void 0 : previousDevices.find(function (d) {
              return d.id === previousDeviceId;
            });
            _context2.t0 = previousDevice;

            if (_context2.t0) {
              _context2.next = 12;
              break;
            }

            _context2.next = 11;
            return navigator.bluetooth.requestDevice({
              filters: filters,
              optionalServices: [coyoteService, batteryService]
            });

          case 11:
            _context2.t0 = _context2.sent;

          case 12:
            device = _context2.t0;
            console.log('Connecting to GATT Server...');
            _context2.next = 16;
            return device.gatt.connect();

          case 16:
            server = _context2.sent;
            console.log('Getting Coyote Service...');
            _context2.next = 20;
            return server.getPrimaryService(coyoteService);

          case 20:
            service = _context2.sent;
            console.log('Getting ConfigMenu Characteristic...');
            _context2.next = 24;
            return service.getCharacteristic(configCharacteristic);

          case 24:
            config = _context2.sent;
            console.log('Reading ConfigMenu Characteristic...'); // read: 3 bytes: flipFirstAndThirdByte(skip(5) ~ uint(11).as("maxPower") ~ uint8.as("powerStep"))

            _context2.next = 28;
            return config.readValue();

          case 28:
            configValue = _context2.sent;
            flipFirstAndThirdByte(configValue.buffer);
            maxPower = configValue.getUint16(0);
            powerStep = configValue.getUint8(2);
            _context2.next = 34;
            return service.getCharacteristic(POWER_CHARACTERISTIC);

          case 34:
            powerCharacteristic = _context2.sent;
            console.log('Read Power value...');
            _context2.t1 = parsePower;
            _context2.next = 39;
            return powerCharacteristic.readValue();

          case 39:
            _context2.t2 = _context2.sent;
            power = (0, _context2.t1)(_context2.t2);

            if (!powerChangedCallback) {
              _context2.next = 46;
              break;
            }

            console.log('Subscribing to Power value...');
            powerCharacteristic.addEventListener('characteristicvaluechanged', function (event) {
              var currentPower = parsePower(powerCharacteristic.value);
              powerChangedCallback(currentPower);
            });
            _context2.next = 46;
            return powerCharacteristic.startNotifications();

          case 46:
            _context2.next = 48;
            return service.getCharacteristic(PATTERN_A_CHARACTERISTIC);

          case 48:
            patternACharacteristic = _context2.sent;
            _context2.next = 51;
            return service.getCharacteristic(PATTERN_B_CHARACTERISTIC);

          case 51:
            patternBCharacteristic = _context2.sent;
            _context2.t3 = parsePattern;
            _context2.next = 55;
            return patternACharacteristic.readValue();

          case 55:
            _context2.t4 = _context2.sent;
            patternA = (0, _context2.t3)(_context2.t4);
            _context2.t5 = parsePattern;
            _context2.next = 60;
            return patternBCharacteristic.readValue();

          case 60:
            _context2.t6 = _context2.sent;
            patternB = (0, _context2.t5)(_context2.t6);
            untilA = -1;
            untilB = -1;
            console.log('Getting Battery Service...');
            _context2.next = 67;
            return server.getPrimaryService(batteryService);

          case 67:
            battery = _context2.sent;
            console.log('Getting Battery Level Characteristic...');
            _context2.next = 71;
            return battery.getCharacteristic(batteryCharacteristic);

          case 71:
            batteryLevelCharacteristic = _context2.sent;
            _context2.next = 74;
            return batteryLevelCharacteristic.readValue();

          case 74:
            batteryLevel = _context2.sent.getUint8(0);

            if (batteryChangeCallback) {
              batteryLevelCharacteristic.addEventListener('characteristicvaluechanged', function (e) {
                var currentBatteryLevel = batteryLevelCharacteristic.value.getUint8(0);
                batteryChangeCallback(currentBatteryLevel);
              });
            }

            console.log('Connected to coyote!');
            return _context2.abrupt("return", [{
              maxPower: maxPower,
              power: power,
              powerStep: powerStep,
              patternA: patternA,
              patternB: patternB,
              batteryLevel: batteryLevel
            }, {
              id: device.id,
              writePower: function writePower(powerLevels) {
                return powerCharacteristic.writeValue(encodePower(powerLevels));
              },
              writePatternA: function writePatternA(pattern, duration) {
                patternA = pattern;
                untilA = Date.now() + duration;
                startTimer();
                return Promise.resolve();
              },
              writePatternB: function writePatternB(pattern, duration) {
                patternB = pattern;
                untilB = Date.now() + duration;
                startTimer();
                return Promise.resolve();
              },
              stop: function stop() {
                stopTimer();
                return powerCharacteristic.writeValue(encodePower({
                  powerA: 0,
                  powerB: 0
                }));
              }
            }]);

          case 78:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _pairDevice.apply(this, arguments);
}

/***/ }),

/***/ 66185:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cursor": () => (/* binding */ Cursor)
/* harmony export */ });
/* harmony import */ var _Cursor_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95748);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2784);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49663);
var _jsxFileName = "/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/app/Cursor.tsx",
    _this = undefined;





function calculateStyle(size, position) {
  return {
    top: position.y - size / 2,
    left: position.x - size / 2,
    width: size,
    height: size
  };
}

var Cursor = function Cursor(_ref) {
  var position = _ref.position,
      size = _ref.size,
      hint = _ref.hint;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
    className: "cursor",
    "data-hint": hint,
    style: calculateStyle(size, position),
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
      className: "lds-ripple",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 7
      }, _this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 5
    }, _this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 23,
    columnNumber: 3
  }, _this);
};

/***/ }),

/***/ 81063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainComponent": () => (/* binding */ MainComponent)
/* harmony export */ });
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37930);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36073);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34795);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9249);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(87371);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(80753);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(45754);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11987);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(95058);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(77162);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(59840);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2784);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(56130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(36076);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(20114);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(39369);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(36871);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(35120);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(47697);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(77984);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(11348);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(12335);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(26469);
/* harmony import */ var _Cursor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(66185);
/* harmony import */ var _MainComponent_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(26595);
/* harmony import */ var _Coyote__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(63047);
/* harmony import */ var _ConfigMenu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(67629);
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(94775);
/* harmony import */ var _censorImage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(52563);
/* harmony import */ var _xtoys__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(82257);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(49663);









var _jsxFileName = "/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/app/MainComponent.tsx";


function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_8__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }













var DEFAULT_STATE = Object.assign({}, _Settings__WEBPACK_IMPORTED_MODULE_16__.DEFAULT_SETTINGS, {
  slides: [],
  currentSlide: 0,
  currentSlideData: [],
  cursorPosition: {
    x: -1000,
    y: -1000
  },
  stats: {
    points: 0,
    failures: 0
  },
  phase: 'SETUP',
  pauseUntil: 0
});
var MainComponent = /*#__PURE__*/function (_Component) {
  (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_6__["default"])(MainComponent, _Component);

  var _super = _createSuper(MainComponent);

  function MainComponent(props) {
    var _this;

    (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this, MainComponent);

    _this = _super.call(this, props);
    _this.gazeHits$ = new rxjs__WEBPACK_IMPORTED_MODULE_20__.BehaviorSubject(undefined);
    _this.eyesTracked$ = new rxjs__WEBPACK_IMPORTED_MODULE_20__.BehaviorSubject(false);
    _this.presence$ = new rxjs__WEBPACK_IMPORTED_MODULE_20__.BehaviorSubject(false);
    _this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_21__.Subject();
    _this.slideChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_20__.BehaviorSubject(undefined);
    _this.xtoys = void 0;
    _this.tobiiWs = void 0;
    _this.coyoteDevice = void 0;
    _this.tobiiScreenWidth = window.screen.width;
    _this.tobiiScreenHeight = window.screen.height;
    _this.renderPane = void 0;
    _this.audioDing = void 0;
    _this.audioMistake = void 0;
    _this.model = undefined;
    _this.state = DEFAULT_STATE;
    _this.startCoyote = _this.startCoyote.bind((0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_this));
    _this.forgetCoyote = _this.forgetCoyote.bind((0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_this));
    _this.handlePurifyFileSelection = _this.handlePurifyFileSelection.bind((0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_this));
    _this.nextSlide = _this.nextSlide.bind((0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_this));
    _this.handleMouseMoveOnPane = _this.handleMouseMoveOnPane.bind((0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_this));
    _this.renderPane = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_11__.createRef)();
    _this.audioDing = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_11__.createRef)();
    _this.audioMistake = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_11__.createRef)();
    return _this;
  }

  (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_4__["default"])(MainComponent, [{
    key: "forgetCoyote",
    value: function forgetCoyote() {
      this.setState(function (prev) {
        return Object.assign({}, prev, {
          coyote: Object.assign({}, prev.coyote, {
            pairedDeviceId: undefined
          })
        });
      });
    }
  }, {
    key: "startCoyote",
    value: function () {
      var _startCoyote = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee() {
        var _yield$pairDevice, _yield$pairDevice2, coyoteState, coyoteDevice;

        return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0,_Coyote__WEBPACK_IMPORTED_MODULE_14__.pairDevice)(function (level) {
                  console.info("Coyote at battery-level ".concat(level));
                }, function (_ref) {
                  var powerA = _ref.powerA,
                      powerB = _ref.powerB;
                  return console.info("Coyote at power-level a:".concat(powerA, " ").concat(powerB, ")"));
                }, this.state.coyote.pairedDeviceId);

              case 2:
                _yield$pairDevice = _context.sent;
                _yield$pairDevice2 = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_yield$pairDevice, 2);
                coyoteState = _yield$pairDevice2[0];
                coyoteDevice = _yield$pairDevice2[1];
                this.setState(function (prev) {
                  return Object.assign({}, prev, {
                    coyote: Object.assign({}, prev.coyote, {
                      pairedDeviceId: coyoteDevice.id
                    })
                  });
                });
                this.coyoteDevice = coyoteDevice;
                _context.next = 10;
                return this.coyoteDevice.writePower({
                  powerA: this.state.coyote.powerLevel,
                  powerB: 7
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function startCoyote() {
        return _startCoyote.apply(this, arguments);
      }

      return startCoyote;
    }()
  }, {
    key: "startWebGazer",
    value: function startWebGazer() {
      alert('FIXME: startWebGazer()'); //TODO: fixme

      /*webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null) {
          return;
        }
        var xprediction = data.x; //these x coordinates are relative to the viewport
        var yprediction = data.y; //these y coordinates are relative to the viewport
        console.log(elapsedTime); //elapsed time is based on time since begin was called
      }).begin();
      */
    }
  }, {
    key: "startTobii",
    value: function startTobii() {
      var _this2 = this;

      if (!this.state.tobii.use || this.state.tobii.server) {
        return;
      }

      var ws = new WebSocket(this.state.tobii.server, ['Tobii.Interaction']);

      ws.onmessage = function (m) {
        var parsed = JSON.parse(m.data);

        if (parsed.type === 'state') {
          _this2.tobiiScreenWidth = parsed.data.screenBounds.Width;
          _this2.tobiiScreenHeight = parsed.data.screenBounds.Height;

          if (parsed.data.userPresence !== 'Unknown') {
            _this2.presence$.next(parsed.data.userPresence === 'Present');
          }
        } else if (parsed.type === 'gazePoint') {
          var gaze = parsed.data;
          var cutHeight = window.outerHeight - window.innerHeight;
          var cutWidth = window.outerWidth - window.innerWidth;
          var clientPoint = {
            x: gaze.X * window.screen.width / _this2.tobiiScreenWidth - window.screenX - cutWidth,
            y: gaze.Y * window.screen.height / _this2.tobiiScreenHeight - window.screenY - cutHeight
          };

          _this2.moveToClient(clientPoint);
        } else if (parsed.type === 'eyePosition') {
          var eyePosition = parsed.data;

          _this2.eyesTracked$.next(eyePosition.HasLeftEyePosition && eyePosition.HasRightEyePosition);
        }
      };

      ws.onopen = function () {
        ws.send('state');
        ws.send('startGazePoint'); //ws.send('startEyePosition');
      };

      this.tobiiWs = ws;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.gazeHits$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_22__.takeUntil)(this.destroy$), (0,rxjs__WEBPACK_IMPORTED_MODULE_23__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_24__.throttle)(function () {
        var delayUntil = Math.max(0, _this3.state.pauseUntil - Date.now());
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_25__.of)().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_26__.delay)(delayUntil));
      }, {
        leading: true,
        trailing: true
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_27__.map)(function (detection) {
        if (!detection) return undefined;

        var region = _this3.detectionToRegionType(detection);

        if (region && detection) {
          var _this3$xtoys;

          (_this3$xtoys = _this3.xtoys) == null ? void 0 : _this3$xtoys.sendXToys({
            type: 'lookAt',
            region: region,
            detection: detection
          });
        }

        return region;
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_28__.tap)(function (regionType) {
        var _this3$renderPane, _this3$renderPane$cur, _this3$xtoys2, _this3$xtoys3;

        void ((_this3$renderPane = _this3.renderPane) == null ? void 0 : (_this3$renderPane$cur = _this3$renderPane.current) == null ? void 0 : _this3$renderPane$cur.offsetWidth);

        switch (regionType) {
          case 'FOCUS':
            _this3.renderPane.current.dataset.region = 'FOCUS';

            _this3.teaseShock();

            break;

          case 'HARD_PUNISH':
            _this3.renderPane.current.dataset.region = 'HARD_PUNISH';

            _this3.punishShock();

            (_this3$xtoys2 = _this3.xtoys) == null ? void 0 : _this3$xtoys2.sendXToys({
              type: 'punish',
              severity: 'hard'
            });
            break;

          case 'SOFT_PUNISH':
            _this3.renderPane.current.dataset.region = 'SOFT_PUNISH';

            _this3.punishShock();

            (_this3$xtoys3 = _this3.xtoys) == null ? void 0 : _this3$xtoys3.sendXToys({
              type: 'punish',
              severity: 'soft'
            });
            break;

          default:
            if (_this3.renderPane.current) {
              _this3.renderPane.current.dataset.region = '';
            }

        }
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_29__.switchMap)(function (zone) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_25__.of)(zone).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_26__.delay)(zone === 'FOCUS' ? _this3.state.rules.focusDuration * 1000 : 200));
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_28__.tap)(function (regionType) {
        if (_this3.renderPane.current) {
          _this3.renderPane.current.dataset.region = '';
        }
      }), // not entirely sure why this is needed, avoids double submits
      (0,rxjs__WEBPACK_IMPORTED_MODULE_30__.throttleTime)(100)).subscribe(function (regionType) {
        switch (regionType) {
          case 'FOCUS':
            if (_this3.state.rules.playSounds) {
              if (_this3.audioDing.current) {
                _this3.audioDing.current.currentTime = 0;

                _this3.audioDing.current.play();
              }
            }

            _this3.nextSlide(false);

            break;

          case undefined:
            break;

          default:
            _this3.punish(regionType);

        }

        return;
      });
    }
  }, {
    key: "teaseShock",
    value: function () {
      var _teaseShock = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee2() {
        var _this$coyoteDevice;

        return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", (_this$coyoteDevice = this.coyoteDevice) == null ? void 0 : _this$coyoteDevice.writePatternA({
                  amplitude: 8,
                  pulseDuration: 20,
                  pauseDuration: 20
                }, 1000));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function teaseShock() {
        return _teaseShock.apply(this, arguments);
      }

      return teaseShock;
    }()
  }, {
    key: "punishShock",
    value: function punishShock() {
      var _this$coyoteDevice2;

      (_this$coyoteDevice2 = this.coyoteDevice) == null ? void 0 : _this$coyoteDevice2.writePatternA({
        amplitude: 30,
        pulseDuration: 12,
        pauseDuration: 150
      }, 200);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$xtoys;

      this.destroy$.next(undefined);

      if (this.tobiiWs) {
        this.tobiiWs.close();
      }

      (_this$xtoys = this.xtoys) == null ? void 0 : _this$xtoys.stop();
    }
  }, {
    key: "detectionToRegionType",
    value: function detectionToRegionType(name) {
      if (this.state.rules.regionMapping.FOCUS.some(function (e) {
        return e === name;
      })) {
        return 'FOCUS';
      }

      if (this.state.rules.regionMapping.HARD_PUNISH.some(function (e) {
        return e === name;
      })) {
        return 'HARD_PUNISH';
      }

      if (this.state.rules.regionMapping.SOFT_PUNISH.some(function (e) {
        return e === name;
      })) {
        return 'SOFT_PUNISH';
      }

      return undefined;
    }
  }, {
    key: "countHardPunishedZones",
    value: function countHardPunishedZones(meta) {
      var _this4 = this;

      return meta.output.detections.filter(function (detection) {
        return _this4.state.rules.regionMapping.HARD_PUNISH.includes(detection.name);
      }).length;
    }
  }, {
    key: "punish",
    value: function () {
      var _punish = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee3(level) {
        var _this5 = this;

        var _this$xtoys2, _this$audioMistake$cu, nextSlideIndex, currentSlideData;

        return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.state.xtoys.use) {
                  (_this$xtoys2 = this.xtoys) == null ? void 0 : _this$xtoys2.sendXToys({
                    type: "punish",
                    severity: level === 'SOFT_PUNISH' ? 'soft' : 'hard'
                  });
                }

                if (this.state.rules.playSounds) {
                  (_this$audioMistake$cu = this.audioMistake.current) == null ? void 0 : _this$audioMistake$cu.play();
                }

                if (!(level === 'HARD_PUNISH')) {
                  _context3.next = 11;
                  break;
                }

                nextSlideIndex = Math.max(0, this.state.currentSlide - 1);
                _context3.next = 6;
                return this.loadSlide(nextSlideIndex);

              case 6:
                currentSlideData = _context3.sent;
                this.setState(function () {
                  return {
                    stats: Object.assign({}, _this5.state.stats, {
                      points: _this5.state.stats.points - 10,
                      failures: _this5.state.stats.failures + 1
                    }),
                    currentSlide: nextSlideIndex,
                    currentSlideData: currentSlideData
                  };
                });
                this.setState(function () {
                  return {
                    pauseUntil: Date.now() + 1500
                  };
                });
                _context3.next = 12;
                break;

              case 11:
                if (level === 'SOFT_PUNISH') {
                  this.setState(function (prev) {
                    return Object.assign({}, prev, {
                      stats: Object.assign({}, prev.stats, {
                        points: prev.stats.points - 1
                      })
                    });
                  });
                }

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function punish(_x) {
        return _punish.apply(this, arguments);
      }

      return punish;
    }()
  }, {
    key: "loadSlide",
    value: function () {
      var _loadSlide = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee5(index) {
        var m, rules, images, imgToSlideData, _imgToSlideData;

        return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _imgToSlideData = function _imgToSlideData3() {
                  _imgToSlideData = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee4(img) {
                    var htmlImage, detections, censored;
                    return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.t0 = _censorImage__WEBPACK_IMPORTED_MODULE_17__.loadImage;
                            _context4.next = 3;
                            return (0,_censorImage__WEBPACK_IMPORTED_MODULE_17__.readAsDataUrl)(img);

                          case 3:
                            _context4.t1 = _context4.sent;
                            _context4.next = 6;
                            return (0, _context4.t0)(_context4.t1);

                          case 6:
                            htmlImage = _context4.sent;

                            if (!(typeof window.puryFiImageByBlob == 'function')) {
                              _context4.next = 13;
                              break;
                            }

                            _context4.next = 10;
                            return MainComponent.puryFiExtension(img);

                          case 10:
                            _context4.t2 = _context4.sent;
                            _context4.next = 16;
                            break;

                          case 13:
                            _context4.next = 15;
                            return (0,_model__WEBPACK_IMPORTED_MODULE_10__.processImage)(m, htmlImage);

                          case 15:
                            _context4.t2 = _context4.sent;

                          case 16:
                            detections = _context4.t2;
                            censored = (0,_censorImage__WEBPACK_IMPORTED_MODULE_17__.censorImage)(htmlImage, detections, function (region) {
                              return rules.regionMapping['HARD_PUNISH'].includes(region) || rules.regionMapping['SOFT_PUNISH'].includes(region);
                            });
                            _context4.t3 = img.name;
                            _context4.t4 = detections;
                            _context4.t5 = URL.createObjectURL(img);
                            _context4.next = 23;
                            return censored;

                          case 23:
                            _context4.t6 = _context4.sent;
                            _context4.t7 = htmlImage.naturalWidth;
                            _context4.t8 = htmlImage.naturalHeight;
                            return _context4.abrupt("return", {
                              name: _context4.t3,
                              detections: _context4.t4,
                              dataUrl: _context4.t5,
                              dataUrlCensored: _context4.t6,
                              naturalWidth: _context4.t7,
                              naturalHeight: _context4.t8
                            });

                          case 27:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return _imgToSlideData.apply(this, arguments);
                };

                imgToSlideData = function _imgToSlideData2(_x3) {
                  return _imgToSlideData.apply(this, arguments);
                };

                m = this.model; // TODO: fail if model is not loaded

                rules = this.state.rules;
                images = this.state.slides[index].images;
                return _context5.abrupt("return", Promise.all(images.map(imgToSlideData)));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadSlide(_x2) {
        return _loadSlide.apply(this, arguments);
      }

      return loadSlide;
    }()
  }, {
    key: "win",
    value: function () {
      var _win = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee6() {
        var _this$xtoys3;

        return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.setState(function () {
                  return {
                    phase: 'WON'
                  };
                });
                (_this$xtoys3 = this.xtoys) == null ? void 0 : _this$xtoys3.sendXToys({
                  "type": "won"
                });
                _context6.next = 4;
                return document.exitFullscreen();

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function win() {
        return _win.apply(this, arguments);
      }

      return win;
    }()
  }, {
    key: "nextSlide",
    value: function () {
      var _nextSlide = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee7(skipped) {
        var _this6 = this,
            _this$renderPane$curr,
            _this$renderPane$curr2,
            _this$renderPane$curr3;

        var nextSlideIndex, currentSlideData;
        return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                nextSlideIndex = this.state.currentSlide + 1;

                if (!(nextSlideIndex >= this.state.slides.length)) {
                  _context7.next = 5;
                  break;
                }

                _context7.next = 4;
                return this.win();

              case 4:
                return _context7.abrupt("return");

              case 5:
                _context7.next = 7;
                return this.loadSlide(nextSlideIndex);

              case 7:
                currentSlideData = _context7.sent;
                this.setState(function () {
                  return Object.assign({}, _this6.state, {
                    stats: Object.assign({}, _this6.state.stats, {
                      points: _this6.state.stats.points + (skipped ? -10 : 20)
                    }),
                    currentSlide: nextSlideIndex,
                    currentSlideData: currentSlideData
                  });
                });
                (_this$renderPane$curr = this.renderPane.current) == null ? void 0 : _this$renderPane$curr.classList.remove('fadein');
                void ((_this$renderPane$curr2 = this.renderPane.current) == null ? void 0 : _this$renderPane$curr2.offsetWidth);
                (_this$renderPane$curr3 = this.renderPane.current) == null ? void 0 : _this$renderPane$curr3.classList.add('fadein');
                this.setState(function () {
                  return {
                    pauseUntil: Date.now() + 1000
                  };
                });

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function nextSlide(_x4) {
        return _nextSlide.apply(this, arguments);
      }

      return nextSlide;
    }()
  }, {
    key: "handleMouseMoveOnPane",
    value: function handleMouseMoveOnPane(evt) {
      if (this.state.tobii.disableMouse) {
        return;
      }

      var nativeCoords = {
        x: evt.nativeEvent.clientX,
        y: evt.nativeEvent.clientY
      };
      this.moveToClient(nativeCoords);
    }
  }, {
    key: "sortByRelevance",
    value: function sortByRelevance(a, b) {
      return this.toPriority(a) - this.toPriority(b);
    }
  }, {
    key: "toPriority",
    value: function toPriority(dt) {
      if (this.state.rules.regionMapping.FOCUS.includes(dt)) return 0;
      if (this.state.rules.regionMapping.HARD_PUNISH.includes(dt)) return 1;
      if (this.state.rules.regionMapping.SOFT_PUNISH.includes(dt)) return 2;
      return 3;
    }
  }, {
    key: "moveToClient",
    value: function moveToClient(clientCoordinates) {
      var _this7 = this;

      var renderPane = this.renderPane.current; // TODO: fail if ot does not exist

      var imageCoords = renderPane.getBoundingClientRect();
      var p = {
        x: clientCoordinates.x - imageCoords.x,
        y: clientCoordinates.y - imageCoords.y
      };
      var rScaledToNaturalImageSize = {
        x: p.x * renderPane.naturalWidth / imageCoords.width,
        y: p.y * renderPane.naturalHeight / imageCoords.height
      };
      var tolerance = MainComponent.imageSize(renderPane) * 0.04;
      var hit = this.state.currentSlideData.map(function (imgData) {
        return {
          imgData: imgData,
          detection: imgData.detections.filter(function (detection) {
            return MainComponent.distance(MainComponent.purifyBoundingBoxToRectangle(detection.bounding_box, imgData.naturalWidth, imgData.naturalHeight), rScaledToNaturalImageSize) < tolerance;
          }) // pick the most relevant detection in case we are hitting multiple of them
          .sort(function (a, b) {
            return _this7.sortByRelevance(a.name, b.name);
          })[0]
        };
      }).filter(function (d) {
        return !!d.detection;
      })[0];

      if (hit) {
        // translate the zoom around the center of the detection
        var hitRect = MainComponent.purifyBoundingBoxToRectangle(hit.detection.bounding_box, hit.imgData.naturalWidth, hit.imgData.naturalHeight);
        var hitCenter = {
          x: hitRect.x + hitRect.width / 2,
          y: hitRect.y + hitRect.height / 2
        };
        renderPane.style.transformOrigin = "".concat(hitCenter.x, "px ").concat(hitCenter.y, "px");
      }

      this.gazeHits$.next(hit == null ? void 0 : hit.detection.name);
      this.setState(Object.assign({}, this.state, {
        cursorPosition: clientCoordinates,
        cursorHint: this.state.pauseUntil < Date.now() && hit != null && hit.detection.name ? this.detectionToRegionType(hit.detection.name) : undefined
      }));
    }
  }, {
    key: "handleAlternativePurifyFileSelection",
    value: function handleAlternativePurifyFileSelection(files) {
      var imageFiles = {
        FOCUS: files.FOCUS.filter(MainComponent.isImage),
        SOFT_PUNISH: files.SOFT_PUNISH.filter(MainComponent.isImage),
        HARD_PUNISH: files.HARD_PUNISH.filter(MainComponent.isImage)
      };
      var focusJsons = imageFiles.FOCUS.map(function (image) {
        return {
          output: {
            nsfw_score: 0.999,
            detections: [{
              bounding_box: [0, 0],
              confidence: 1,
              name: 'ARMPITS_EXPOSED'
            }]
          },
          file: image.name
        };
      });
    }
  }, {
    key: "handlePurifyFileSelection",
    value: function () {
      var _handlePurifyFileSelection = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee8(e) {
        var nativeFiles, allFiles, imageFiles;
        return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                nativeFiles = e.target.files;
                allFiles = Array.from(nativeFiles);
                imageFiles = allFiles.filter(MainComponent.isImage); // sort them by name

                imageFiles.sort(function (a, b) {
                  return a.name.localeCompare(b.name);
                });
                this.setState(function () {
                  return {
                    slides: imageFiles.map(function (f) {
                      return {
                        images: [f]
                      };
                    })
                  };
                });

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function handlePurifyFileSelection(_x5) {
        return _handlePurifyFileSelection.apply(this, arguments);
      }

      return handlePurifyFileSelection;
    }()
  }, {
    key: "imagesWithFocusRegions",
    value: function imagesWithFocusRegions(images) {
      var _this8 = this;

      return images.filter(function (file) {
        return file.detections.some( // image must have at least one zone to continue
        function (detection) {
          return _this8.detectionToRegionType(detection.name) === 'FOCUS';
        });
      });
    }
  }, {
    key: "startGame",
    value: function () {
      var _startGame = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().mark(function _callee9() {
        var gallery, i, j, _ref2, voice;

        return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_9___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.state.rules.shuffleGallery) {
                  gallery = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.state.slides);

                  for (i = gallery.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    _ref2 = [gallery[j], gallery[i]];
                    gallery[i] = _ref2[0];
                    gallery[j] = _ref2[1];
                  }

                  this.setState(function () {
                    return {
                      slides: gallery
                    };
                  });
                }

                localStorage.setItem('tobii', JSON.stringify(this.state.tobii));

                if (this.state.tobii.use) {
                  this.startTobii();
                }

                localStorage.setItem('xtoys', JSON.stringify(this.state.xtoys));

                if (this.state.xtoys.use) {
                  if (!this.xtoys) {
                    this.xtoys = new _xtoys__WEBPACK_IMPORTED_MODULE_18__.XToysClient(this.state.xtoys);
                  }

                  this.xtoys.start();
                }

                localStorage.setItem('tts', JSON.stringify(this.state.tts));

                if (this.state.tts.use) {
                  voice = window.speechSynthesis.getVoices().filter(function (v) {
                    return v.localService;
                  })[0]; // TODO: start TTS
                  // window.speechSynthesis.speak(utterance);
                }

                localStorage.setItem('coyote', JSON.stringify(this.state.coyote));
                localStorage.setItem('rules', JSON.stringify(this.state.rules));

                if (!(this.model === undefined && !window.puryFiImageByBlob)) {
                  _context9.next = 14;
                  break;
                }

                console.info('loading nsfw model');
                _context9.next = 13;
                return (0,_model__WEBPACK_IMPORTED_MODULE_10__.loadmodel)(this.state.modelUrl);

              case 13:
                this.model = _context9.sent;

              case 14:
                this.setState(function () {
                  return {
                    phase: 'INGAME',
                    pauseUntil: Date.now() + 1000
                  };
                });

                if (!this.state.rules.fullscreen) {
                  _context9.next = 18;
                  break;
                }

                _context9.next = 18;
                return document.getElementsByClassName('app')[0].requestFullscreen({
                  navigationUI: 'hide'
                });

              case 18:
                _context9.next = 20;
                return this.nextSlide(false);

              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function startGame() {
        return _startGame.apply(this, arguments);
      }

      return startGame;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("div", {
        className: "app",
        children: [this.state.phase === 'INGAME' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("header", {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("h5", {
            children: ["Points: ", this.state.stats.points, ' ', this.state.rules.allowSkipImage && this.state.slides.length > 0 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("button", {
              onClick: function onClick() {
                return _this9.nextSlide(true);
              },
              children: "Skip Image"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 670,
              columnNumber: 17
            }, this) : '']
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 666,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 665,
          columnNumber: 11
        }, this) : '', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("main", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("audio", {
            src: "assets/ding.mp3",
            ref: this.audioDing,
            autoPlay: false,
            preload: this.state.rules.playSounds ? 'auto' : 'none'
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 680,
            columnNumber: 11
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("audio", {
            src: "assets/beep-03.mp3",
            ref: this.audioMistake,
            autoPlay: false,
            preload: this.state.rules.playSounds ? 'auto' : 'none'
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 686,
            columnNumber: 11
          }, this), this.state.phase === 'SETUP' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("div", {
            className: "flex",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)(_ConfigMenu__WEBPACK_IMPORTED_MODULE_15__.ConfigMenu, {
              settings: this.state,
              onSettingsChanged: function onSettingsChanged(settings) {
                console.log(settings);

                _this9.setState(function () {
                  return settings;
                });
              },
              handleFileSelection: this.handlePurifyFileSelection,
              onSelectCoyoteDeviceClicked: this.startCoyote,
              onForgetCoyoteDeviceClicked: this.forgetCoyote,
              handleAlternativeSelection: this.handleAlternativePurifyFileSelection
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 695,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 694,
            columnNumber: 13
          }, this) : '', this.state.slides.length > 0 && this.state.phase === 'SETUP' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("button", {
            onClick: function onClick() {
              return _this9.startGame();
            },
            children: ["Start here (", this.state.slides.length, " slides)!"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 714,
            columnNumber: 13
          }, this) : '', this.state.phase === 'WON' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("h1", {
            className: "won",
            children: ["You made it! Your score: ", this.state.stats.points, ". Hit reload to start over."]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 722,
            columnNumber: 13
          }, this) : this.state.phase === 'INGAME' ? '' : '', this.state.phase !== 'WON' ?
          /*#__PURE__*/
          // must be present in order to bind renderPane in ctor
          (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("div", {
            className: "renderContainer",
            children: this.state.currentSlideData.map(function (slideData, index) {
              return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("div", {
                children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)("img", {
                  ref: _this9.renderPane,
                  alt: "Current Slide",
                  src: slideData.dataUrlCensored,
                  "data-imagename": slideData.name,
                  draggable: false,
                  onMouseMove: _this9.handleMouseMoveOnPane,
                  className: "".concat(_this9.state.rules.softFilter, " renderPane"),
                  style: {
                    transitionDuration: "".concat(_this9.state.rules.focusDuration, "s")
                  }
                }, "".concat(slideData.name).concat(index), false, {
                  fileName: _jsxFileName,
                  lineNumber: 736,
                  columnNumber: 19
                }, _this9)
              }, "".concat(slideData.name).concat(index), false, {
                fileName: _jsxFileName,
                lineNumber: 735,
                columnNumber: 17
              }, _this9);
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 733,
            columnNumber: 13
          }, this) : [], this.state.rules.showGaze && this.state.phase == 'INGAME' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxDEV)(_Cursor__WEBPACK_IMPORTED_MODULE_12__.Cursor, {
            size: 200,
            position: this.state.cursorPosition,
            hint: this.state.cursorHint
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 757,
            columnNumber: 13
          }, this) : '']
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 679,
          columnNumber: 9
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 663,
        columnNumber: 7
      }, this);
    }
  }], [{
    key: "puryFiExtension",
    value: function puryFiExtension(blob) {
      return new Promise(function (resolve, reject) {
        window.puryFiImageByBlob(blob, function (ret) {
          resolve((0,_model__WEBPACK_IMPORTED_MODULE_10__.toPurifyDetections)(ret));
        });
      });
    }
  }, {
    key: "imageSize",
    value: function imageSize(element) {
      return Math.max(element.naturalWidth, element.naturalHeight);
    }
  }, {
    key: "distance",
    value: function distance(r, p) {
      var cx = Math.max(Math.min(p.x, r.x + r.width), r.x);
      var cy = Math.max(Math.min(p.y, r.y + r.height), r.y);
      return Math.sqrt((p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy));
    }
  }, {
    key: "purifyBoundingBoxToRectangle",
    value: function purifyBoundingBoxToRectangle(boundingBox, naturalWidth, naturalHeight) {
      return new DOMRect(boundingBox[0] * naturalWidth, boundingBox[1] * naturalHeight, (boundingBox[2] - boundingBox[0]) * naturalWidth, (boundingBox[3] - boundingBox[1]) * naturalHeight);
    }
  }, {
    key: "isImage",
    value: function isImage(f) {
      return f.type === 'image/jpeg' || f.type === 'image/png' || f.type === 'image/webp';
    }
  }]);

  return MainComponent;
}(react__WEBPACK_IMPORTED_MODULE_11__.Component);

/***/ }),

/***/ 94775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_SETTINGS": () => (/* binding */ DEFAULT_SETTINGS)
/* harmony export */ });
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13358);

var DEFAULT_SETTINGS = {
  tts: {
    use: false
  },
  modelUrl: "./assets/web_model/model.json",
  xtoys: Object.assign({
    use: false,
    websocket: '',
    token: ''
  }, JSON.parse(localStorage.getItem('xtoys') || '{}')),
  rules: Object.assign({}, _rules__WEBPACK_IMPORTED_MODULE_0__.defaultRules, JSON.parse(localStorage.getItem('rules') || '{}')),
  webgazer: Object.assign({
    use: false
  }, JSON.parse(localStorage.getItem('webgazer') || '{}')),
  tobii: Object.assign({
    use: false,
    disableMouse: false,
    server: 'ws://localhost:8887'
  }, JSON.parse(localStorage.getItem('tobii') || '{}')),
  coyote: Object.assign({
    use: false,
    powerLevel: 0
  }, JSON.parse(localStorage.getItem('coyote') || '{}'))
};

/***/ }),

/***/ 13761:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33988);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2784);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MainComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(81063);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49663);
var _jsxFileName = "/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/app/app.tsx",
    _this = undefined;





var App = function App() {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_MainComponent__WEBPACK_IMPORTED_MODULE_2__.MainComponent, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 10
  }, _this);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ 52563:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "censorImage": () => (/* binding */ censorImage),
/* harmony export */   "loadImage": () => (/* binding */ loadImage),
/* harmony export */   "readAsDataUrl": () => (/* binding */ readAsDataUrl)
/* harmony export */ });
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34795);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77162);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__);



function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function readAsDataUrl(file) {
  return new Promise(function (resolve, reject) {
    var fr = new FileReader();
    fr.onerror = reject;

    fr.onload = function () {
      resolve(fr.result);
    };

    fr.readAsDataURL(file);
  });
}
function loadImage(dataUrl) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = dataUrl;

    img.onload = function () {
      return resolve(img);
    };

    img.onerror = reject;
  });
}

function blurRectangle(ctx, h, w, blur, color) {
  ctx.fillStyle = color;
  ctx.shadowBlur = blur;
  ctx.shadowColor = color;
  ctx.shadowOffsetX = w;
  ctx.shadowOffsetY = h;
  ctx.fillRect(-w + blur, -h + blur, w - blur * 2, h - blur * 2);
}

function censorImage(_x, _x2, _x3) {
  return _censorImage.apply(this, arguments);
}

function _censorImage() {
  _censorImage = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(img, detections, censorRegionDecider) {
    var canvas, ctx, censorTargets, numberFormat, _iterator, _step, ct, x, y, width, height;

    return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            censorTargets = detections.filter(function (d) {
              return censorRegionDecider ? censorRegionDecider(d.name) : true;
            });
            ctx.strokeStyle = '#fff';
            ctx.fillStyle = '#fff';
            numberFormat = new Intl.NumberFormat('en-GB', {
              maximumSignificantDigits: 2
            });
            _iterator = _createForOfIteratorHelper(censorTargets);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                ct = _step.value;
                // draw shape
                // ctx.fillStyle = "#F008";
                x = ct.bounding_box[0] * canvas.width;
                y = ct.bounding_box[1] * canvas.height;
                width = ct.bounding_box[2] * canvas.width - x;
                height = ct.bounding_box[3] * canvas.height - y;
                ctx.strokeRect(x, y, width, height);
                ctx.filter = 'blur(20px)';
                ctx.drawImage(canvas, x, y, width, height, x, y, width, height);
                ctx.filter = 'none';
                ctx.font = '48px';
                ctx.fillText("".concat(ct.name, " (").concat(numberFormat.format(ct.confidence), ")"), x + 2, y + 12);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context.abrupt("return", canvas.toDataURL('image/png'));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _censorImage.apply(this, arguments);
}

/***/ }),

/***/ 88435:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadDemoImages": () => (/* binding */ loadDemoImages)
/* harmony export */ });
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34795);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77162);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__);


function loadDemoImages() {
  return _loadDemoImages.apply(this, arguments);
}

function _loadDemoImages() {
  _loadDemoImages = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var womanJpgFetch, manJpgFetch, woman, man, files;
    return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            womanJpgFetch = fetch('assets/demo/woman.jpg');
            manJpgFetch = fetch('assets/demo/man.jpg');
            _context.next = 4;
            return womanJpgFetch;

          case 4:
            woman = _context.sent;
            _context.next = 7;
            return manJpgFetch;

          case 7:
            man = _context.sent;
            _context.t0 = File;
            _context.next = 11;
            return woman.blob();

          case 11:
            _context.t1 = _context.sent;
            _context.t2 = [_context.t1];
            _context.t3 = {};
            _context.t4 = new _context.t0(_context.t2, 'woman.jpg', _context.t3);
            _context.t5 = File;
            _context.next = 18;
            return man.blob();

          case 18:
            _context.t6 = _context.sent;
            _context.t7 = [_context.t6];
            _context.t8 = {};
            _context.t9 = new _context.t5(_context.t7, 'man.jpg', _context.t8);
            files = [_context.t4, _context.t9];
            return _context.abrupt("return", {
              imageFiles: files,
              jsonFiles: {
                'man.jpg': {
                  output: {
                    nsfw_score: 1,
                    detections: [{
                      bounding_box: [185, 275, 225, 310],
                      confidence: 1.0,
                      name: 'FACE_MALE'
                    }, {
                      bounding_box: [262, 257, 285, 335],
                      confidence: 1.0,
                      name: 'MALE_BREAST_EXPOSED'
                    }, {
                      bounding_box: [368, 280, 400, 320],
                      confidence: 1.0,
                      name: 'MALE_GENITALIA_EXPOSED'
                    }]
                  },
                  file: 'man.jpg'
                },
                'woman.jpg': {
                  output: {
                    nsfw_score: 1,
                    detections: [{
                      bounding_box: [288, 546, 368, 625],
                      confidence: 1.0,
                      name: 'FACE_FEMALE'
                    }, {
                      bounding_box: [447.0, 512.0, 514.0, 680.0],
                      confidence: 1.0,
                      name: 'FEMALE_BREAST_EXPOSED'
                    }, {
                      bounding_box: [670.0, 562.0, 730.0, 626.0],
                      confidence: 1.0,
                      name: 'FEMALE_GENITALIA_EXPOSED'
                    }, {
                      bounding_box: [550.0, 540.0, 645.0, 664.0],
                      confidence: 1.0,
                      name: 'BELLY_EXPOSED'
                    }]
                  },
                  file: 'woman.jpg'
                }
              }
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadDemoImages.apply(this, arguments);
}

/***/ }),

/***/ 59840:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadmodel": () => (/* binding */ loadmodel),
/* harmony export */   "modelHeight": () => (/* binding */ modelHeight),
/* harmony export */   "modelWeight": () => (/* binding */ modelWeight),
/* harmony export */   "processImage": () => (/* binding */ processImage),
/* harmony export */   "toPurifyDetections": () => (/* binding */ toPurifyDetections)
/* harmony export */ });
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36073);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34795);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77162);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39517);




var modelWeight = 320,
    modelHeight = 320;

function loadmodel(_x) {
  return _loadmodel.apply(this, arguments);
}

function _loadmodel() {
  _loadmodel = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(modelUrl) {
    return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.info('loading model');
            _context.next = 3;
            return _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_3__.loadGraphModel(modelUrl);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadmodel.apply(this, arguments);
}

var names = ['BELLY_EXPOSED', 'BELLY_COVERED', 'BUTTOCKS_EXPOSED', 'BUTTOCKS_COVERED', 'FEMALE_BREAST_EXPOSED', 'FEMALE_BREAST_COVERED', 'FEMALE_GENITALIA_EXPOSED', 'FEMALE_GENITALIA_COVERED', 'MALE_GENITALIA_COVERED', 'MALE_GENITALIA_EXPOSED', 'MALE_BREAST_EXPOSED', 'MALE_BREAST_COVERED', 'FACE_FEMALE', 'FACE_MALE', 'FEET_COVERED', 'FEET_EXPOSED', 'ARMPITS_COVERED', 'ARMPITS_EXPOSED', 'ANUS_COVERED', 'ANUS_EXPOSED'];
/**
 * x1, y1, x2, y2
 */

function toPurifyDetections(data) {
  var valid_detections_count = data.valid_detections[0];
  var classes = data.classes.slice(0, valid_detections_count);
  var boxes = data.boxes;
  var scores = data.scores.slice(0, valid_detections_count);
  return Array.from(scores).map(function (e, i) {
    return {
      bounding_box: Array.from(boxes.slice(i * 4, (i + 1) * 4)),
      name: names[classes[i]],
      confidence: e
    };
  });
}
function processImage(_x2, _x3) {
  return _processImage.apply(this, arguments);
}

function _processImage() {
  _processImage = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(model, pixels) {
    var tfObj, input, inputDiv, expandDims, res, _ref, _ref2, boxes_res, scores_res, classes_res, valid_detections_res, valid_detections_count, classes, boxes, scores;

    return _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tfObj = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_3__.browser.fromPixels(pixels);
            input = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_3__.image.resizeBilinear(tfObj, [modelWeight, modelHeight]);
            inputDiv = input.div(255);
            expandDims = inputDiv.expandDims(0);
            _context2.next = 6;
            return model.executeAsync(expandDims);

          case 6:
            res = _context2.sent;
            _ref = res, _ref2 = (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 4), boxes_res = _ref2[0], scores_res = _ref2[1], classes_res = _ref2[2], valid_detections_res = _ref2[3];
            valid_detections_count = valid_detections_res.dataSync()[0];
            classes = classes_res.dataSync().slice(0, valid_detections_count);
            boxes = boxes_res.dataSync();
            scores = scores_res.dataSync().slice(0, valid_detections_count);
            boxes_res.dispose();
            scores_res.dispose();
            classes_res.dispose();
            valid_detections_res.dispose();
            tfObj.dispose();
            input.dispose();
            inputDiv.dispose();
            expandDims.dispose();
            return _context2.abrupt("return", Array.from(scores).map(function (e, i) {
              return {
                bounding_box: Array.from(boxes.slice(i * 4, (i + 1) * 4)),
                name: names[classes[i]],
                confidence: e
              };
            }));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _processImage.apply(this, arguments);
}

/***/ }),

/***/ 13358:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultRules": () => (/* binding */ defaultRules)
/* harmony export */ });
var defaultRules = {
  focusDuration: 2,
  regionMapping: {
    FOCUS: ['FACE_FEMALE', 'FACE_MALE'],
    SOFT_PUNISH: ['FEMALE_BREAST_COVERED', 'FEMALE_GENITALIA_COVERED', 'MALE_BREAST_EXPOSED', 'BUTTOCKS_EXPOSED'],
    HARD_PUNISH: ['MALE_GENITALIA_EXPOSED', 'FEMALE_BREAST_EXPOSED', 'FEMALE_GENITALIA_EXPOSED', 'ANUS_EXPOSED']
  },
  showGaze: true,
  allowSkipImage: true,
  softFilter: 'saturate',
  playSounds: true,
  fullscreen: false,
  shuffleGallery: false
};

/***/ }),

/***/ 82257:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XToysClient": () => (/* binding */ XToysClient)
/* harmony export */ });
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9249);
/* harmony import */ var _home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87371);


var XToysClient = /*#__PURE__*/function () {
  function XToysClient(config) {
    (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, XToysClient);

    this.config = config;
    this.ws = void 0;
  }

  (0,_home_runner_work_gentlemans_gallery_gentlemans_gallery_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["default"])(XToysClient, [{
    key: "sendXToys",
    value: function sendXToys(evt) {
      var _this$ws;

      (_this$ws = this.ws) == null ? void 0 : _this$ws.send(JSON.stringify(evt));
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this$ws2;

      (_this$ws2 = this.ws) == null ? void 0 : _this$ws2.close(1001, "Going Away");
    }
  }, {
    key: "start",
    value: function start() {
      this.ws = new WebSocket("wss://webhook.xtoys.app/".concat(this.config.websocket, "?token=").concat(this.config.token));

      this.ws.onopen = function () {
        console.info('YAY, connected to xtoys');
      };

      this.ws.onmessage = function (m) {
        console.info('message from xtoys:', JSON.parse(m.data));
      };
    }
  }]);

  return XToysClient;
}();

/***/ }),

/***/ 61871:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2784);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17029);
/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13761);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49663);
var _jsxFileName = "/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/main.tsx";





var rootNode = document.getElementById('root');
var root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(rootNode);
root.render( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, {
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_app_app__WEBPACK_IMPORTED_MODULE_2__["default"], {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 25
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 10,
  columnNumber: 13
}, undefined));

/***/ }),

/***/ 18676:
/***/ ((module) => {

module.exports = [[module.id, "div.setupForms {\n  max-width: 600px;\n}\n", '', {"version":3,"sources":["/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/app/ConfigMenu.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;AAClB","sourcesContent":["div.setupForms {\n  max-width: 600px;\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ 46549:
/***/ ((module) => {

module.exports = [[module.id, ".cursor {\n  position: fixed;\n  padding: 0px;\n  margin: 0px;\n  pointer-events: none;\n  z-index: 999;\n}\n\n.lds-ripple {\n  display: inline-block;\n  position: relative;\n  width: 200px;\n  height: 200px;\n}\n\n.lds-ripple div {\n  position: absolute;\n  border: 6px solid #fff;\n  opacity: 1;\n  border-radius: 50%;\n}\n\n.lds-ripple div:first-child {\n  width: 180px;\n  height: 180px;\n  opacity: 0.7;\n}\n\n.lds-ripple div:not(:first-child) {\n  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n}\n\n.cursor[data-hint='FOCUS'] .lds-ripple div:first-child {\n  border-color: #0f0;\n  transform: scale(0.01);\n  transition: transform 5s ease-in;\n}\n\n.cursor[data-hint='SOFT_PUNISH'] .lds-ripple div:first-child {\n  border-color: #ff0;\n}\n\n.cursor[data-hint='HARD_PUNISH'] .lds-ripple div:first-child {\n  border-color: #f00;\n}\n\n", '', {"version":3,"sources":["/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/app/Cursor.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,YAAY;EACZ,WAAW;EACX,oBAAoB;EACpB,YAAY;AACd;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,YAAY;EACZ,aAAa;AACf;;AACA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,YAAY;AACd;;AAEA;EACE,8DAA8D;AAChE;;AAEA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,gCAAgC;AAClC;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":[".cursor {\n  position: fixed;\n  padding: 0px;\n  margin: 0px;\n  pointer-events: none;\n  z-index: 999;\n}\n\n.lds-ripple {\n  display: inline-block;\n  position: relative;\n  width: 200px;\n  height: 200px;\n}\n.lds-ripple div {\n  position: absolute;\n  border: 6px solid #fff;\n  opacity: 1;\n  border-radius: 50%;\n}\n\n.lds-ripple div:first-child {\n  width: 180px;\n  height: 180px;\n  opacity: 0.7;\n}\n\n.lds-ripple div:not(:first-child) {\n  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n}\n\n.cursor[data-hint='FOCUS'] .lds-ripple div:first-child {\n  border-color: #0f0;\n  transform: scale(0.01);\n  transition: transform 5s ease-in;\n}\n\n.cursor[data-hint='SOFT_PUNISH'] .lds-ripple div:first-child {\n  border-color: #ff0;\n}\n\n.cursor[data-hint='HARD_PUNISH'] .lds-ripple div:first-child {\n  border-color: #f00;\n}\n\n"],"sourceRoot":""}]]

/***/ }),

/***/ 81232:
/***/ ((module) => {

module.exports = [[module.id, "@keyframes blur {\n  0% {\n    filter: blur(10px);\n  }\n  100% {\n    filter: blur(0px);\n  }\n}\n\ndiv.renderContainer {\n  position: absolute;\n  /*top: 50%;\n  left: 50%;\n  margin-right: -50%;\n  transform: translate(-50%, -50%);\n  z-index: 998;*/\n}\n\n.renderPane {\n  -webkit-user-select: none;\n          user-select: none;\n\n  /*transition: transform 0.2s ease-out; /* Animation */\n  transition: filter 0.1s;\n  border-radius: 0px;\n\n}\n\n.renderPane.fadein{\n  animation: blur 1.5s ease-in;\n}\n\n.renderPane[data-region='FOCUS'] {\n  transition: transform 5s ease-in, filter 5s;\n  /*transform: scale(1.2);*/\n  filter: saturate(120%);\n}\n\n.renderPane[data-region='SOFT_PUNISH'].saturate {\n  transition: filter 0.1s;\n  filter: saturate(10%);\n}\n\n.renderPane[data-region='SOFT_PUNISH'].pixelate {\n  filter: url('#pixelate');\n}\n\n.renderPane[data-region='HARD_PUNISH']{\n  transition: transform 0.3s ease-in, filter 0.25s;\n  transform: scale(4);\n  transition-duration: 0.3s !important;\n  filter: saturate(300%);\n}\n", '', {"version":3,"sources":["/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/app/MainComponent.css"],"names":[],"mappings":"AAAA;EACE;IACE,kBAAkB;EACpB;EACA;IACE,iBAAiB;EACnB;AACF;;AAEA;EACE,kBAAkB;EAClB;;;;gBAIc;AAChB;;AAEA;EACE,yBAAiB;UAAjB,iBAAiB;;EAEjB,qDAAqD;EACrD,uBAAuB;EACvB,kBAAkB;;AAEpB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,2CAA2C;EAC3C,yBAAyB;EACzB,sBAAsB;AACxB;;AAEA;EACE,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,gDAAgD;EAChD,mBAAmB;EACnB,oCAAoC;EACpC,sBAAsB;AACxB","sourcesContent":["@keyframes blur {\n  0% {\n    filter: blur(10px);\n  }\n  100% {\n    filter: blur(0px);\n  }\n}\n\ndiv.renderContainer {\n  position: absolute;\n  /*top: 50%;\n  left: 50%;\n  margin-right: -50%;\n  transform: translate(-50%, -50%);\n  z-index: 998;*/\n}\n\n.renderPane {\n  user-select: none;\n\n  /*transition: transform 0.2s ease-out; /* Animation */\n  transition: filter 0.1s;\n  border-radius: 0px;\n\n}\n\n.renderPane.fadein{\n  animation: blur 1.5s ease-in;\n}\n\n.renderPane[data-region='FOCUS'] {\n  transition: transform 5s ease-in, filter 5s;\n  /*transform: scale(1.2);*/\n  filter: saturate(120%);\n}\n\n.renderPane[data-region='SOFT_PUNISH'].saturate {\n  transition: filter 0.1s;\n  filter: saturate(10%);\n}\n\n.renderPane[data-region='SOFT_PUNISH'].pixelate {\n  filter: url('#pixelate');\n}\n\n.renderPane[data-region='HARD_PUNISH']{\n  transition: transform 0.3s ease-in, filter 0.25s;\n  transform: scale(4);\n  transition-duration: 0.3s !important;\n  filter: saturate(300%);\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ 18657:
/***/ ((module) => {

module.exports = [[module.id, "/*\n * Remove template code below\n */\n\n.app {\n  font-family: sans-serif;\n  min-width: 300px;\n}\n\n.app .flex {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.app header {\n  background-color: #143055;\n  color: white;\n  padding: 5px;\n  border-radius: 3px;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n}\n\n.app main {\n  padding: 0 36px;\n}\n\n.app p {\n  text-align: center;\n}\n\n.app h1 {\n  text-align: center;\n  margin-left: 18px;\n  font-size: 24px;\n}\n\n.app h2 {\n  text-align: center;\n  font-size: 20px;\n  margin: 40px 0 10px 0;\n}\n\n.app pre {\n  padding: 9px;\n  border-radius: 4px;\n  background-color: black;\n  color: #eee;\n}\n\n.app details {\n  border-radius: 4px;\n  color: #333;\n  background-color: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  padding: 3px 9px;\n  margin-bottom: 9px;\n  margin-top: 30px;\n}\n\n@media (prefers-color-scheme: dark) {\n  .app details {\n    color: #aaa;\n    border: 1px solid rgba(255, 255, 255, 0.12);\n  }\n}\n\n.app summary {\n  outline: none;\n  height: 36px;\n  line-height: 36px;\n}\n\n.app .github-star-container {\n  margin-top: 12px;\n  line-height: 20px;\n}\n\n.app .github-star-container a {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n  color: #333;\n}\n\n.app .github-star-badge {\n  color: #24292e;\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  padding: 3px 10px;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  border-radius: 3px;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  margin-left: 4px;\n  font-weight: 600;\n}\n\n.app .github-star-badge:hover {\n  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n  border-color: rgba(27, 31, 35, 0.35);\n  background-position: -0.5em;\n}\n\n.app .github-star-badge .material-icons {\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\n", '', {"version":3,"sources":["/home/runner/work/gentlemans-gallery/gentlemans-gallery/apps/gentlemans-gallery/src/app/app.css"],"names":[],"mappings":"AAAA;;EAEE;;AAEF;EACE,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,QAAQ;EACR,SAAS;EACT,WAAW;AACb;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,qBAAqB;AACvB;;AAGA;EACE,YAAY;EACZ,kBAAkB;EAClB,uBAAuB;EACvB,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,6BAA6B;EAC7B,qCAAqC;EACrC,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;AAClB;;AACA;EACE;IACE,WAAW;IACX,2CAA2C;EAC7C;AACF;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,qBAAqB;EACrB,WAAW;AACb;;AAEA;EACE,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,uCAAuC;EACvC,kBAAkB;EAClB,gEAAgE;EAChE,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,gEAAgE;EAChE,oCAAoC;EACpC,2BAA2B;AAC7B;;AACA;EACE,YAAY;EACZ,WAAW;EACX,iBAAiB;AACnB","sourcesContent":["/*\n * Remove template code below\n */\n\n.app {\n  font-family: sans-serif;\n  min-width: 300px;\n}\n\n.app .flex {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.app header {\n  background-color: #143055;\n  color: white;\n  padding: 5px;\n  border-radius: 3px;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n}\n\n.app main {\n  padding: 0 36px;\n}\n\n.app p {\n  text-align: center;\n}\n\n.app h1 {\n  text-align: center;\n  margin-left: 18px;\n  font-size: 24px;\n}\n\n.app h2 {\n  text-align: center;\n  font-size: 20px;\n  margin: 40px 0 10px 0;\n}\n\n\n.app pre {\n  padding: 9px;\n  border-radius: 4px;\n  background-color: black;\n  color: #eee;\n}\n\n.app details {\n  border-radius: 4px;\n  color: #333;\n  background-color: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  padding: 3px 9px;\n  margin-bottom: 9px;\n  margin-top: 30px;\n}\n@media (prefers-color-scheme: dark) {\n  .app details {\n    color: #aaa;\n    border: 1px solid rgba(255, 255, 255, 0.12);\n  }\n}\n\n.app summary {\n  outline: none;\n  height: 36px;\n  line-height: 36px;\n}\n\n.app .github-star-container {\n  margin-top: 12px;\n  line-height: 20px;\n}\n\n.app .github-star-container a {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n  color: #333;\n}\n\n.app .github-star-badge {\n  color: #24292e;\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  padding: 3px 10px;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  border-radius: 3px;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  margin-left: 4px;\n  font-weight: 600;\n}\n\n.app .github-star-badge:hover {\n  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n  border-color: rgba(27, 31, 35, 0.35);\n  background-position: -0.5em;\n}\n.app .github-star-badge .material-icons {\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ 25674:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46062);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44036);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96793);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17892);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11173);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42464);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18676);
/* harmony import */ var _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_ConfigMenu_css__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ 95748:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46062);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44036);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96793);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17892);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11173);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42464);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(46549);
/* harmony import */ var _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_Cursor_css__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ 26595:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46062);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44036);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96793);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17892);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11173);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42464);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(81232);
/* harmony import */ var _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_MainComponent_css__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ 33988:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46062);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44036);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96793);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17892);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11173);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42464);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18657);
/* harmony import */ var _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_nrwl_web_src_utils_webpack_plugins_raw_css_loader_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_oneOf_4_use_2_app_css__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ 73911:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 70327:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 16843:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 39165:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 27796:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 90451:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 39182:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 80660:
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(61871)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map