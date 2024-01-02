const express = require('express')
const { createNewStore, getAllAddress, getAddress, getPagingStore } = require('../controllers/storeController')

const router = express.Router();

router.post('/create-new-store', createNewStore);
router.get('/city', getAllAddress);
router.get('/address', getAddress);
router.get('/getPagingStore', getPagingStore)

module.exports = router