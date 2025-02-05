const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { neon, neonConfig } = require("@neondatabase/serverless");

async function dbClient() {
  neonConfig.fetchConnectionCache = true;
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

exports.handler = serverless(app);
