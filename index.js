require("dotenv").config();
const express = require("express");
const sequilize = require("./db.js");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const fileupload = require("express-fileupload");
const path = require("path");
const compression = require("compression");

const port = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(
  compression({ level: 9, threshold: 100 * 1000, filter: shouldCompress })
);
app.use(express.json());
app.use(fileupload({}));
app.use("/api", routes);
app.use(errorHandler);
app.get("/", (req, res) => {
  const payload = "some payload";
  res.send(payload.repeat(100000));
});

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

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  return compression.filter(req, res);
}
