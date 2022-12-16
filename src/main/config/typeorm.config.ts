import { DataSource } from "typeorm";
import "dotenv/config";
import { appEnv } from "../../app/envs/app.env";

export default new DataSource({
  type: "postgres",
  url: appEnv.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: ["src/app/shared/entities/**/*.ts"],
  migrations: ["src/app/shared/migrations/**/*.ts"],
  schema: "trabalho_final",
});
