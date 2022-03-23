import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
	name: process.env.APP_NAME || "NestJS App",
	host: process.env.APP_HOST || "localhost",
	env: process.env.APP_ENV || "development",
	maintenance: +process.env.MAINTENANCE || 1,
	port: +process.env.APP_PORT || 3000,
	jwtSecret: process.env.JWT_SECRET,
}));
