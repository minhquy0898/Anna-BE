const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    timeOpen: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{1,2}:\d{2}/.test(v);
            },
            message: props => `${props.value} không phải là định dạng giờ:phút hợp lệ!`
        }
    },
    timeClose: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{1,2}:\d{2}/.test(v);
            },
            message: props => `${props.value} không phải là định dạng giờ:phút hợp lệ!`
        }
    }
})

module.exports = mongoose.model('Store', storeSchema)