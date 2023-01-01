import { Configuration, OpenAIApi } from "openai";
import config from "config";
import { OpenaiConfig, Person } from "../types/api";

const openaiConfig: OpenaiConfig = config.get("openai");

const configuration = new Configuration({
  apiKey: openaiConfig.apiKey,
});

const openai = new OpenAIApi(configuration);

async function generateRandomPeople() {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "generate a json file that has 25 random names and emails half of these objects has the label “employees” and the other “customers”",
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const { text } = response.data.choices[0];
    const people: Person[] = JSON.parse(text!);
    return people;
  } catch (error) {
    console.error(error);
  }
}

export { generateRandomPeople };
