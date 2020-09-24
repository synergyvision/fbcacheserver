import { createLogger, format, transports } from 'winston';
import { loggerController } from "../services/logger/logger.controller";

export const logger = createLogger({
    format: format.combine(
        format.simple(),
        /*format.timestamp(),
        format.colorize({ all: true }),*/
        format.printf(info => `${info.level.toUpperCase()} - ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'debug',
        })
    ]
});

logger.stream = {
    write: function(message, encoding){
        loggerController.info(message.slice(0, -1));
    },
};