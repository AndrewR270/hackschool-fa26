const express = require("express");
const { connectToDatabase } = require("../db/mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await connectToDatabase();

  const users = await db.collection("users").find().toArray();

  res.json(users);
});

module.exports = router;