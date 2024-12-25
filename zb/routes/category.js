const express = require("express");
const router = express.Router();
const { categoryModel, validateCategory } = require("../models/category");
const {validateAdmin} = require("../middlewares/admin");

router.post("/create", validateAdmin, async function(req, res){
    await categoryModel.create({
        name: req.body.name,
    });

    res.redirect("back");
});

router.get("/getcateg",validateAdmin, async (req, res) => {
    try {
        const categories = await categoryModel.find({}, '_id name');
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
    }
});

// router.post("/delete/categ",validateAdmin, async (req, res) => {
//         if(req.user.admin){
//             await categoryModel.findOneAndDelete({_id: req.body.catagory_id});
//             return res.redirect("/admin/dashboard");
//         }
//         res.send("You are not allowed to delete this Category");

// });
// using this instead of upper code to check if it contains product or not , according to it we will delete the category from DB
router.post("/delete/categ", validateAdmin, async (req, res) => {
    try {
        if (req.user.admin) {
            // Find the category by ID
            const category = await categoryModel.findById(req.body.catagory_id);

            if (!category) {
                return res.status(404).send("Category not found");
            }

            // Check if any products are associated with the category
            const products = await productModel.find({ category: category._id });

            if (products.length > 0) {
                // If products are found, do not delete the category
                return res.send("Cannot delete category as it has products associated with it.");
            }

            // If no products are associated, proceed with deletion
            await categoryModel.findOneAndDelete({ _id: req.body.catagory_id });
            return res.redirect("/admin/dashboard");
        }

        res.send("You are not allowed to delete this Category");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});



// router.post("/create", validateAdmin, async function(req, res){
//     let category = await categoryModel.create({
//         name: req.body.name,
//     });

//     res.redirect("back");
// });

module.exports = router;
