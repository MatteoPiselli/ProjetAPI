const { readFileSync } = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const {
  Event,
  Tag,
  EventTag,
  AccessType,
  PriceType,
  Audience,
  Group,
  Address,
} = require("./models");

const raw = readFileSync(path.resolve(__dirname, "que-faire-a-paris.json"));

let data = JSON.parse(raw);

// connexion à la base de données
const sequelize = new Sequelize(
  "banlieu-defavorise_qfap",
  "339741",
  "QFAPesd2023!",
  {
    host: "mysql-banlieu-defavorise.alwaysdata.net",
    dialect: "mariadb",
    logging: false,
  }
);

(async () => {
  await sequelize.sync({ force: true }); // Synchronisation avec la base de données, force la recréation des tables (normalement éviter en prod)
  console.log("All models were synchronized successfully.");

  let lat, lon;

  for (d of data) {
    if (d["lat_lon"] !== null) {
      lat = Number(d["lat_lon"]["lat"]).toFixed(4);
      lon = Number(d["lat_lon"]["lon"]).toFixed(4);
    }

    // Création d'une instance d'Event avec les données du fichier JSON
    const event = Event.build({
      id: d["id"],
      url: d["url"],
      title: d["title"],
      lead_text: d["lead_text"],
      description: d["description"],
      cover_url: d["cover_url"],
      date_start: d["date_start"],
      date_end: d["date_end"],
      occurrences: d["occurrences"],
      date_description: d["date_description"],
      pmr: d["pmr"],
      blind: d["blind"],
      deaf: d["deaf"],
      transport: d["transport"],
      price_detail: d["price_detail"],
      access_link: d["access_link"],
      access_link_text: d["access_link_text"],
      updated_at: d["updated_at"],
      title_event: d["title_event"],
      address_text: d["address_text"],
      lat: lat,
      lon: lon,
    });
    await event.save(); // Sauvegarde de l'instance Event dans la base de données

    if (d["tags"] !== null) {
      // Pour chaque tag dans l'intance Event
      for (t of d["tags"]) {
        let [tag, created] = await Tag.findOrCreate({
          where: { tag: t }, // Recherche ou création du tag dans la base de données
        });

        if (created) {
          console.log(`Tag '${t}' created`);
        }

        // Création de l'association Event-Tag
        const eventTag = EventTag.build({
          EventId: d["id"],
          TagId: tag.id,
        });
        await eventTag.save(); // Sauvegarde de l'association dans la base de données
      }
    }

    if (d["access_type"] !== null) {
      // Recherche ou création de l'access_type dans la base de données
      let [accessType, created] = await AccessType.findOrCreate({
        where: { access_type: d["access_type"] },
      });

      if (created) {
        console.log(`Access type '${d["access_type"]}' created`);
      }

      // Association Event-AccessType
      event.accessType_id = accessType.id;
      await event.save();
    }

    if (d["price_type"] !== null) {
      // Recherche ou création du price_type dans la base de données
      let [priceType, created] = await PriceType.findOrCreate({
        where: { price_type: d["price_type"] },
      });

      if (created) {
        console.log(`Price type '${d["price_type"]}' created`);
      }

      // Association Event-PriceType
      event.priceType_id = priceType.id;
      await event.save();
    }

    if (d["audience"] !== null) {
      // Recherche ou création de l'audience dans la base de données
      let [audience, created] = await Audience.findOrCreate({
        where: { audience: d["audience"] },
      });

      if (created) {
        console.log(`Audience '${d["audience"]}' created`);
      }

      // Association Event-Audience
      event.audience_id = audience.id;
      await event.save();
    }

    if (d["group"] !== null) {
      // Recherche ou création du group dans la base de données
      let [group, created] = await Group.findOrCreate({
        where: { group: d["group"] },
      });

      if (created) {
        console.log(`Group '${d["group"]}' created`);
      }

      // Association Event-Group
      event.group_id = group.id;
      await event.save();
    }

    // Création d'une instance d'Address avec les données du fichier JSON
    // si l'adresse n'existe pas déjà dans la base de données

    try {
      if (d["address_name"] !== null) {
        let [address, created] = await Address.findOrCreate({
          where: {
            address_name: d["address_name"],
          },
          defaults: {
            address_name: d["address_name"],
            lat: lat,
            lon: lon,
            address_street: d["address_street"],
            address_zipcode: d["address_zipcode"],
            address_city: d["address_city"],
            contact_url: d["contact_url"],
            contact_phone: d["contact_phone"],
            contact_mail: d["contact_mail"],
            contact_facebook: d["contact_facebook"],
            contact_twitter: d["contact_twitter"],
          },
        });

        if (created) {
          console.log(`Address '${d["address_name"]}' created`);
        }

        // Association Event-Address
        event.address_id = address.id;
        await event.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log("Data injection completed successfully.");
})();
