"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchResults = void 0;
const elasticsearch_1 = require("../elasticsearch");
const getSearchResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.q;
    const searchParam = {
        index: elasticsearch_1.IDX_NAME,
        size: 25,
        query: {
            wildcard: {
                name: {
                    value: searchQuery ? `${searchQuery}*` : "*",
                },
            },
        },
    };
    const results = yield (0, elasticsearch_1.search)(searchParam);
    res.json(results.hits.hits);
});
exports.getSearchResults = getSearchResults;
//# sourceMappingURL=search.js.map