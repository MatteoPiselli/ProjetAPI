const express = require("express");
const router = express.Router();
const { AccessType } = require("../Data/models");

router.get("/", (req, res) => {
  AccessType.findAll().then((accessTypes) => {
    res.json(accessTypes);
  });
});

router.get("/:id", (req, res) => {
  AccessType.findByPk(req.params.id).then((accessType) => {
    res.json(accessType);
  });
});

module.exports = router;
