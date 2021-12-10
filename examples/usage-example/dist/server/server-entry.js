"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var ReactDomServer = require("react-dom/server");
var jsxRuntime = require("react/jsx-runtime");
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  var n = { __proto__: null, [Symbol.toStringTag]: "Module" };
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var ReactDomServer__namespace = /* @__PURE__ */ _interopNamespace(ReactDomServer);
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntime.jsx("h1", {
      children: "App"
    }), /* @__PURE__ */ jsxRuntime.jsx("p", {
      children: "What the dog say??"
    })]
  });
};
function render() {
  return ReactDomServer__namespace.renderToString(/* @__PURE__ */ jsxRuntime.jsx(App, {}));
}
(function dedupeRequire(dedupe) {
  const Module = require("module");
  const resolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request[0] !== "." && request[0] !== "/") {
      const parts = request.split("/");
      const pkgName = parts[0][0] === "@" ? parts[0] + "/" + parts[1] : parts[0];
      if (dedupe.includes(pkgName)) {
        parent = module;
      }
    }
    return resolveFilename(request, parent, isMain, options);
  };
})(["react", "react-dom"]);
exports.render = render;
