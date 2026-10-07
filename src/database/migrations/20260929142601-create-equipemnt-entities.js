'use strict';
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("sites", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING(100),
      validate: {
        len: [3, 100]
      }
    },

    code: {
      type: DataTypes.STRING,
      unique: true
    },

    region: {
      type: DataTypes.STRING,
    },

    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  })

  await queryInterface.createTable("equipments", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    site_id: {
      type: DataTypes.UUID, allowNull: false,
      references: {
        model: "sites",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },

    type: {
      type: DataTypes.ENUM("turbine", "inverter", "sensor", "substation"),
      allowNull: false
    },

    serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    status: {
      type: DataTypes.ENUM("operational", "maintenance", "fault", "decommissioned"),
      allowNull: false
    },

    installed_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  })

  await queryInterface.createTable("equipment_passports", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    producer: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },

    model: {
      type: DataTypes.STRING,
      allowNull: false
    },

    power: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    last_check: {
      type: DataTypes.DATE,
      allowNull: false
    },

    equipment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "equipments",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("equipment_passports")
  await queryInterface.dropTable("equipments")
  await queryInterface.dropTable("sites")

  await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_equipments_type"`)
  await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_equipments_status"`)
}
