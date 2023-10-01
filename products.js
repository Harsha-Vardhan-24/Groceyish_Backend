const express = require("express");
const router = express();
const mongoose = require("mongoose");
require("dotenv").config();

const { productsDB } = require("./db");

const { userDB } = require("./db");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  featured: { type: Boolean },
  bestSelling: { type: Boolean },
});

productsDB.model("Product", productSchema);

const Product = productsDB.model("Product");

const User = userDB.model("User");

router.get("/", (req, res) => {
  res.send("This is products page");
});

router.post("/add", (req, res) => {
  const { Name, Type, Image_url, Price, Featured, BestSelling } = req.body;
  const product = new Product({
    name: Name,
    category: Type,
    image: Image_url,
    price: Price,
    featured: Featured,
    bestSelling: BestSelling,
  });
  product
    .save()
    .then(() => {
      res.json({ message: "Product saved successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error saving the product" });
    });
});

router.get("/getproducts", async (req, res) => {
  const featuredProducts = await Product.find({ featured: true })
    .sort({
      createdAt: -1,
    })
    .limit(4);

  const bestSelling = await Product.find({ bestSelling: true })
    .sort({ createdAt: -1 })
    .limit(4);

  res.json({ featuredProducts, bestSelling });
});

router.post("/getcartdata", async (req, res) => {
  const { cartItems, email } = req.body;
  const productsData = [];

  // console.log(cartItems);

  const returnUser = await User.findOne({ email: email });
  const cartData = returnUser.cart[0];
  returnUser.cart.splice(1);

  if (cartItems.length !== 0) {
    returnUser.cart.unshift(cartItems);
    try {
      returnUser.save();
    } catch (error) {
      console.error(error);
    }
  }

  await Promise.all(
    cartData.map(async (item) => {
      const findProduct = await Product.findOne({ _id: item });
      productsData.push(findProduct);
    })
  );
  res.json({ cart: productsData });
});

module.exports = router;
