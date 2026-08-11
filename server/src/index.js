const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});