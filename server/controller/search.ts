import { RequestHandler, Request } from "express";
import { search, IDX_NAME } from "../elasticsearch";

const getSearchResults: RequestHandler<{}, {}, {}, { q: string }> = async (
  req,
  res
) => {
  const searchQuery = req.query.q;

  const searchParam = {
    index: IDX_NAME,
    size: 25,
    query: {
      wildcard: {
        name: {
          value: searchQuery ? `${searchQuery}*` : "*",
        },
      },
    },
  };

  const results = await search(searchParam);
  res.json(results.hits.hits);
};

export { getSearchResults };
