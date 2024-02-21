const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).send({
            success: false,
            message: "token is blank"
        })
    }
    let donetoken = token.split(' ')[1];
    jwt.verify(donetoken, "rnw4", (error, decoded) => {
        if (error) {
            return res.status(400).send({
                success: false,
                message: "token is not valid"
            })
        }
        req.user = decoded;
        next();
    })
}

const roleBaseAuth = (role) => {
    return (req, res, next) => {
        if (req.user && role.includes(req.user.user.role)) {
            return next()
        }
        return res.status(200).send({
            success: false,
            message: "Only admin access"
        })
    }
}

module.exports = ({
    verifytoken, roleBaseAuth
})