'use strict';
import bcrypt from "bcrypt"

if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile(".env");
}

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert("users", [
    {
      id: "7f64fa92-d51f-4853-abbf-0848e6fccd69",
      login: process.env.ADMIN_LOGIN,
      hash_password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, Number(process.env.SALT_ROUNDS) || 10),
      role: "admin"
    }
  ])
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("users", null, {})
}
