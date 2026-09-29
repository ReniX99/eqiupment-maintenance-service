import { Sequelize } from "sequelize-typescript";

const connection = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/models"],
  logging: false,
});

export async function connect() {
  await connection.authenticate();
}
