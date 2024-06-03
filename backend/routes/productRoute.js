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

router.route("/products").get(getAllProducts);
router.post("/product/new", isAuthUser, authRole("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthUser, authRole("admin"), updateProduct)
  .delete(isAuthUser, authRole("admin"), deleteProduct)
  .get(getProductDetailes);

module.exports = router;
