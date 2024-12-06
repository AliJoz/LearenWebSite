const usermodel=require('../../models/User')
const banuser=require('./../../models/ban_phone')


exports. banUser= async (req, res) => {
    res.send("d")
    const mainUser = await usermodel.findOne({ _id: req.params.id }).lean();
    const banUserResult = banuser.create({ phone: mainUser.phone });
    if (banuser) {
        return res.status(200).json({ message: "User ban successfully :))" });
      }
    
      return res.status(500).json({ message: "Server Error !!" });
    
}