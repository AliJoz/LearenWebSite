const validitor=require('../../validators/register')
const UserModel=require('../../models/User');
const { Mongoose } = require('mongoose');
const Registervaalid=require('../../validators/register')
exports.register=async(req,res)=>{
  const validitor = Registervaalid(req.body);
  if (!validitor) {
      return res.status(422).json(validitor);
  }

  const { name, username, Email, Password, phone } = req.body;

  try {
      const isUser = await UserModel.findOne({
          $or: [
              { username, Email ,phone}
          ]
      });

      if (isUser) {
          return res.status(403).json({
              message: "The user already exists."
          });
      }
     const countOfUsers = await UserModel.count();
      const hashedPassword = await bcrypt.hash(password, 10);

      const role = countOfUsers > 0 ? "USER" : "ADMIN";

      const user = await userModel.create({
          email,
          username,
          name,
          phone,
          password: hashedPassword,
          role,
      });
      

    

      res.status(201).json({
          message: "User registered successfully!"
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: "Internal server error"
      });
  }
}

exports.Login=async(req,res)=>{

}

exports.getme=async(req,res)=>{

}