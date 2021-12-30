require("dotenv").config();
const express = require("express");
const sequilize = require("./db.js");
const models = require("./models/models");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const fileupload = require("express-fileupload");
const path = require("path");

const port = process.env.PORT || 5000;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileupload({}));
app.use("/api", routes);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "static")));
}
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
