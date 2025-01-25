const express = require("express");
const categoryController = require("./../Controllers/v1/categorys/category");
const authMiddleware = require("./../middlewares/auth");
const isAdminMiddleware = require("./../middlewares/isadmin");

const router = express.Router();

router.route("/").post(authMiddleware, isAdminMiddleware.Tokenadmin, categoryController.create)
  .get(categoryController.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware.Tokenadmin, categoryController.remove)
  .put(authMiddleware, isAdminMiddleware.Tokenadmin, categoryController.update);

module.exports = router;
