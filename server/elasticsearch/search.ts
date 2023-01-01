import client from "./client";
import { SearchRequest } from "@elastic/elasticsearch/lib/api/types";

async function search(param: SearchRequest) {
  return await client.search(param);
}

export default search;
