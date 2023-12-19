const express = require("express");
const router = express.Router();
const { Tag } = require("../Data/models");

router.get("/", (req, res) => {
  Tag.findAll().then((tags) => {
    res.json(tags);
  });
});

router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id).then((tag) => {
    res.json(tag);
  });
});

module.exports = router;
