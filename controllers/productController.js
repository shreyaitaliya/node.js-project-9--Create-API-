const productModel = require('../models/productmodel');
const categoryModel = require('../models/categoryModel');
const subcategoryModel = require('../models/subcategorymodel');

const fs = require('fs');

const productAdd = async (req, res) => {
    try {
        let product = await productModel.create({
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
            desc: req.body.desc,
            image: req.file.path,
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
        })
        return res.status(200).send({
            sucess: true,
            message: "product add successfully",
            product
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const viewproduct = async (req, res) => {
    try {
        let viewuser = await productModel.find({}).populate('categoryId').populate('subcategoryId');
        return res.status(200).send({
            sucess: true,
            message: "product view sucessfully",
            viewuser
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteproduct = async (req, res) => {
    try {
        let delimage = await productModel.findByIdAndDelete(req.query.id);
        fs.unlinkSync(delimage.image);

        let deleteuser = await productModel.findByIdAndDelete(req.query.id);
        return res.status(200).send({
            sucess: true,
            message: "deletesucessfully",
            deleteuser
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateproduct = async (req, res) => {
    try {
        let oldimage = await productModel.findById(req.query.id);
        fs.unlinkSync(oldimage.image);
    } catch (error) {
        console.log(error);
        return false;
    }

    try {
        if (req.file) {
            image = req.file.path
        }
        let update = await productModel.findByIdAndUpdate(req.query.id, {
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
            desc: req.body.desc,
            image: image,
        })
        return res.status(200).send({
            sucess: true,
            message: "product update sucessfully",
            update
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const activeproduct = async (req, res) => {
    try {
        let status = req.body.status;
        let update = await productModel.findByIdAndUpdate(req.query.id, {
            status: status
        })
        if (status == 0) {
            return res.status(200).send({
                sucess: true,
                message: "product Inactive"
            })
        } else if (status == 1) {
            return res.status(200).send({
                sucess: true,
                message: "product active,"
            })
        } else {
            return res.status(400).send({
                sucess: false,
                message: "product invalid choice",
            })
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const adminviewproduct = async (req, res) => {
    try {
        let active = await productModel.find({ status: 1 });
        let inactive = await productModel.find({ status: 0 });
        return res.status(200).send({
            sucess: true,
            message: "catory view sucessfully",
            active,
            inactive
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    productAdd, updateproduct, viewproduct, deleteproduct, activeproduct, adminviewproduct
})