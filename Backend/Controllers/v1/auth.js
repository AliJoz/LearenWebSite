const UserModel = require("../../models/User");
const { Mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const valid = UserModel(req.body);
  const { name, username, email, Password, confirmPassword, phone } = req.body;

  const isUser = await UserModel.findOne({
    $or: [{ username }, { email }, { phone }],
  });

  if (isUser) {
    return res.status(403).json({
      message: "The user already exists.",
    });
  }
  const countOfUsers = await UserModel.countDocuments();

  if (!Password || Password.trim() === "") {
    return res.status(400).json({ error: "Password is required." });
  }
  const hashedPassword = await bcrypt.hash(Password, 10);

  const user = await UserModel.create({
    email,
    username,
    name,
    phone,
    password: hashedPassword,
    confirmPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });
  const userobject = user.toObject();
  Reflect.deleteProperty(userobject, 'password');
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(201).json({ user:userobject, accessToken });
};
exports.Login = async (req, res) => {};

exports.getme = async (req, res) => {};
