const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    "role": {
        type: String,
        require: 'true',
    }
})

const tblName = mongoose.model('user', ApiSchema);
module.exports = tblName