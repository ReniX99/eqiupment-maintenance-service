'use strict';
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn("maintenance_requests", "author", {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: [3, 100]
    }
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn("maintenance_requests", "author", {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  })
}
