const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetailes,
} = require("../controllers/productController");
const { isAuthUser, authRole } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(isAuthUser,authRole("admin"),getAllProducts);
router.post("/product/new",isAuthUser, createProduct);
router
  .route("/product/:id")
  .put(isAuthUser, updateProduct)
  .delete(isAuthUser,deleteProduct)
  .get(getProductDetailes);

module.exports = router;
