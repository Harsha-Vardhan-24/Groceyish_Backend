const express = require("express");
const router = express();
const mongoose = require("mongoose");
require("dotenv").config();
const username = process.env.CONNECTIONUSERNAME;
const password = process.env.CONNECTIONPASSWORD;

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.cnfgi4e.mongodb.net/users?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error(error);
  });

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

mongoose.model("User", userSchema);

const User = mongoose.model("User");

router.get("/", async (req, res) => {
  const newUser = new User({
    email: "h@h.com",
    password: "randomData",
  });
  try {
    await newUser.save();
    console.log("User saved");
  } catch (error) {
    console.error(error);
  }
  res.send(`This is the authentication page`);
});

module.exports = router;
