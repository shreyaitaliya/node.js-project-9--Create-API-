const addcartmodel = require('../models/addcartmodel');
const productModel = require('../models/productmodel');

const addtocart = async (req, res) => {
    try {
        let product = await productModel.findById(req.body.id).populate('categoryId').populate('subcategoryId');
        console.log(product);
        let cart = await addcartmodel.create({
            name: product.name,
            price: product.price,
            qty: product.qty,
            desc: product.desc,
            image: product.image,
            categoryId: product.categoryId,
            userId: req.body.userId,
        })
        return res.status(200).send({
            success: true,
            message: "product sucessfully added add to crat",
            cart
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const viewcart = async (req, res) => {
    try {
        let cart = await addcartmodel.find({}).populate("userId", "name email").populate("categoryId");
        // console.log(req.user);
        let record = cart.filter((val) => {
            return val.userId._id == req.user.user._id
        })

        let sum = 0;
        let finalToal = record.map((final) => {
            return sum = sum + final.price * final.qty
        })

        return res.status(200).send({
            success: true,
            message: "cart fetch",
            length: record.length,
            total: sum,
            record

        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    addtocart, viewcart
})