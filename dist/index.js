"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./elasticsearch/connect");
const router_1 = require("./router");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/search", router_1.searchRoutes);
app.get("*", () => { });
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
//# sourceMappingURL=index.js.map