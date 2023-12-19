const express = require("express");
const app = express();
const cors = require("cors");

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
} = require("./Data/models");


// const eventsRouter = require("./routes/Events");
// const tagsRouter = require("./routes/Tags");
// const accessTypesRouter = require("./routes/AccessTypes");
// const audiencesRouter = require("./routes/Audiences");
// const priceTypesRouter = require("./routes/PriceTypes");
// const addressesRouter = require("./routes/Addresses");
// const groupsRouter = require("./routes/Groups");

app.use(cors());

const PORT = 8100;
const IP = "::";

app.get("/api/accessTypes", (req, res) => {
  AccessType.findAll().then((accessTypes) => {
    res.json(accessTypes);
  });
});

app.get("/api/accessTypes/:id", (req, res) => {
  AccessType.findByPk(req.params.id).then((accessType) => {
    res.json(accessType);
  });
});

app.get("/api/adresses", (req, res) => {
  Address.findAll().then((addresses) => {
    res.json(addresses);
  });
});

app.get("/api/adresses/:id", (req, res) => {
  Address.findByPk(req.params.id).then((address) => {
    res.json(address);
  });
});

app.get("/api/audiences", (req, res) => {
  Audience.findAll().then((audiences) => {
    res.json(audiences);
  });
});

app.get("/api/audiences/:id", (req, res) => {
  Audience.findByPk(req.params.id).then((audience) => {
    res.json(audience);
  });
});

app.get("/api/groups", (req, res) => {
  Group.findAll().then((groups) => {
    res.json(groups);
  });
});

app.get("/api/groups/:id", (req, res) => {
  Group.findByPk(req.params.id).then((group) => {
    res.json(group);
  });
});

app.get("/api/priceTypes", (req, res) => {
  PriceType.findAll().then((priceTypes) => {
    res.json(priceTypes);
  });
});

app.get("/api/priceTypes/:id", (req, res) => {
  PriceType.findByPk(req.params.id).then((priceType) => {
    res.json(priceType);
  });
});

app.get("/api/tags", (req, res) => {
  Tag.findAll().then((tags) => {
    res.json(tags);
  });
});

app.get("/api/tags/:id", (req, res) => {
  Tag.findByPk(req.params.id).then((tag) => {
    res.json(tag);
  });
});


app.get("/api/events", (req, res) => {
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
        // where: {
        //   id: { [Op.in]: tag_ids },
        // },

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

    console.log(events);


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

app.get("/api/event/:id", (req, res) => {
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

// app.use("/api/events", eventsRouter);
// app.use("/api/tags", tagsRouter);
// app.use("/api/accessTypes", accessTypesRouter);
// app.use("/api/audiences", audiencesRouter);
// app.use("/api/priceTypes", priceTypesRouter);
// app.use("/api/addresses", addressesRouter);
// app.use("/api/groups", groupsRouter);

app.listen(8080, () => {
  console.log(`Server running at http://${IP}:${PORT}/`);
});
