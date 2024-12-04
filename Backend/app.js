const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParsers = require("body-parser");
const authRouter = require("./routes/auth");

app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use(cors());
app.use(bodyParsers.urlencoded({ extended: false }));
app.use(bodyParsers.json());

// app.post("/register", (req, res) => {
//     const { username, email } = req.body; // دریافت داده‌ها از درخواست
//     res.status(200).json({ message: "User registered successfully!", username, email });
// });

app.use("/v1/auth", authRouter);

module.exports = app;
