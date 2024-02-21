const usermodel = require('../models/usermodel');

const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        let user = await usermodel.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.status(400).send({
                success: false,
                message: "email and password are wrong"
            })
        }
        let token = await jwt.sign({ user: user }, "rnw4", { expiresIn: "1hr" });
        return res.status(200).send({
            success: true,
            message: "token is here",
            token
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const changepassword = async (req, res) => {
    try {
        let email = req.body.email;
        let newpassword = req.body.newpassword;
        let confirmpassword = req.body.confirmpassword;

        let checkuser = await usermodel.findOne({ email: email });

        if (!checkuser) {
            return res.status(200).send({
                success: false,
                message: "email and password are not valid",
            })
        }

        if (newpassword == confirmpassword) {
            let update = await usermodel.findByIdAndUpdate(req.query.id, {
                password: newpassword
            })
            return res.status(200).send({
                success: true,
                message: "password change successfully",
            })
        }

        else {
            return res.status(200).send({
                success: false,
                message: "password and confirm password are not same",
            })
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    login, changepassword
})