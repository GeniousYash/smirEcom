const express = require("express");
const router = express.Router();
const { productModel, validateProduct } = require("../models/product");
const upload = require("../config/multer_config");

router.get("/", async function(req,res){
    let prods = await productModel.find();
    res.send(prods);
});

router.post("/", upload.single("image") , async function(req,res){
    let { name, price, category, stock, description, image } = req.body;
    let { error } = validateProduct({ name, price, category, stock, description, image });
    if(error) return res.send(error.message);

    productModel.create({ name, price, category, stock, description, image: req.file.buffer, })
})



module.exports = router;
