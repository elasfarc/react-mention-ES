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
const _1 = require("./");
const client_1 = require("../openAi/client");
connectElastic();
//****** */
function connectElastic() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield _1.client.ping();
            console.log("==> connected to ElasticSearch.");
            const isExist = yield _1.client.indices.exists({ index: _1.IDX_NAME });
            console.log(`==> index is ${isExist ? "existed" : "not existed"} `);
            if (!isExist) {
                console.log(`==> creating index... `);
                yield _1.client.indices.create({
                    index: _1.IDX_NAME,
                    mappings: {
                        properties: {
                            name: { type: "text" },
                            email: { enabled: false },
                            label: { enabled: false },
                        },
                    },
                });
            }
            const stats = yield _1.client.indices.stats({
                index: _1.IDX_NAME,
                metric: "docs",
            });
            const docCount = (_b = (_a = stats._all.primaries) === null || _a === void 0 ? void 0 : _a.docs) === null || _b === void 0 ? void 0 : _b.count;
            if (docCount == 0) {
                console.log(`==> generating data...`);
                const people = yield (0, client_1.generateRandomPeople)();
                console.log(`==> indexing...`);
                yield indexData(people, _1.client, _1.IDX_NAME);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
function indexData(data, client, idxName) {
    return __awaiter(this, void 0, void 0, function* () {
        data.map((person) => __awaiter(this, void 0, void 0, function* () {
            yield client.index({
                index: idxName,
                document: person,
            });
        }));
    });
}
//# sourceMappingURL=connect.js.map