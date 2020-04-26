import dotenv from "dotenv";
import { DataTypes, INTEGER, QueryInterface, Sequelize } from "sequelize";
import { Umzug } from "umzug/lib/src";

dotenv.config();

export const dbConfig = {
  dialect: "sqlite" as "sqlite",
  storage: "data/db/db.sqlite"
};

export const db = new Sequelize(dbConfig);

//
// use sequelize's own migration tool
const seed = new Umzug({
  migrations: {
    path: "./data/migrations",
    params: [QueryInterface],
    pattern: /\.ts$/
  },
  storage: "sequelize",
  storageOptions: { sequelize: db }
});

db.define("carrier", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export const Carrier = db.models.carrier;

db.define("state", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export const State = db.models.state;

db.define("type", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export const Type = db.models.type;

db.define(
  "coverage",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    carrierId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "carriers",
        key: "id"
      }
    },
    stateId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "states",
        key: "id"
      }
    },
    typeId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "types",
        key: "id"
      }
    }
  },
  {
    underscored: true,
    indexes: [
      {
        name: "coverage_unique_idx",
        unique: true,
        fields: ["carrier_id", "type_id", "state_id"]
      }
    ]
  }
);
export const Coverage = db.models.coverage;
Coverage.belongsTo(State, { foreignKey: "state_id" });
Coverage.belongsTo(Carrier, { foreignKey: "carrier_id" });
Coverage.belongsTo(Type, { foreignKey: "type_id" });

//
// seed a note record
export const migrate = async () => {
  await seed.up();
};
