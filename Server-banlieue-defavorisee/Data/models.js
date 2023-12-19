
const { Sequelize, DataTypes, Model } = require("sequelize");

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

class Event extends Model {}
class Tag extends Model {}
class EventTag extends Model {}
class AccessType extends Model {}
class PriceType extends Model {}
class Audience extends Model {}
class Group extends Model {}
class Address extends Model {}

AccessType.init(
  // Définition du modèle de la table AccessType
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    access_type: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  // Configuration du modèle AccessType
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "AccessType",
    tableName: "access_types", // Nom de la table dans la base de données
  }
);

PriceType.init(
  // Définition du modèle de la table PriceType
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price_type: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  // Configuration du modèle PriceType
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "PriceType",
    tableName: "price_types", // Nom de la table dans la base de données
  }
);

Audience.init(
  // Définition du modèle de la table Audience
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    audience: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  // Configuration du modèle Audience
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "Audience",
    tableName: "audiences", // Nom de la table dans la base de données
  }
);

Group.init(
  // Définition du modèle de la table Group
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  // Configuration du modèle Group
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "Group",
    tableName: "groups", // Nom de la table dans la base de données
  }
);

Address.init(
  // Définition du modèle de la table Address
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    address_street: {
      type: DataTypes.STRING,
    },
    address_zipcode: {
      type: DataTypes.STRING,
    },
    address_city: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    lon: {
      type: DataTypes.FLOAT,
    },
    contact_url: {
      type: DataTypes.STRING,
    },
    contact_phone: {
      type: DataTypes.STRING,
    },
    contact_mail: {
      type: DataTypes.STRING,
    },
    contact_facebook: {
      type: DataTypes.STRING,
    },
    contact_twitter: {
      type: DataTypes.STRING,
    },
  },
  // Configuration du modèle Address
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "Address",
    tableName: "addresses", // Nom de la table dans la base de données
  }
);

Event.init(
  // Définition du modèle de la table Event
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    lead_text: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },

    cover_url: {
      type: DataTypes.STRING,
    },

    date_start: {
      type: DataTypes.DATE,
    },
    date_end: {
      type: DataTypes.DATE,
    },
    occurrences: {
      type: DataTypes.TEXT,
    },
    date_description: {
      type: DataTypes.TEXT,
    },
    pmr: {
      type: DataTypes.BOOLEAN,
    },
    blind: {
      type: DataTypes.BOOLEAN,
    },
    deaf: {
      type: DataTypes.BOOLEAN,
    },
    transport: {
      type: DataTypes.STRING,
    },
    price_detail: {
      type: DataTypes.STRING,
    },
    access_link: {
      type: DataTypes.STRING,
    },
    access_link_text: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    title_event: {
      type: DataTypes.STRING,
    },
    address_text: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    lon: {
      type: DataTypes.FLOAT,
    },
    accessType_id: {
      type: DataTypes.INTEGER,
      references: {
        model: AccessType,
        key: "id", // Clé étrangère faisant référence à l'ID de la table AccessType
      },
    },
    priceType_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PriceType,
        key: "id", // Clé étrangère faisant référence à l'ID de la table PriceType
      },
    },
    audience_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Audience,
        key: "id", // Clé étrangère faisant référence à l'ID de la table Audience
      },
    },
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Group,
        key: "id", // Clé étrangère faisant référence à l'ID de la table Group
      },
    },
    address_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Address,
        key: "id", // Clé étrangère faisant référence à l'ID de la table Address
      },
    },
  },
  // Configuration du modèle Event
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "Event",
    tableName: "events", // Nom de la table dans la base de données
  }
);

Tag.init(
  // Définition du modèle de la table Tag
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tag: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  // Configuration du modèle Tag
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "Tag",
    tableName: "tags", // Nom de la table dans la base de données
  }
);

EventTag.init(
  // Définition du modèle de la table EventTag
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    EventId: {
      type: DataTypes.INTEGER,
      references: {
        model: Event,
        key: "id", // Clé étrangère faisant référence à l'ID de la table Event
      },
    },
    TagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: "id", // Clé étrangère faisant référence à l'ID de la table Tag
      },
    },
  },
  // Configuration du modèle EventTag
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "EventTag",
    tableName: "event_tags", // Nom de la table dans la base de données
  }
);

// Définition des relations many-to-many entre Event et Tag à travers EventTag
Event.belongsToMany(Tag, { through: "EventTag", as: "tags" });
Tag.belongsToMany(Event, { through: "EventTag", as: "events" });

// Définition des relations many-to-one entre Event et AccessType
AccessType.hasMany(Event, { foreignKey: "accessType_id", as: "events" });
Event.belongsTo(AccessType, { foreignKey: "accessType_id", as: "accessType" });

// Définition des relations many-to-one entre Event et PriceType
PriceType.hasMany(Event, { foreignKey: "priceType_id", as: "events" });
Event.belongsTo(PriceType, { foreignKey: "priceType_id", as: "priceType" });

// Définition des relations many-to-one entre Event et Audience
Audience.hasMany(Event, { foreignKey: "audience_id", as: "events" });
Event.belongsTo(Audience, { foreignKey: "audience_id", as: "audience" });

// Définition des relations many-to-one entre Event et Group
Group.hasMany(Event, { foreignKey: "group_id", as: "events" });
Event.belongsTo(Group, { foreignKey: "group_id", as: "group" });

// Définition des relations many-to-one entre Event et Address
Address.hasMany(Event, { foreignKey: "address_id", as: "events" });
Event.belongsTo(Address, { foreignKey: "address_id", as: "address" });

module.exports = {
  Event,
  Tag,
  EventTag,
  AccessType,
  PriceType,
  Audience,
  Group,
  Address,
};
