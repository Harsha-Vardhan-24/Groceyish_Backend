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
  username: { type: String, unique: true },
  password: { type: String, required: true },
});

mongoose.model("User", userSchema);

const User = mongoose.model("User");

router.get("/", async (req, res) => {
  res.send(`This is the authentication page`);
});

router.post("/", async (req, res) => {
  try {
    const values = req.body;
    if (values.username === "") {
      const userExsists = await User.findOne({ email: values.email });
      if (userExsists) {
        const userPass = await User.findOne({ password: values.password });
        if (userPass) {
          const user = await User.findOne({ email: values.email });
          return res.json({
            message: "Correct Password",
            username: user.username,
          });
        } else {
          return res.json({ message: "Wrong Password" });
        }
      } else {
        return res.json({ message: "User not found" });
      }
    } else {
      const newUser = new User({
        email: values.email,
        username: values.username,
        password: values.password,
      });
      newUser
        .save()
        .then((savedUser) => {
          console.log("User saved successfully: ", savedUser);
        })
        .catch((error) => {
          console.error("Error saving user: ", error);
        });
      return res.json({ message: "User auth success" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
