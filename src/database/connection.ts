import { Sequelize } from "sequelize-typescript";

if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile(".env");
}
export const connection = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/models"],
  logging: false,
});

export async function connect() {
  await connection.authenticate();
}
