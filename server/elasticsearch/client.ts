import { Client } from "@elastic/elasticsearch";
import config from "config";

import { ElasticConfig } from "../types/api";

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

export default client;
