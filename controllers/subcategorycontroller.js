const categoryModel = require('../models/categoryModel');
const subcategoryModel = require('../models/subcategorymodel');

const subcategoryAdd = async (req, res) => {
    try {
        let duplicatesubcategory = await subcategoryModel.findOne({ subcategory: req.body.subcategory })
        if (duplicatesubcategory) {
            return res.status(200).send({
                sucess: true,
                message: "category already added",
            })
        }

        let subcategoryAdd = await subcategoryModel.create({
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategory,
        })
        return res.status(200).send({
            sucess: true,
            message: "subcategory Add sucessfully",
            subcategoryAdd
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const subcategoryView = async (req, res) => {
    try {
        let viewUser = await subcategoryModel.find({}).populate('categoryId');
        return res.status(200).send({
            sucess: true,
            message: "category View Sucessfully",
            viewUser
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deletesubcategory = async (req, res) => {
    try {
        let deleteuser = await subcategoryModel.findByIdAndDelete(req.query.id);
        return res.status(200).send({
            sucess: true,
            message: "subcategory delete sucessfully",
            deleteuser
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updatesubcategory = async (req, res) => {
    try {
        let updateUser = await subcategoryModel.findByIdAndUpdate(req.query.id, {
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategory,
        })
        return res.status(200).send({
            sucess: true,
            message: "subcategory update suessfully",
            updateUser
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const activesubcategory = async (req, res) => {
    try {
        let status = req.body.status
        let update = await subcategoryModel.findByIdAndUpdate(req.query.id, {
            status: status
        })
        if (status == 0) {
            return res.status(200).send({
                sucess: true,
                message: "subcategory Inactive",
            })
        } else if (status == 1) {
            return res.status(200).send({
                sucess: true,
                message: "subcategory active",
            })
        } else {
            return res.status(400).send({
                sucess: false,
                message: "category invalid choice"
            })
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const adminviewsubcategory = async (req, res) => {
    try {
        let active = await subcategoryModel.find({ status: 1 });
        let inactive = await subcategoryModel.find({ status: 0 });
        return res.status(200).send({
            sucess: true,
            message: "subcategory featch",
            active,
            inactive
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    subcategoryAdd, subcategoryView, deletesubcategory, updatesubcategory, activesubcategory, adminviewsubcategory
})