const ProductModel = require("../models/productModel");

// Create Product
exports.createProduct = async (req, res, next) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json({
    status: "success",
    product,
  });
};

exports.getAllProducts = (req, res) => {
  res.status(200).json({ message: "Route is working fine" });
};
