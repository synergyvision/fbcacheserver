import { createLogger, format, transports } from 'winston';
import { loggerController } from "../services/logger/logger.controller";
import { config } from "../enviroment";

export const logger = createLogger({
    format: config.NODE_ENV === "production"? 
    format.combine(
        format.simple(),
        format.printf(info => `${info.level.toUpperCase()} - ${info.message}`)
    ) :
    format.combine(
        format.simple(),
        format.timestamp(),
        format.colorize({ all: true }),
        format.printf(info => `[${info.timestamp}] - ${info.level} - ${info.message}`)
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