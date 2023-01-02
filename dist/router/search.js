"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_1 = require("../controller/search");
const router = express_1.default.Router();
router.get("/", search_1.getSearchResults);
exports.default = router;
//# sourceMappingURL=search.js.map