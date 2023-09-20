const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authentication = require("./authenticate");
const products = require("./products");

const PORT = process.env.PORT || 5000;

// Building MongoConnection

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/authenticate", authentication);

app.use("/products", products);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running on ${PORT}`);
  }
});
