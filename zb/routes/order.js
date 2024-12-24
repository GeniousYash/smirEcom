const express = require("express");
const { paymentModel } = require("../models/payment");
const { orderModel } = require("../models/order");
const { cartModel } = require("../models/cart");
const router = express.Router();

router.get("/:userid/:orderid/:paymentid/:signature",async (req,res)=>{
    let paymentDetails = await paymentModel.findOne({
        orderId: req.params.orderid
    });

    if(!paymentDetails) return res.send("Sorry, This order doesnot exist !");
    if(
        req.params.signature === paymentDetails.signature &&
        req.params.paymentid === paymentDetails.paymentId
    ){
        let cart = cartModel.findOne({ user: req.params.userid });

        // Validate stock before creating order
        const outOfStockProducts = [];
        for (const productId of cart.products) {
            let product = await productModel.findOne({ _id: productId });
            if (product.stock <= 0) {
                outOfStockProducts.push(product.name);
            }
        }

        if (outOfStockProducts.length > 0) {
            return res.status(400).send(
                `The following products are out of stock: ${outOfStockProducts.join(", ")}`
            );
        }

        // Deduct stock for each product
        for (const productId of cart.products) {
            let product = await productModel.findOne({ _id: productId });
            product.stock -= 1;
            await product.save();
        }

        await orderModel.create({
            orderId: req.params.orderid,
            user: req.params.userid,
            products: cart.products,
            totalPrice: cart.totalPrice,
            status: "processing",
            payment: paymentDetails._id
        })
        res.redirect("/products");
    }
    else{
        res.send("Invalid Payment")
    }
});


router.post("/address/:orderid",async (req,res)=>{
    let order = await orderModel.findOne({ orderId: req.params.orderid });
    if(!order) return res.send("Sorry, This order doesn't exist");
    if(!req.body.address) return res.send("You must provide an address");
    order.address = req.body.address;
    order.save();
    res.redirect("/");
});

module.exports = router;
