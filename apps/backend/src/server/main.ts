import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello coral-sunflower!");
});

app.listen(3000, () => console.log("Server is listening on port 3000..."));
