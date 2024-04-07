"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* @refresh reload */
var web_1 = require("solid-js/web");
require("./styles/index.css");
var App_1 = __importDefault(require("./App"));
var root = document.getElementById('root');
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error('Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?');
}
(0, web_1.render)(function () { return <App_1.default />; }, root);
//# sourceMappingURL=index.js.map