const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

const createNewOrder = async (req, res) => {
    try {
        const client = req.body.client;
        const items = req.body.items;
        const address = req.body.address;

        if (!client) {
            return res.send({
                message: 'Please login to order'
            })
        }
        if (!items) {
            return res.send({
                message: 'Your order do not have any item'
            })
        }
        if (!address) {
            return res.send({
                message: 'Please fill your address'
            })
        }

        const createOrder = await orderModel.create({
            client,
            items,
            address
        })
        await userModel.findByIdAndUpdate(client, {
            $push: { orders: createOrder._id }
        })
        return res.status(201).json({
            message: 'Order created succcessfully'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params._id
        const deleteOrdered = await orderModel.deleteOne({ _id: id })

        if (deleteOrdered.deletedCount === 1) {
            return res.status(200).json({
                message: "This is order already delete"
            })
        }
        else {
            return res.status(404).json({
                message: "This order is not exist"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
const updateStatusOrder = async (req, res) => {
    try {
        const id = req.params._id;
        const newStatus = req.body.status
        const findOrder = await orderModel.findByIdAndUpdate(id, {
            $push: { status: newStatus }
        })
        return res.status(200).json({
            message: 'This order is updated successfull',
            order: findOrder
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }

}
const findOrderById = async (req, res) => {
    try {
        const id = req.params._id;
        const result = await orderModel.findById({ _id: id })
        if (result) {
            return res.status(200).json({
                message: result
            })
        }
        else {
            return res.status(400).json({
                message: 'This order is not exist'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const getPagingOrder = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 3;
        const pageIndex = req.query.pageIndex || 1;

        const orderAll = await orderModel
            .find()
            .skip(pageSize * pageIndex - pageSize).limit(pageSize)

        const count = await orderModel.countDocuments()
        const totalPage = Math.ceil(count / pageSize)

        return res.status(200).json({
            storeAll,
            totalPage,
            count
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
module.exports = {
    createNewOrder, deleteOrder, updateStatusOrder, findOrderById, getPagingOrder
}