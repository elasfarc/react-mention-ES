"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDX_NAME = exports.search = exports.client = void 0;
const client_1 = __importDefault(require("./client"));
exports.client = client_1.default;
const search_1 = __importDefault(require("./search"));
exports.search = search_1.default;
const indicies_1 = require("./indicies");
Object.defineProperty(exports, "IDX_NAME", { enumerable: true, get: function () { return indicies_1.IDX_NAME; } });
//# sourceMappingURL=index.js.map