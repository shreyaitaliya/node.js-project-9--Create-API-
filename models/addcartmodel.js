const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    qty: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
})

const tblName = mongoose.model('cart', ApiSchema);
module.exports = tblName