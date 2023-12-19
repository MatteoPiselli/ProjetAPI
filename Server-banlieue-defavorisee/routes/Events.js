const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");
const {
  Event,
  Tag,
  EventTag,
  AccessType,
  PriceType,
  Audience,
  Group,
  Address,
} = require("../Data/models");

router.get("/", (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 3;
  let offset = limit * (page - 1);

  let group_id = req.query.group_id;
  let tag_ids = req.query.tag_ids;
  let accessType_id = req.query.accessType_id;
  let priceType_id = req.query.priceType_id;
  let audience_id = req.query.audience_id;
  let addresse_id = req.query.addresse_id;

  let next = "/api/events?page=" + (page + 1) + "&limit=" + limit;
  let prev = "/api/events?page=" + (page - 1) + "&limit=" + limit;
  if (page == 1) {
    prev = null;
  }

  let count = 0;

  let whereClause = {};
  if (group_id) whereClause.group_id = group_id;
  if (accessType_id) whereClause.accessType_id = accessType_id;
  if (priceType_id) whereClause.priceType_id = priceType_id;
  if (audience_id) whereClause.audience_id = audience_id;
  if (addresse_id) whereClause.addresse_id = addresse_id;

  Event.findAll({
    offset: offset,
    limit: limit,
    where: whereClause,

    include: [
      {
        model: Tag,
        as: "tags",
        through: { model: EventTag, attributes: [] },
        where: {
          id: { [Op.in]: tag_ids },
        },
      },
      {
        model: AccessType,
        as: "accessType",
      },
      {
        model: PriceType,
        as: "priceType",
      },
      {
        model: Audience,
        as: "audience",
      },
      {
        model: Group,
        as: "group",
      },
      {
        model: Address,
        as: "address",
      },
    ],
  }).then((events) => {
    if (events.length < limit) {
      next = null;
    }
    if (events.length < limit) {
      count += events.length + offset;
    } else {
      count += events.length * page;
    }

    ret = {
      count: count,
      next: next,
      previous: prev,
      results: events,
    };
    res.json(ret);
  });
});

router.get("/:id", (req, res) => {
  Event.findByPk(req.params.id, {
    include: [
      {
        model: Tag,
        as: "tags",
        through: { model: EventTag, attributes: [] },
      },
      {
        model: AccessType,
        as: "accessType",
      },
      {
        model: PriceType,
        as: "priceType",
      },
      {
        model: Audience,
        as: "audience",
      },
      {
        model: Group,
        as: "group",
      },
      {
        model: Address,
        as: "address",
      },
    ],
  }).then((event) => {
    return event.getTags().then((tags) => {
      event.tags = tags;
      res.json(event);
    });
  });
});


module.exports = router;
