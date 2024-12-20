const express = require("express");
const router = express.Router();
const { adminModel } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateAdmin = require("../middlewares/admin");

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
        let token = jwt.sign({email:"singhyash3012@gmail.com"}, process.env.JWT_KEY);
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
        let token = jwt.sign({email:"singhyash3012@gmail.com"}, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/admin/dashboard");
    }
});

router.get("/dashboard", validateAdmin,  function(req,res){
    res.render("admin_dashboard");
});

module.exports = router;
