const express = require("express");
const coursesController = require("./../Controllers/v1/courses/course");
const multer = require("multer");
const multerStorage = require("./../utils/uploader");
const authMiddleware = require("./../middlewares/auth");
const isAdminMiddleware = require("./../middlewares/isadmin");

const router = express.Router();


router
.route("/").post(multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single("cover"),authMiddleware,isAdminMiddleware.Tokenadmin,coursesController.create)

router.route("/:id/sessions").post(
  // multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
  //   "video"
  // ),
  authMiddleware,
  isAdminMiddleware.Tokenadmin,
  coursesController.createSession
);



router
  .route("/sessions")
  .get(authMiddleware, isAdminMiddleware.Tokenadmin, coursesController.getAllSessions);
module.exports = router;