const usermodel=require('../../models/User')
const banuser=require('./../../models/ban_phone')


exports. banUser=async (res,req)=>{
    const mainUser = await usermodel.findOne({ _id: req.params.id }).lean();
    const banUserResult = banUserModel.create({ phone: mainUser.phone });
    if (banUserModel) {
        return res.status(200).json({ message: "User ban successfully :))" });
      }
    
      return res.status(500).json({ message: "Server Error !!" });
    
}