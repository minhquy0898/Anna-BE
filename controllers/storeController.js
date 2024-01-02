const storeModel = require('../models/storeModel')

const createNewStore = async (req, res) => {
    try {
        const city = req.body.city;
        const district = req.body.district;
        const address = req.body.address;
        const phoneNumber = req.body.phoneNumber;
        const timeOpen = req.body.timeOpen;
        const timeClose = req.body.timeClose;

        if (!city) {
            return res.send({
                message: 'City is required'
            })
        }
        if (!district) {
            return res.send({
                message: 'District is required'
            })
        }
        if (!address) {
            return res.send({
                message: 'Address is required'
            })
        }
        if (!phoneNumber) {
            return res.send({
                message: 'Phone number is required'
            })
        }
        if (!timeOpen) {
            return res.send({
                message: 'Open time is required'
            })
        }
        if (!timeClose) {
            return res.send({
                message: 'Close time is required'
            })
        }
        const phoneRegex = /^\d{10,11}$/; // Điều chỉnh theo định dạng số điện thoại mong muốn
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({
                message: 'Invalid phone number format'
            });
        }

        const openTime = new Date(`2022-01-01 ${timeOpen}`);
        const closeTime = new Date(`2022-01-01 ${timeClose}`);
        if (openTime >= closeTime) {
            return res.status(400).json({
                message: 'Close time must be later than open time'
            });
        }


        const existingStore = await storeModel.findOne({ address: address })
        if (existingStore) {
            return res.status(400).json({
                message: 'The address of store already exist'
            })
        }
        const newStore = await storeModel.create({
            city: city,
            district: district,
            address: address,
            phoneNumber: phoneNumber,
            timeOpen: timeOpen,
            timeClose: timeClose
        })
        return res.status(200).json({
            message: "Create new store success",
            newStore
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            name: error.name,
        })
    }
}

const getAllAddress = async (req, res) => {
    try {
        const getAddress = await storeModel.find()
        const formatAddress = getAddress.map(items => {
            return {
                id: items._id,
                address: items.address,
                phoneNumber: `+84${items.phoneNumber}`,
                completeAddress: `${items.address}, ${items.district}, ${items.city}`,
                timeOpen: items.timeOpen,
                timeClose: items.timeClose,
            }
        })
        return res.status(200).json({
            formatAddress
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            name: error.name,
        })
    }
}

const getAddress = async (req, res) => {
    try {
        let query = {};

        // Kiểm tra xem có giá trị thành phố được chọn không
        if (req.query.city) {
            query.city = req.query.city;
        }

        // Kiểm tra xem có giá trị quận được chọn không
        if (req.query.district) {
            query.district = req.query.district;
        }

        const getAddress = await storeModel.find(query);
        const formatAddress = getAddress.map(items => {
            return {
                id: items._id,
                address: items.address,
                phoneNumber: `+84${items.phoneNumber}`,
                completeAddress: `${items.address}, ${items.district}, ${items.city}`,
                timeOpen: items.timeOpen,
                timeClose: items.timeClose,
            }
        });

        return res.status(200).json({
            formatAddress
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

const getPagingStore = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 3;
        const pageIndex = req.query.pageIndex || 1;

        const storeAll = await storeModel
            .find()
            .skip(pageSize * pageIndex - pageSize).limit(pageSize)

        const count = await storeModel.countDocuments()
        const totalPage = Math.ceil(count / pageSize)

        return res.status(200), json({
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

module.exports = { createNewStore, getAllAddress, getAddress, getPagingStore };