import express from "express";
import {type Hello} from "@repo/types/response";
import {HELLO} from "@repo/constants/response";

const app = express();

app.get("/", (_, res) => {
  const response: Hello = HELLO;
  res.send(response);
});

app.listen(3000, () => console.log("Server is listening on port 3000..."));
