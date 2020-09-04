import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
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
        logger.info(message.slice(0, -1));
    },
};