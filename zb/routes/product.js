const express = require("express");
const router = express.Router();
const { productModel, validateProduct } = require("../models/product");
const { categoryModel, validateCategory } = require("../models/category");
const upload = require("../config/multer_config");
const {validateAdmin, userIsLoggedIn} = require("../middlewares/admin");
const { cartModel, validateCart } = require("../models/cart");


router.get("/", userIsLoggedIn, async function(req,res){
    let somethingInCart = false;
    const resultArray = await productModel.aggregate([
        {
            $group:{
                _id: "$category",
                products: {$push:"$$ROOT"}
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                products: { $slice: ["$products", 10]}
            }
        }
    ]);

    let cart = await cartModel.findOne({ user: req.session.passport.user })
    if(cart && cart.products.length > 0) somethingInCart = true;

    let rnproducts = await productModel.aggregate([{ $sample: {size: 3} }]);

    const resultObject = resultArray.reduce((acc,item)=>{
        acc[item.category] = item.products;
        return acc;
    },{});
    res.render("index", {
        products: resultObject,
        rnproducts ,
        somethingInCart,
        cartCount: cart ? cart.products.length : 0,
    });
});

router.get("/delete/:id", validateAdmin,  async function(req,res){
    if(req.user.admin){
        await productModel.findOneAndDelete({_id: req.params.id});
        return res.redirect("/admin/products");
    }
    res.send("You are not allowed to delete this products");
});

router.post("/delete", validateAdmin,  async function(req,res){
    if(req.user.admin){
        await productModel.findOneAndDelete({_id: req.body.product_id});
        return res.redirect("back");
    }
    res.send("You are not allowed to delete this products");
});

router.post("/",upload.single("image"), async function(req,res){
    const { name, price, category, stock, description } = req.body;
    let { error } = validateProduct({
        name,
        price,
        category,
        stock,
        description,
    });
    if(error) {
        return res.send(error.message);
    }
    if (!req.file) {
        return res.send("Image file is required");
    }
    let isCategory = await categoryModel.findOne({name:category});
    if(!isCategory){
        await categoryModel.create({name: category});
    }
    await productModel.create({
        name,
        price,
        category,
        stock,
        description,
        image: req.file.buffer,
    })

    res.redirect(`/admin/dashboard`);
});

module.exports = router;
