const express = require("express");

const Contoroller = require("../Controllers/v1/auth");
const userauth = require("./../middlewares/auth");
const isAdminMiddleware = require("./../middlewares/isAdmin");
const router = express.Router();

router.post("/register", Contoroller.register);
router.post("/login", Contoroller.Login);
router.post('/refresh-token', Contoroller.refreshToken);
router.post('/logout', Contoroller.logout);






router.get("/me", userauth,isAdminMiddleware.getalluser, Contoroller.getme);

module.exports = router;
