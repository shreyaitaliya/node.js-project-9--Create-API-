const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema({
    category: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: 1
    }
})

const tblName = mongoose.model('category', ApiSchema);
module.exports = tblName