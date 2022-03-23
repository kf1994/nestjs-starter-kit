import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
	type: process.env.DATABASE_TYPE || "postgres",
	host: process.env.DATABASE_HOST || "localhost",
	port: process.env.DATABASE_PORT || 5432,
	username: process.env.DATABASE_USERNAME || "postgres",
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	synchronize: +process.env.DATABASE_SYNCHRONIZE || 1,
	autoLoadEntities: +process.env.DATABASE_AUTOLOADENTITIES || 1,
}));
