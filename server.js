const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authentication = require("./authenticate");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/authenticate", authentication);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running on ${PORT}`);
  }
});
