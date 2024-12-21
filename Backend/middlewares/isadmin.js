

const userModel = require('../models/User');

exports.getalluser = async (req, res, next) => {
  try {
    const users = await userModel.find({ role: { $ne: 'ADMIN' } }, 'username email'); // انتخاب فقط نام و ایمیل
    Reflect.deleteProperty(users, 'password');
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};
exports.Tokenadmin =async(req,res,next)=>{
    const isadmin=req.user.role==="ADMIN"?true:false;

    if(!isadmin){
        return res.status(401).json({message:"not admin"})
    }
    next()
}