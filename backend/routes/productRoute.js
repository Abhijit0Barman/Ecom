const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetailes,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.post("/product/new", createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetailes);

module.exports = router;
