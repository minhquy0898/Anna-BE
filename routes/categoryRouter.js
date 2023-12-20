const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

//routes
// create category routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update category routes
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// getAll category routes
router.get('/get-category', categoryController)

// single category routes
router.get('/single-category/:slug', singleCategoryController)

// Delete category routes
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;