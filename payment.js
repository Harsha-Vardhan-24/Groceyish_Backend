const express = require("express");
const router = express();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

router.get("/", (req, res) => {
  res.send("This is payments page");
});

router.post("/create-payment", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.totalPrice,
      currency: "INR",
    });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
});

module.exports = router;
