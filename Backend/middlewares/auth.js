const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization")?.split(" ");
  if (authHeader?.length !== 2) {
    return res.status(401).json({ message: "protected Token" });
  }
  const token = authHeader[1];
  console.log(token);

  try {
      const accessToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Verified Token:", accessToken);
    const userFind = await userModel.findById(accessToken.id).lean();
    Reflect.deleteProperty(userFind, 'password');
    req.user = userFind;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
