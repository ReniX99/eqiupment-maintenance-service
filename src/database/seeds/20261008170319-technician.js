'use strict';
import bcrypt from "bcrypt"

if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile(".env");
}


export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert("users", [
    {
      id: "9820908d-67ce-48e7-9747-e19f36a38beb",
      login: process.env.TECHNICIAN_LOGIN,
      hash_password: bcrypt.hashSync(process.env.TECHNICIAN_PASSWORD, Number(process.env.SALT_ROUNDS) || 10),
      role: "technician",
      technician_id: "cec9954a-f580-499e-9944-2fd68a96f766"
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("users", null, {})
}
