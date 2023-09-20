const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.CONNECTIONUSERNAME;
const password = process.env.CONNECTIONPASSWORD;

const usersDBConnectionString = `mongodb+srv://${username}:${password}@cluster0.cnfgi4e.mongodb.net/users?retryWrites=true&w=majority`;
const productsDBConnectionString = `mongodb+srv://${username}:${password}@cluster0.cnfgi4e.mongodb.net/products?retryWrites=true&w=majority`;

const userDB = mongoose.createConnection(usersDBConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productsDB = mongoose.createConnection(productsDBConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

userDB.once("open", () => {
  console.log("Connected to usersDB");
});

productsDB.once("open", () => {
  console.log("Connected to productsDB");
});

module.exports = { userDB, productsDB };
