import { logger } from "../../utils/logger";

const controller = {};

let logLevel = "info";

controller.setLevel = (level) => {
    switch (level) {
        case "info":
        logLevel = "info";
        break;
    
        case "debug":
        logLevel = "debug";
        break;

        case "error":
        logLevel = "error";
        break;

        default:
            logger.warn("logLevel have an invalid value, logLevel in info level")
        break;
    }
}

controller.error = (mes) => {
    logger.error(mes);
}

controller.warn = (mes) => {
    logger.warn(mes);
}

controller.info = (mes) => {
    if(logLevel !== "error")
        logger.info(mes);
}

controller.debug = (mes) => {
    if(logLevel === "debug")
        logger.debug(mes);
}

export const loggerController = controller;