'use strict';
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn("request_status_history", "author", {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: { len: [3, 100] },
  })
  await queryInterface.changeColumn("request_status_history", "comment", {
    type: DataTypes.STRING(2000),
    allowNull: true,
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn("request_status_history", "author", {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { len: [3, 100] },
  })
  await queryInterface.changeColumn("request_status_history", "comment", {
    type: DataTypes.STRING(2000),
    allowNull: false,
  })
}
