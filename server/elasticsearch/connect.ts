import { client, IDX_NAME } from "./";
import { generateRandomPeople } from "../openAi/client";

import { Client } from "@elastic/elasticsearch";
import { Person } from "../types/api";

connectElastic();

//****** */

async function connectElastic() {
  try {
    await client.ping();
    console.log("==> connected to ElasticSearch.");

    const isExist = await client.indices.exists({ index: IDX_NAME });
    console.log(`==> index is ${isExist ? "existed" : "not existed"} `);

    if (!isExist) {
      console.log(`==> creating index... `);
      await client.indices.create({
        index: IDX_NAME,
        mappings: {
          properties: {
            name: { type: "text" },
            email: { enabled: false },
            label: { enabled: false },
          },
        },
      });
    }

    const stats = await client.indices.stats({
      index: IDX_NAME,
      metric: "docs",
    });
    const docCount = stats._all.primaries?.docs?.count;
    if (docCount == 0) {
      console.log(`==> generating data...`);
      const people = await generateRandomPeople();
      console.log(`==> indexing...`);
      await indexData(people!, client, IDX_NAME);
    }
  } catch (error) {
    console.error(error);
  }
}

async function indexData(data: Person[], client: Client, idxName: string) {
  data.map(async (person) => {
    await client.index({
      index: idxName,
      document: person,
    });
  });
}
