const express = require('express');
const { registerController, loginController, testController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');

// router object
const router = express.Router();

//routing
// REGISTER || POST
router.post('/register', registerController)

//LGOIN || POST
router.post('/login', loginController)

//test routes
router.get('/test', requireSignIn, isAdmin, testController)

module.exports = router;