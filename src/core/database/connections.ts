import { Sequelize } from "sequelize";
import * as pg from "pg";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres",
    dialectModule: pg,
    define: {
      timestamps: false,
    },
  }
);

export async function connectoinDB() {
  try {
    await sequelize.authenticate();
    console.log("ПОДКЛЮЧЕНИЕ УСПЕШНО!")
    return { success: true };
  } catch (error) {
    console.error("❌ Ошибка базы данных:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export default sequelize;
