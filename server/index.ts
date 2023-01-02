import express from "express";
import cors from "cors";
import "./elasticsearch/connect";
import { searchRoutes } from "./router";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/search", searchRoutes);

app.get("*", () => {});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
