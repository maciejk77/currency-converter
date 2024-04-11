import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/hello", (req, res) => {
  res.send({foo: 1});
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
