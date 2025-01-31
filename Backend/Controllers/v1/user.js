const usermodel = require("../../models/User");
const banuser = require("./../../models/ban_phone");

const bcrypt = require("bcrypt");
async function findUserById(id) {
  try {
    return await usermodel.findOne({ _id: id }).lean();
  } catch (error) {
    console.log("Error finding user:", error);
    throw new Error("User not found or database error.");
  }
}

exports.banUser = async (req, res) => {
  const mainUser = await findUserById(id);
  const banUserResult = banuser.create({ phone: mainUser.phone });
  if (banuser) {
    return res.status(200).json({ message: "User ban successfully :))" });
  }

  return res.status(500).json({ message: "Server Error !!" });
};

exports.Changeroll = async (req, res) => {
  
  const { id } = req.body;

  const userRoll = await findUserById(id);
  if (!userRoll) {
    return res.status(404).json({ message: "User not found" });
  }
  const change = userRoll.role === "USER" ? "ADMIN" : null;
  await usermodel.updateOne({ _id: id }, { $set: { role: "ADMIN" } });


  return res.status(200).json({ message: "Role changed", role: change, userId: id });
};

exports.Edite = async (req, res) => {
  const { id, name, phone, password } = req.body;

  try {

    const oldInformation = await UserModel.findById(id);
    if (!oldInformation) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      $set: { name, phone, password: hashedPassword },
    }, { new: true });  


    const { password: removedPassword, ...userWithoutPassword } = updatedUser.toObject();

    
    return res.status(200).json({
      message: "User information updated",
      updatedUser: userWithoutPassword  
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

