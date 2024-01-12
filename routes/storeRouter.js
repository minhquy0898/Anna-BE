const express = require('express')
const { createNewStore, getAllAddress, getAddress, getPagingStore, deleteStore, editStore, getStoreById } = require('../controllers/storeController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-new-store', requireSignIn, isAdmin, createNewStore);
router.get('/city', requireSignIn, isAdmin, getAllAddress);
router.get('/address', getAddress);
router.get('/getPagingStore', requireSignIn, isAdmin, getPagingStore)
router.delete('/deleteStore/:id', requireSignIn, isAdmin, deleteStore);
router.put('/:id', requireSignIn, isAdmin, editStore)
router.get('/getStoreById/:id', requireSignIn, isAdmin, getStoreById)
module.exports = router 