var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/aaron.gesmer@missionlane.com/Desktop/repos/remix-todo-app/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  default: () => App
});
var import_react2 = require("@remix-run/react");
function App() {
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(import_react2.Outlet, null)));
}
function Document({
  children,
  title
}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement(import_react2.Meta, null)), /* @__PURE__ */ React.createElement("body", null, children, /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), false));
}
function Layout({ children }) {
  return /* @__PURE__ */ React.createElement("article", null, children);
}
function CatchBoundary() {
  let caught = (0, import_react2.useCatch)();
  let message;
  switch (caught.status) {
    case 404:
      message = /* @__PURE__ */ React.createElement("p", null, "This is a custom error message for 404 pages");
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ React.createElement(Document, {
    title: `${caught.status} ${caught.statusText}`
  }, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement("h1", null, caught.status, ": ", caught.statusText), message));
}

// route:/Users/aaron.gesmer@missionlane.com/Desktop/repos/remix-todo-app/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  action: () => action,
  default: () => routes_default,
  loader: () => loader
});

// libs/supabase-client.ts
var import_supabase_js = require("@supabase/supabase-js");
var supabaseUrl = process.env.SUPABASE_URL;
var supabaseKey = process.env.SUPABASE_SECRET_KEY;
var supabase = (0, import_supabase_js.createClient)(supabaseUrl, supabaseKey);

// route:/Users/aaron.gesmer@missionlane.com/Desktop/repos/remix-todo-app/app/routes/index.tsx
var import_react3 = require("@remix-run/react");
var import_react4 = require("@remix-run/react");
var loader = async () => {
  const { data } = await supabase.from("todos").select("*");
  return data;
};
var action = async ({ request }) => {
  const formData = await request.formData();
  let { _action } = Object.fromEntries(formData);
  console.log("action", _action);
  if (_action === "add") {
    const newTodo = {
      item: formData.get("todo")
    };
    const { data, error } = await supabase.from("todos").insert(newTodo);
    console.log("dater", data, error);
    console.log("error", error);
  }
  if (_action === "delete") {
    await supabase.from("todos").delete().match({ id: formData.get("id") });
  }
  return null;
};
var Index = () => {
  const data = (0, import_react3.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Todo's"), /* @__PURE__ */ React.createElement(import_react4.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "todo"
  }), /* @__PURE__ */ React.createElement("button", {
    name: "_action",
    value: "add"
  }, "Add")), /* @__PURE__ */ React.createElement("ul", null, data.map((o) => /* @__PURE__ */ React.createElement("li", {
    key: o.id
  }, /* @__PURE__ */ React.createElement(import_react4.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "id",
    value: o.id
  }), o.item, /* @__PURE__ */ React.createElement("button", {
    name: "_action",
    value: "delete"
  }, "Delete Me"))))));
};
var routes_default = Index;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "3aad134f", "entry": { "module": "/build/entry.client-5LGEYX5B.js", "imports": ["/build/_shared/chunk-MKIWVPDR.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-QEUPEIUW.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": true, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-YD4GSZY5.js", "imports": void 0, "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-3AAD134F.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
