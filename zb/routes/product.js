const express = require("express");
const router = express.Router();
const { productModel, validateProduct } = require("../models/product");
const { categoryModel, validateCategory } = require("../models/category");
const upload = require("../config/multer_config");
const {validateAdmin, userIsLoggedIn} = require("../middlewares/admin");
const { cartModel, validateCart } = require("../models/cart");


router.get("/",userIsLoggedIn, async function(req,res){
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
                products: {
                    $map: {
                        input: "$products",
                        as: "product",
                        in: {
                            _id: "$$product._id",
                            name: "$$product.name",
                            price: "$$product.price",
                            stock: "$$product.stock",
                            inStock: { $gt: ["$$product.stock", 0] },
                        },
                    },
                },
            },
        },
    ]);

    let cart = await cartModel.findOne({ user: req.session.passport.user })
    if(cart && cart.products.length > 0) somethingInCart = true;

    let rnproducts = await productModel.aggregate([{ $sample: {size: 20} }]);

    const resultObject = resultArray.reduce((acc,item)=>{
        acc[item.category] = item.products;
        return acc;
    },{});
    // res.render("index", {
    //     products: resultObject,
    //     rnproducts ,
    //     somethingInCart,
    //     cartCount: cart ? cart.products.length : 0,
    // });
    res.json({
        products: resultObject,
        rnproducts ,
        somethingInCart,
        cartCount: cart ? cart.products.length : 0,
    });
});



// router.get("/delete/:id", validateAdmin,  async function(req,res){
//     try {
//         if(req.user.admin){
//             await productModel.findOneAndDelete({_id: req.params.id});
//             return res.redirect("/admin/products");
//         }
//         res.send("You are not allowed to delete this products");
//     } catch (error) {
//         res.send(error.message);
//     }
// });

router.post("/delete", validateAdmin,  async function(req,res){
    if(req.user.admin){
        await productModel.findOneAndDelete({_id: req.body.product_id});
        return res.redirect("back");
    }
    res.send("You are not allowed to delete this products");
});

router.patch("/reduce-stock/:id", validateAdmin, async (req, res) => {
    try {
        if(req.user.admin){
            const product = await productModel.findById(req.params.id);
            if (!product) return res.status(404).send("Product not found");

            if (product.stock > 0) {
                product.stock -= 1;
                await product.save();
                res.status(200).send("Stock reduced by 1");
            } else {
                res.status(400).send("Stock is already 0");
        }} else{
            res.send("You are not allowed to change the Stock of a Product")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.patch('/add-stock/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        product.stock += 1;
        await product.save();

        res.status(200).send({ message: 'Stock added successfully', product });
    } catch (error) {
        res.status(500).send({ message: 'Error adding stock', error });
    }
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
