const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Item = require("../models/Item");
const Sequalize = require("sequelize");
const Op = Sequalize.Op;

// get item list
router.get("/", (req, res) => {
  Item.findAll()
    .then(items => res.render("items", { items }))
    .catch(err => console.log(err));
});

// display add form
router.get("/add", (req, res) => {
  res.render("add");
});

// Add item
router.post("/add", (req, res) => {
  // const data = {
  //   item_name: "pasta",
  //   item_cost: "40000",
  //   item_units: "20",
  //   item_unit_price: "0"
  // };

  let { item_name, item_cost, item_units } = req.body;

  let errors = [];

  //validate fields
  if (!item_name) {
    errors.push({ text: "Ingresa un nombre" });
  }
  if (!item_cost) {
    errors.push({ text: "Ingresa un costo de compra" });
  }
  if (!item_units) {
    errors.push({ text: "Ingresa la cantidad o unidades del producto" });
  }

  //   console.log(item_unit_price);

  if (errors.length > 0) {
    res.render("add", {
      errors,
      item_name,
      item_cost,
      item_units
    });
  } else {
    let item_unit_price = +item_cost / item_units;
    item_unit_price = item_unit_price + parseInt(item_unit_price) * 0.2;
    item_unit_price = `$${item_unit_price}`;

    //lower case name
    item_name = item_name.toLowerCase();

    // insert into table
    Item.create({
      item_name,
      item_cost,
      item_units,
      item_unit_price
    })
      .then(item => res.redirect("/items"))
      .catch(err => console.log(err));
  }
});

router.get("/search", (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();
  Item.findAll({ where: { item_name: { [Op.like]: "%" + term + "%" } } })
    .then(items => res.render("items", { items }))
    .catch(err => console.log(err));
});

module.exports = router;
