const express = require("express");
const router = express.Router();
const { Group } = require("../Data/models");

router.get("/", (req, res) => {
  Group.findAll().then((groups) => {
    res.json(groups);
  });
});

router.get("/:id", (req, res) => {
  Group.findByPk(req.params.id).then((group) => {
    res.json(group);
  });
});

module.exports = router;
