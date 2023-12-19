const express = require("express");
const router = express.Router();
const { PriceType } = require("../Data/models");

router.get("/", (req, res) => {
  PriceType.findAll().then((priceTypes) => {
    res.json(priceTypes);
  });
});

router.get("/:id", (req, res) => {
  PriceType.findByPk(req.params.id).then((priceType) => {
    res.json(priceType);
  });
});

module.exports = router;
