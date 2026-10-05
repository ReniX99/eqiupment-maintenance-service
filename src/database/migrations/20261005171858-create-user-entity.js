'use strict';
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    login: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [6, 100]
      },
      unique: true
    },

    hash_password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("viewer", "technician", "admin"),
      defaultValue: "viewer",
      allowNull: false
    },

    technician_id: {
      type: DataTypes.UUID,
      references: {
        model: "technicians",
        key: "id"
      },
      onDelete: "SET NULL"
    }
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("users")

  await queryInterface.sequelize.query(
    `DROP TYPE IF EXISTS "enum_users_role"`
  )
}
