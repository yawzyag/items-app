const Sequalize = require("sequelize");
const db = require("../config/database");

const Item = db.define("item", {
  item_name: { type: Sequalize.STRING },
  item_cost: { type: Sequalize.STRING },
  item_units: { type: Sequalize.STRING },
  item_unit_price: { type: Sequalize.STRING }
});

module.exports = Item;
