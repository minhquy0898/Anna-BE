const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createNewOrder, updateStatusOrder, findOrderById, deleteOrder, getPagingOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/create-order', requireSignIn, createNewOrder)
router.put('/:id', requireSignIn, isAdmin, updateStatusOrder)
router.get('/:id', findOrderById)
router.delete('/:id', deleteOrder)
router.get('/getPagingOrder', getPagingOrder)

module.exports = router 