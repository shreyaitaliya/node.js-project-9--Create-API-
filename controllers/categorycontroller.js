const categoryModel = require('../models/categoryModel')

const categoryAdd = async (req, res) => {
    try {
        let duplicateCategory = await categoryModel.findOne({ category: req.body.category })
        if (duplicateCategory) {
            return res.status(200).send({
                sucess: true,
                message: "category already added"
            })
        }
        let user = await categoryModel.create({
            category: req.body.category,
        })
        return res.status(200).send({
            sucess: "true",
            message: "category sucessfully added",
            user
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const viewcategory = async (req, res) => {
    try {
        const user = await categoryModel.find({ status: 1 });
        return res.status(200).send({
            sucess: true,
            message: "category view sucessfully",
            user
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteCategory = async (req, res) => {
    try {
        const deleteUser = await categoryModel.findByIdAndDelete(req.query.id);
        return res.status(200).send({
            sucess: true,
            message: "delete category sucessfully",
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateCategory = async (req, res) => {
    try {
        let updateUser = await categoryModel.findByIdAndUpdate(req.query.id, {
            category: req.body.category
        })
        return res.status(200).send({
            sucess: true,
            message: "category upadted successfully",
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const activecategory = async (req, res) => {
    try {
        let id = req.query.id;
        let status = req.body.status;
        let update = await categoryModel.findByIdAndUpdate(id, {
            status: status
        })
        if (status == 0) {
            return res.status(200).send({
                sucess: true,
                message: "categpory Dactive",
            })
        } else if (status == 1) {
            return res.status(200).send({
                sucess: true,
                message: "category Active",
            })
        } else {
            return res.status(400).send({
                sucess: false,
                message: "Invalid",
            })
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const adminview = async (req, res) => {
    try {
        let active = await categoryModel.find({ status: 1 });
        let dactive = await categoryModel.find({ status: 0 });
        return res.status(200).send({
            sucess: true,
            message: "category fetch",
            active, dactive
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    categoryAdd, viewcategory, deleteCategory, updateCategory, activecategory, adminview
})