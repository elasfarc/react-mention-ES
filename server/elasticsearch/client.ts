import { Client } from "@elastic/elasticsearch";
import config from "config";

type ElasticConfig = {
  cloudID: string;
  username: string;
  password: string;
  apiKey: string;
};

const IDX_NAME = "empcustomersdata";

const elasticConfig: ElasticConfig = config.get("elastic");

const client = new Client({
  cloud: {
    id: elasticConfig.cloudID,
  },
  auth: {
    username: elasticConfig.username,
    password: elasticConfig.password,
  },
});

client
  .ping()
  .then((res) => console.log("==> connected to ElasticSearch."))
  .then(() => client.indices.exists({ index: IDX_NAME }))
  .then((isExist) => {
    console.log(`==> index is ${isExist ? "existed" : "not existed"} `);
    if (!isExist)
      return client.indices.create({
        index: IDX_NAME,
        mappings: {
          properties: {
            name: { type: "text" },
            email: { enabled: false },
            label: { enabled: false },
          },
        },
      });
  })
  .catch((err) => console.error(err));

export default client;
