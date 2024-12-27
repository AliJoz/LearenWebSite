const express = require("express");
const userController = require("./../Controllers/v1/user");
const userauth = require("./../middlewares/auth");
const isadmin = require("./../middlewares/isadmin");
const router = express.Router();

router.route("/ban/:id").post(userauth,userController.banUser);

router.route("/ChangRoll").put( userController.Changeroll);//is admin ...

router.post("/Edited", userController.Edited);
module.exports = router;
