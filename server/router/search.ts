import express from "express";
import { getSearchResults } from "../controller/search";

const router = express.Router();

router.get("/", getSearchResults);

export default router;
