import { logger } from "../../utils/logger";
import { FBCache, service } from "fbcache";

const controller = {};

const context = "Users Controller"

controller.getAll = async (req, res, next) => {
    logger.info(`[${context}] getAll`);
    try {
        const resp = await FBCache.get(service.FIRESTORE, "users");
        if(resp.cache)
            logger.info(`[${context}] getAll users from cache`);
        else
            logger.warn(`[${context}] getAll users from Firestore`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.insert = async (req, res, next) => {
    const info = req.body;
    let resp = null;
    logger.info(`[${context}] insert`);
    try {
        if(info.data)
            resp = await FBCache.insert(service.FIRESTORE, "users", info.data, info.id);
        else
            resp = await FBCache.insert(service.FIRESTORE, "users", info.data);
        if(resp.updateCache)
            logger.info(`[${context}] insert update cache`);
        else
            logger.warn(`[${context}] insert don't update cache`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

export const usersController = controller;