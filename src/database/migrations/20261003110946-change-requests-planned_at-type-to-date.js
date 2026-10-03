'use strict';
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn("maintenance_requests", "planned_at", {
    type: DataTypes.DATE
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn("maintenance_requests", "planned_at", {
    type: DataTypes.DATEONLY
  })

}
