require("dotenv").config();
const express = require("express");
const sequilize = require("./db.js");
const models = require("./models/models");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "started" });
});
const start = async () => {
  try {
    await sequilize.authenticate();
    await sequilize.sync();
    app.listen(port, () => {
      console.log("Started on port", port);
    });
  } catch (e) {
    console.error("error happened...");
  }
};
start();
