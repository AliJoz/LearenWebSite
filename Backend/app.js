const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParsers = require("body-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");

app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use(cors());
app.use(bodyParsers.urlencoded({ extended: false }));
app.use(bodyParsers.json());

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);

module.exports = app;
