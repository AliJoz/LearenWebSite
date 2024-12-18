const express = require("express");

const Contoroller = require("../Controllers/v1/auth");

const router = express.Router();

router.post("/register", Contoroller.register);
router.post("/login", Contoroller.Login);
router.post('/refresh-token', Contoroller.refreshToken);
router.post('/logout', Contoroller.logout);

// router.post("/me", Contoroller.getme);

module.exports = router;
