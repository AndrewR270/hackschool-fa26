const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  await client.connect();
  db = client.db("my-project");

  console.log("Connected to MongoDB");

  return db;
}

module.exports = { connectToDatabase };