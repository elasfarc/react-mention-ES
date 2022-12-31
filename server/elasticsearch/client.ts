import { Client } from "@elastic/elasticsearch";
import config from "config";

type ElasticConfig = {
  cloudID: string;
  username: string;
  password: string;
  apiKey: string;
};

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
  .catch((err) => console.error(err));

export default client;
