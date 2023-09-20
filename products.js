const express = require("express");
const router = express();
const mongoose = require("mongoose");
require("dotenv").config();

const { productsDB } = require("./db");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

productsDB.model("Product", productSchema);

const Product = productsDB.model("Product");

router.get("/", (req, res) => {
  res.send("This is products page");
});

router.post("/add", (req, res) => {
  const { Name, Type, Image_url, Price } = req.body;
  const product = new Product({
    name: Name,
    category: Type,
    image: Image_url,
    price: Price,
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

module.exports = router;
