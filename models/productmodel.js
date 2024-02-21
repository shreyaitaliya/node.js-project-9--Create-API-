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
    status: {
        type: String,
        default: 1
    }
})

const tblName = mongoose.model('product', ApiSchema);
module.exports = tblName