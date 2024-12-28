const express = require("express");
const categoryController = require("../Controllers/v1/categorys/category");
const authMiddleware = require("./../middlewares/auth");
const isAdminMiddleware = require("./../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, categoryController.create)
  .get(categoryController.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, categoryController.remove)
  .put(authMiddleware, isAdminMiddleware, categoryController.update);

module.exports = router;
