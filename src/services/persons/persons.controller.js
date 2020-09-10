import { logger } from "../../utils/logger";
import { FBCache, service } from "fbcache";

const controller = {};

const context = "Persons Controller"

controller.getAll = async (req, res, next) => {
    logger.info(`[${context}] getAll`);
    try {
        const resp = await FBCache.get(service.REAL_TIME, "persons");
        if(resp.cache)
            logger.info(`[${context}] getAll persons from cache`);
        else
            logger.warn(`[${context}] getAll persons from Real Time Database`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

export const personsController = controller;