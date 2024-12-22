const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Welcome to SMIR ECOM");
});

// router.get("/map/:orderid", (req, res)=>{
//     res.render("map", { orderid:req.params.orderid });
// });


module.exports = router;
