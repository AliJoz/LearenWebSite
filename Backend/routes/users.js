const express = require("express");
const userController = require("./../Controllers/v1/user");
const userauth = require("./../middlewares/auth");
const isadmin = require("./../middlewares/isadmin");
const router = express.Router();

router.route("/ban/:id")
.post(userauth,userauth,userController.banUser);

module.exports = router;
