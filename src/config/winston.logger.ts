import winston from "winston";
import "winston-daily-rotate-file";
import { randomUUID } from "crypto";

const { combine, timestamp, printf, colorize, errors, json } =
  winston.format;

/* 🔑 Add UUID to EVERY log event */
const addUuid = winston.format((info) => {
  info.uuid = randomUUID();
  return info;
});

/* 🖥️ Console format (clean, no stack) */
const consoleFormat = printf(({ level, message, timestamp, uuid }) => {
  return `${timestamp} [${level}] [${uuid}]: ${message}`;
});

/* 📁 File format (JSON + stack + uuid) */
const fileFormat = combine(
  addUuid(),
  timestamp(),
  errors({ stack: true }),
  json()
);

export const logger = winston.createLogger({
  level: "debug",
  transports: [
    /*Console */
    new winston.transports.Console({
      format: combine(addUuid(), timestamp(), colorize(), consoleFormat),
    }),

    /* Info logs */
    new winston.transports.DailyRotateFile({
      dirname: "logs",
      filename: "app-%DATE%.log",
      level: "info",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      format: fileFormat,
    }),

    /*Error logs */
    new winston.transports.DailyRotateFile({
      dirname: "logs",
      filename: "error-%DATE%.log",
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
      format: fileFormat,
    }),
  ],
  exitOnError: false,
});
