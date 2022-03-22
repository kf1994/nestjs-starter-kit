import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
	env: process.env.APP_ENV,
	maintenance: process.env.MAINTENANCE,
	name: process.env.APP_NAME,
	url: process.env.APP_URL,
	host: process.env.APP_Host,
	port: process.env.APP_PORT,
	jwtSecret: process.env.JWT_SECRET,
}));
