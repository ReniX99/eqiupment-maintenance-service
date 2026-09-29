'use strict';
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert("sites", [
    {
      id: "abeee4c4-e633-484e-a689-183ef7c5d92e",
      name: "Site 1",
      code: "S001",
      region: "Moscow",
      latitude: 55.682664,
      longitude: 37.575993
    },

    {
      id: "c3c0e516-4c76-4fcf-824c-d773a9a96c5b",
      name: "Site 2",
      code: "S002",
      region: "Saint-Petersburg",
      latitude: 59.856669,
      longitude: 30.360052
    }
  ])
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("sites", null, {})
}
