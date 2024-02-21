const registerModel = require('../models/usermodel');

const registerUser = async (req, res) => {
    try {
        let user = await registerModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        })
        return res.status(200).send({
            success: true,
            message: "sucessfully registed",
            user
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    registerUser
})