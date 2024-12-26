const express = require("express");

const Contoroller = require("../Controllers/v1/auth");
const userauth = require("./../middlewares/auth");
const isadmin = require("./../middlewares/isadmin");
const router = express.Router();

router.post("/register", Contoroller.register);
router.post("/login", Contoroller.Login);
router.post('/refresh-token', Contoroller.refreshToken);
router.post('/logout', Contoroller.logout);




router.get("/me", userauth,isadmin.getalluser, Contoroller.getme);

module.exports = router;
