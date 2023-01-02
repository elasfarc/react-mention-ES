"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
const config_1 = __importDefault(require("config"));
const elasticConfig = config_1.default.get("elastic");
const client = new elasticsearch_1.Client({
    cloud: {
        id: elasticConfig.cloudID,
    },
    auth: {
        username: elasticConfig.username,
        password: elasticConfig.password,
    },
});
exports.default = client;
//# sourceMappingURL=client.js.map