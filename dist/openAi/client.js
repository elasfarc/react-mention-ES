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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPeople = void 0;
const openai_1 = require("openai");
const config_1 = __importDefault(require("config"));
const openaiConfig = config_1.default.get("openai");
const configuration = new openai_1.Configuration({
    apiKey: openaiConfig.apiKey,
});
const openai = new openai_1.OpenAIApi(configuration);
function generateRandomPeople() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield openai.createCompletion({
                model: "text-davinci-003",
                prompt: "generate a json file that has 25 random names and emails half of these objects has the label “employees” and the other “customers”",
                temperature: 0.7,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            const { text } = response.data.choices[0];
            const people = JSON.parse(text);
            return people;
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.generateRandomPeople = generateRandomPeople;
//# sourceMappingURL=client.js.map