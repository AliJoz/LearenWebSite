const validitor=require('../../validators/register')
const UserModel=require('../../models/User');
const { Mongoose } = require('mongoose');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  const valid = UserModel(req.body);
  const { name, username, email, Password,confirmPassword, phone } = req.body;
  try {
      const isUser = await UserModel.findOne({
          $or: [
              { username },
              { email },
              { phone }
          ]
      });

      if (isUser) {
          return res.status(403).json({
              message: "The user already exists."
          });
      }

      // شمارش کاربران برای تنظیم نقش
      const countOfUsers = await UserModel.countDocuments();

      // هش کردن رمز عبور
      if (!Password || Password.trim() === "") {
          return res.status(400).json({ error: "Password is required." });
      }
      const hashedPassword = await bcrypt.hash(Password, 10);

      // ایجاد کاربر جدید
      const user = await UserModel.create({
        email,
          username,
          name,
          phone,
          password: hashedPassword,
          role: countOfUsers > 0 ? "USER" : "ADMIN",
      });

      // تولید توکن JWT
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
      });

      res.status(201).json({ user, accessToken });
  } catch (error) {
      console.error("Error in register function:", error);
      res.status(500).json({
          message: "Internal server error",
      });
  }
};
exports.Login=async(req,res)=>{

}

exports.getme=async(req,res)=>{

}