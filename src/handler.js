const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { neon } = require("@neondatabase/serverless");

async function dbClient() {
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

app.get("/", async (req, res, next) => {
  const db = await dbClient();
  const results = await db`select name, value from playing_with_neon;`;
  return res.status(200).json({
    message: "Hello from root!",
    ressults: results,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// server app
// app.listen(3000, () => console.log("listening on port 3000"));

exports.handler = serverless(app);
