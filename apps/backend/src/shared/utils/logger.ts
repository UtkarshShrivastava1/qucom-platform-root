import winston from 'winston';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const customFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}]: ${stack || message}${metaString}`;
});

const isProduction = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    isProduction ? json() : combine(colorize(), customFormat),
  ),
  transports: [
    new winston.transports.Console(),
  ],
  exitOnError: false,
});
