const express = require("express");
const router = express.Router();
const { cartModel, validateCart } = require("../models/cart");
const {validateAdmin, userIsLoggedIn} = require("../middlewares/admin");
const { productModel } = require("../models/product");

router.get("/", userIsLoggedIn, async function(req,res){
    try {
        let cart = await cartModel
            .findOne({ user: req.session.passport.user })
            .populate("products");

        let CartDataStructure = {};

        cart.products.forEach(product=>{
            let key = product._id.toString();
            if(CartDataStructure[key]){
                CartDataStructure[key].quantity += 1;
            } else {
                CartDataStructure[key] = {
                    ...product._doc,
                    quantity: 1,
                };
            }
        });
        let finalarray = Object.values(CartDataStructure);

        let finalprice = cart.totalPrice;

        // res.render( "cart", { cart: finalarray, finalprice: finalprice, userid: req.session.passport });
        res.status(200).json({ cart: finalarray, finalprice: finalprice, userid: req.session.passport });
    } catch (error) {
        res.send(error.message);
    }
})

router.get("/add/:id", userIsLoggedIn, async function(req,res){
    try {
        let cart = await cartModel.findOne({ user: req.session.passport.user });
        let product = await productModel.findOne({ _id: req.params.id });
        if(!cart){
            cart = await cartModel.create({
                user: req.session.passport.user ,
                products: [req.params.id],
                totalPrice: Number(product.price),
            });
        } else {
            cart.products.push(req.params.id);
            cart.totalPrice = Number(cart.totalPrice) + Number(product.price);

            await cart.save();
        }

        res.redirect("back");
    } catch (error) {
        res.send(error.message);
    }
});

router.get("/remove/:id", userIsLoggedIn, async function(req,res){
    try {
        let cart = await cartModel.findOne({ user: req.session.passport.user });
        let product = await productModel.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        // Check if the product is in stock
        if (product.stock <= 0) {
            return res.status(400).send("Product is out of stock");
        }
        if(!cart){
            return res.send("there is nothing in the cart");
        } else {
            let prodId = cart.products.indexOf(req.params.id);
            cart.products.splice(prodId, 1);
            cart.totalPrice = Number(cart.totalPrice) - Number(product.price);

            await cart.save();
        }
        product.stock -= 1;
        await product.save();
        res.redirect("back");
    } catch (error) {
        res.send(error.message);
    }
});


router.get("/remove/:id", userIsLoggedIn, async function(req,res){
    try {
        let cart = await cartModel.findOne({ user: req.session.passport.user });
        if(!cart) return res.send("Something Went Wrong While Removing Item");
        let index = cart.products.indexOf(req.params.id);
        if(index !== -1) cart.products.splice(index, 1);
        else return res.send("Item is not in the cart.")

        await cart.save();
        res.redirect("back");
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;
