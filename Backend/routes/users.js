const express = require("express");
const userController = require("./../Controllers/v1/user");
const userauth = require("./../middlewares/auth");
const isAdminMiddleware = require("./../middlewares/isAdmin");
const router = express.Router();

router.route("/ban/:id").post(userauth,userController.banUser);

router.route("/ChangRoll").put( userController.Changeroll);//is admin ...

router.route("/Edited").post(userController.Edite);
module.exports = router;
