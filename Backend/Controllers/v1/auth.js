const UserModel = require("../../models/User");
const validtor=require("../../validators/register")
const { Mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const validationResult = validtor(req.body);
  if (validationResult != true) {
    return res.status(422).json(validationResult);
  }
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
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // تولید کد ۶ رقمی
  // res.send(otpCode)
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // انقضا در ۱۰ دقیقه
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
exports.Login = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    if (!username && !email && !phone) {
      return res.status(400).json({
        error: "Please provide a username, email, or phone number.",
      });
    }
    const user = await UserModel.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid password.",
      });
    }

    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, 'password');
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 15 * 60 * 1000, // 15 دقیقه
      sameSite: 'Strict',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 روز
      sameSite: 'Strict',
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong during login.",
    });
  }
};



exports.getme = async (req, res) => {};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh Token not found' });
  }

  const user = await UserModel.findOne({ refreshToken });

  if (!user) {
    return res.status(403).json({ error: 'Invalid Refresh Token' });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Token refreshed' });
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired Refresh Token' });
  }
};


exports.logout = async (req, res) => {
  // حذف Refresh Token از پایگاه داده
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    const user = await UserModel.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null; // حذف Refresh Token
      await user.save();
    }
  }

  // حذف کوکی‌ها
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return res.status(200).json({ message: 'Logout successful' });
};

// // 
