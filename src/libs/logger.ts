import pino from "pino";

export const logger = pino({
  level: "info",
  redact: ["req.headers.authorization", "req.headers.cookie"],
  ...(process.env.NODE_ENV !== "production" && {
    transport: { target: "pino-pretty" },
  }),
});
