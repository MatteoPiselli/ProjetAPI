const express = require("express");
const router = express.Router();
const { Address } = require("../Data/models");

router.get("/", (req, res) => {
  Address.findAll().then((addresses) => {
    res.json(addresses);
  });
});

router.get("/:id", (req, res) => {
  Address.findByPk(req.params.id).then((address) => {
    res.json(address);
  });
});

module.exports = router;
