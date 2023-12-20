const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController } = require("../controllers/productController");
const formdable = require("express-formidable");

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formdable(), createProductController)

// get product router
router.get('/get-product', getProductController)

// single product router
router.get('/get-product/:slug', getSingleProductController)

// get photo
router.get('/product-photo/:pid', productPhotoController)

// delete product
router.delete('/product/:pid', deleteProductController)


// update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formdable(), updateProductController)

module.exports = router