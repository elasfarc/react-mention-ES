import express from "express";
import "./elasticsearch/client";

const app = express();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
