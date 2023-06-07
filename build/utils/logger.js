"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston = require('winston');
exports.logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
    // winston.format.label({ label: 'right meow!' }),
    winston.format.timestamp(), winston.format.prettyPrint()),
    defaultMeta: { service: 'contract-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: './src/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './src/logs/combined.log' }),
    ],
});
