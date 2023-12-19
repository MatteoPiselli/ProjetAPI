const express = require("express");
const router = express.Router();
const { Audience } = require("../Data/models");

router.get("/", (req, res) => {
  Audience.findAll().then((audiences) => {
    res.json(audiences);
  });
});

router.get("/:id", (req, res) => {
  Audience.findByPk(req.params.id).then((audience) => {
    res.json(audience);
  });
});

module.exports = router;
