const ProductModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Get all Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json({ success: true, products });
});

// Get Single Product
exports.getProductDetailes = catchAsyncErrors(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

// Create Product  -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json({
    status: "success",
    product,
  });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //This option tells Mongoose to return the updated document instead of the original document. By setting new to true, you'll receive the updated product in the response.
    runValidators: true, //This option tells Mongoose to run validation on the updated document. By setting runValidators to true, Mongoose will validate the fields of the updated document against the validation rules defined in the product schema.
    useFindAndModify: false, //This option tells Mongoose to use the built-in MongoDB driver's findOneAndUpdate() function instead of the deprecated findAndModify() function. By setting useFindAndModify to false, you can avoid deprecation warnings and ensure that the function behaves as expected.
    context: "query", //This option specifies the context in which the query is being executed. In this case, it's set to "query", which means that the options will be applied to the query.
  });
  // These options are essential for ensuring data integrity, validation, and consistency when updating documents in a MongoDB database using Mongoose.
  res.status(200).json({ success: true, product });
});

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await ProductModel.deleteOne({ _id: product._id }); // Delete the product from the database

  // product = await ProductModel.findByIdAndDelete(req.params.id); //This method finds a document by its ID and deletes it. It returns the deleted document

  // Use findOneAndDelete method with options
  // product = await ProductModel.findOneAndDelete(
  //   { _id: product._id },
  //   // You can also set the 'rawResult' option to true to get the raw result from MongoDB
  //   { useFindAndModify: false, rawResult: true }
  // );

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully", product });
});

/*
PUT: The PUT request is used to replace an existing resource with a new one. When you send a PUT request, you need to provide the complete representation of the resource in the request body. If the resource does not exist, the server will create a new one.

PATCH: The PATCH request is used to update a specific part of a resource. Unlike PUT, PATCH only sends the changes you want to apply to the resource. This makes it more efficient for updating specific attributes without sending the entire resource representation.
*/
