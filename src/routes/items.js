const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Item = require("../models/Item");

// get item list
router.get("/", (req, res) => {
  Item.findAll()
    .then(items => {
      console.log(items);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

// Add item
router.get("/add", (req, res) => {
  const data = {
    item_name: "maiz",
    item_cost: "30000",
    item_units: "10",
    item_unit_price: "0"
  };

  let { item_name, item_cost, item_units, item_unit_price } = data;
  item_unit_price = +item_cost / item_units;

  //   console.log(item_unit_price);

  Item.create({
    item_name,
    item_cost,
    item_units,
    item_unit_price
  })
    .then(item => res.redirect("/items"))
    .catch(err => console.log(err));
});

module.exports = router;
