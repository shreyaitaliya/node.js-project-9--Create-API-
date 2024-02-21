const express = require('express');

const routes = express.Router();

//authcontroller
const authcontroller = require('../controllers/AuthController');

const { verifytoken, roleBaseAuth } = require('../middleware/authMiddleware');

//register user
const usercontroller = require('../controllers/usercontroller');

//category controller
const categorycontroller = require('../controllers/categorycontroller');

//subcategory controller
const subcategoryController = require('../controllers/subcategorycontroller');

//product controller
const productController = require('../controllers/productController');

//add to cart
const addcartcontroller = require('../controllers/addcartcontroller');

//multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage }).single('image');

//login
routes.post('/login', authcontroller.login);
routes.post('/changepassword', verifytoken, authcontroller.changepassword);
//register
routes.post('/registerUser', usercontroller.registerUser);

//category
routes.post('/categoryAdd', verifytoken, roleBaseAuth(["admin", "manager"]), categorycontroller.categoryAdd);
routes.get('/viewcategory', categorycontroller.viewcategory);
routes.delete('/deleteCategory', verifytoken, roleBaseAuth(["admin"]), categorycontroller.deleteCategory);
routes.put('/updateCategory', verifytoken, roleBaseAuth(["admin"]), categorycontroller.updateCategory);
routes.put('/activecategory', verifytoken, roleBaseAuth(["admin", "manager"]), categorycontroller.activecategory);
routes.get('/adminview', verifytoken, roleBaseAuth(["admin"]), categorycontroller.adminview);

//subcategory
routes.post('/subcategoryAdd', verifytoken, roleBaseAuth(["admin", "manager"]), subcategoryController.subcategoryAdd);
routes.get('/subcategoryView', verifytoken, subcategoryController.subcategoryView);
routes.delete('/deletesubcategory', verifytoken, roleBaseAuth(["admin"]), subcategoryController.deletesubcategory);
routes.put('/updatesubcategory', verifytoken, roleBaseAuth(["admin"]), subcategoryController.updatesubcategory);
routes.put('/activesubcategory', roleBaseAuth(["admin", "manager"]), subcategoryController.activesubcategory);
routes.get('/adminviewsubcategory', roleBaseAuth(["admin"]), subcategoryController.adminviewsubcategory);

//product
routes.post('/productAdd', verifytoken, upload, roleBaseAuth(["admin", "manager"]), productController.productAdd);
routes.get('/viewproduct', verifytoken, productController.viewproduct);
routes.delete('/deleteproduct', verifytoken, roleBaseAuth(["admin"]), productController.deleteproduct);
routes.put('/updateproduct', verifytoken, upload, roleBaseAuth(["admin"]), productController.updateproduct);
routes.put('/activeproduct', roleBaseAuth(["admin", "manager"]), productController.activeproduct);
routes.get('/adminviewproduct', roleBaseAuth(["admin"]), productController.adminviewproduct);

//add to cart
routes.post('/addtocart', verifytoken, addcartcontroller.addtocart);
routes.get('/viewcart', verifytoken, addcartcontroller.viewcart);




module.exports = routes;