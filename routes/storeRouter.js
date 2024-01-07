const express = require('express')
const { createNewStore, getAllAddress, getAddress, getPagingStore, deleteStore, editStore, getStoreById } = require('../controllers/storeController')

const router = express.Router();

router.post('/create-new-store', createNewStore);
router.get('/city', getAllAddress);
router.get('/address', getAddress);
router.get('/getPagingStore', getPagingStore)
router.delete('/deleteStore/:id', deleteStore);
router.put('/:id', editStore)
router.get('/getStoreById/:id', getStoreById)
module.exports = router