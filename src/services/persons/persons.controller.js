import { loggerController } from "../logger/logger.controller";
import { FBCache, service } from "fbcache";
import { logger } from "../../utils/logger";

const controller = {};

const context = "Persons Controller"

controller.getAll = async (req, res, next) => {
    loggerController.debug(`[${context}] getAll`);
    loggerController.debug(`route especified: persons`);
    try {
        const resp = await FBCache.get(service.REAL_TIME, "persons");
        if(resp.cache)
            loggerController.info(`[${context}] get persons from cache`);
        else
            loggerController.warn(`[${context}] get persons from Real Time Database`);
        loggerController.debug(`FBCache response: ${resp}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.insert = async (req, res, next) => {
    const info = req.body;
    let resp = null;
    loggerController.debug(`[${context}] insert`);
    loggerController.debug(`body recibed: ${info}`);
    loggerController.debug(`route especified: persons`);
    try {
        resp = await FBCache.insert(service.REAL_TIME, "persons", info);
        if(resp.updateCache)
            loggerController.info(`[${context}] insert refreshed cache`);
        else
            loggerController.warn(`[${context}] insert don't refreshed cache`);
        loggerController.debug(`FBCache response: ${resp}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.insertWithID = async (req, res, next) => {
    const info = req.body;
    const id = req.params.id;
    let resp = null;
    loggerController.debug(`[${context}] insertWithID`);
    loggerController.debug(`param 'id' recibed: ${id}`);
    loggerController.debug(`body recibed: ${info}`);
    loggerController.debug(`route especified: persons`);
    try {
        resp = await FBCache.insert(service.REAL_TIME, "persons", info, id);
        if(resp.updateCache)
            loggerController.info(`[${context}] insert refreshed cache`);
        else
            loggerController.warn(`[${context}] insert don't refreshed cache`);
        loggerController.debug(`FBCache response: ${resp}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.update = async (req, res, next) => {
    const info = req.body;
    const id = req.params.id;
    let resp = null;
    loggerController.debug(`[${context}] update`);
    loggerController.debug(`param 'id' recibed: ${id}`);
    loggerController.debug(`body recibed: ${info}`);
    loggerController.debug(`route especified: persons`);
    try {
        resp = await FBCache.update(service.REAL_TIME, "persons", info, id);
        if(resp.updateCache)
            loggerController.info(`[${context}] update refreshed cache`);
        else
            loggerController.warn(`[${context}] update don't refreshed cache`);
        loggerController.debug(`FBCache response: ${resp}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.delete = async (req, res, next) => {
    const id = req.params.id;
    let resp = null;
    loggerController.debug(`[${context}] delete`);
    loggerController.debug(`param 'id' recibed: ${id}`);
    loggerController.debug(`route especified: persons`);
    try {
        resp = await FBCache.delete(service.REAL_TIME, "persons", id);
        if(resp.updateCache)
            loggerController.info(`[${context}] delete refreshed cache`);
        else
            loggerController.warn(`[${context}] delete don't refreshed cache`);
        loggerController.debug(`FBCache response: ${resp}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

export const personsController = controller;