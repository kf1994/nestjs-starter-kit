const { join } = require("path");

const winston = require("winston");
import "winston-daily-rotate-file";

const { printf } = winston.format;
const myFormat = printf(({ level, message, timestamp }) => {
	const dt = new Date();
	timestamp = dt.toLocaleString("en-PK");
	return `${timestamp} ${level}: ${message}`;
});

const applicationTransport = new winston.transports.DailyRotateFile({
	filename: join(__dirname, "logs", "application-%DATE%.log"),
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	maxSize: "20m",
	maxFiles: "14d",
	level: "info",
	format: myFormat,
});
const errorTransport = new winston.transports.DailyRotateFile({
	filename: join(__dirname, "logs", "error-%DATE%.log"),
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	maxSize: "20m",
	maxFiles: "14d",
	level: "error",
	format: myFormat,
});
const errorTransportConsole = new winston.transports.Console({
	level: "error",
	format: winston.format.combine(winston.format.colorize(), myFormat),
});
const applicationTransportConsole = new winston.transports.Console({
	level: "info",
	format: winston.format.combine(winston.format.colorize(), myFormat),
});

applicationTransport.on("rotate", function (oldFilename, newFilename) {
	logger.info("Rotating Info Logger File. from", oldFilename, "to", newFilename);
});
errorTransport.on("rotate", function (oldFilename, newFilename) {
	logger.info("Rotating Error Logger File. from", oldFilename, "to", newFilename);
});

export const logger = winston.createLogger({
	transports: [applicationTransport, errorTransport, applicationTransportConsole, errorTransportConsole],
});
