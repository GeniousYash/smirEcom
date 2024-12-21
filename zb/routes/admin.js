const express = require("express");
const router = express.Router();
const { adminModel } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validateAdmin} = require("../middlewares/admin");
const { productModel } = require("../models/product");
const { categoryModel } = require("../models/category");

router.get("/create", async function( req, res ){
    try{
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash("smiradmin", salt);
        let user = new adminModel({
            name:"Yash",
            email:"singhyash3012@gmail.com",
            password: hash,
            role: "admin",
        });

        await user.save();
        let token = jwt.sign({email:"singhyash3012@gmail.com", admin: true}, process.env.JWT_KEY);
        res.cookie("token", token);
        res.send("admin created successfully");
    }catch(err){
        res.send(err.message);
    }
});

router.get("/login", function(req,res){
    res.render("admin_login");
});

router.post("/login", async function(req,res){
    let {email, password} = req.body;

    let admin = await adminModel.findOne({email});
    if(!admin){
        return res.send("This admin not available");
    }

    let valid = await bcrypt.compare(password, admin.password);
    if(valid){
        let token = jwt.sign({email:"singhyash3012@gmail.com", admin: true}, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/admin/dashboard");
    }
});

router.get("/dashboard", validateAdmin, async function(req,res){
    let prodcount = await productModel.countDocuments();
    let categcount = await categoryModel.countDocuments();
    res.render("admin_dashboard", { prodcount , categcount });
});

router.get("/products", validateAdmin, async function(req,res){
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

    const resultObject = resultArray.reduce((acc,item)=>{
        acc[item.category] = item.products;
        return acc;
    },{});
    res.render("admin_products", {products: resultObject});
});

router.get("/logout",validateAdmin, function(req,res){
    res.cookie("admin_dashboard");
    res.redirect("/admin/login");
});

module.exports = router;
