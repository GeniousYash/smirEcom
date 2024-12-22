require("dotenv").config();
const express=require("express");
const router = express.Router();
const { paymentModel } = require("../models/payment");
const Razorpay = require("razorpay");
const { cartModel } = require("../models/cart.js");


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create/orderId", async (req,res)=>{
    try {

        const cart = await cartModel.findOne({ user:req.session.passport.user });
        if(!cart){
            return res.status(400).send("Cart not found");
        }

        const options = {
            amount: cart.totalPrice * 100,
            currency: "INR",
        };

        const order = await razorpay.orders.create(options);
        res.send(order);

        const newPayment = await paymentModel.create({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            status: "pending",
        });
    } catch (error) {
        res.status(500).send("Error creating order");
    }
});


router.post("/api/payment/verify", async(req,res)=>{
    const {razorpayOrderId, razorpayPaymentId, signature} = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    try {
        const {
            validatePaymentVerification,
        } = require("../node_modules/razorpay/dist/utils/razorpay-utils.js");

        const result = validatePaymentVerification(
            { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
            signature,
            secret
        );

        if(result) {
            const payment = await paymentModel.findOne({ orderId: razorpayOrderId, status: "pending" });
            payment.paymentId = razorpayPaymentId;
            payment.signature = signature;
            payment.status = "completed";
            await payment.save();
            res.json({ status: "success" });
        } else {
            res.status(400).send("Invalid signature");
        }
    } catch (error) {
        res.status(500).send("Error verifying payment");
    }
})


module.exports = router;
