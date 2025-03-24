import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import * as path from "path";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: path.resolve(__dirname, "../../.env.development") });
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USERNAME:", process.env.DB_USERNAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "NO DEFINIDA");
const dbConfig = {
  type: "postgres",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities: ["dist/**/*.entity.{ts,js}"],
  migrations: ["dist/migrations/*.{js,ts}"],
};
export default registerAs("typeorm", () => dbConfig);
export const connectionSource = new DataSource(dbConfig as DataSourceOptions);
