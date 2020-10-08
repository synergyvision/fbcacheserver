import { loggerController } from "../logger/logger.controller";
import { FBCache } from "fbcache";
const util = require('util')

const controller = {};

const context = "Persons Controller"

controller.getAll = async (req, res, next) => {
    let route = "persons";
    const id = req.query.id;
    if(id)
        route = route + "/" + id;
    loggerController.debug(`[${context}] get`);
    loggerController.debug(`route especified: ${route}`);
    let fbc = new FBCache();
    try {
        const resp = await fbc.database().ref(route).once();
        if(resp.cache)
            loggerController.info(`[${context}] get ${route} from cache`);
        else
            loggerController.warn(`[${context}] get ${route} from Real Time Database`);
        loggerController.debug(`FBCache response: ${util.inspect(resp, {showHidden: false, depth: null})}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.insert = async (req, res, next) => {
    const info = req.body;
    let resp = null;
    let fbc = new FBCache();
    loggerController.debug(`[${context}] insert`);
    loggerController.debug(`body recibed: ${util.inspect(info, {showHidden: false, depth: null})}`);
    loggerController.debug(`route especified: persons`);
    try {
        resp = await fbc.database().ref().child("persons").push(info);
        if(resp.updateCache)
            loggerController.info(`[${context}] insert refresh cache`);
        else
            loggerController.warn(`[${context}] insert don't refresh cache`);
        loggerController.debug(`FBCache response: ${util.inspect(resp, {showHidden: false, depth: null})}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.insertWithID = async (req, res, next) => {
    const info = req.body;
    const id = req.params.id;
    let resp = null;
    let fbc = new FBCache();
    loggerController.debug(`[${context}] insertWithID`);
    loggerController.debug(`param 'id' recibed: ${id}`);
    loggerController.debug(`body recibed: ${util.inspect(info, {showHidden: false, depth: null})}`);
    loggerController.debug(`route especified: persons`);
    try {
        resp = await fbc.database().ref("persons").child(id).set(info);
        if(resp.updateCache)
            loggerController.info(`[${context}] insert refresh cache`);
        else
            loggerController.warn(`[${context}] insert don't refresh cache`);
        loggerController.debug(`FBCache response: ${util.inspect(info, {showHidden: false, depth: null})}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.update = async (req, res, next) => {
    const info = req.body;
    const id = req.params.id;
    let resp = null;
    let fbc = new FBCache();
    loggerController.debug(`[${context}] update`);
    loggerController.debug(`param 'id' recibed: ${id}`);
    loggerController.debug(`body recibed: ${util.inspect(info, {showHidden: false, depth: null})}`);
    loggerController.debug(`route especified: persons`);
    try {
        resp = await fbc.database().ref("persons").child(id).update(info);
        if(resp.updateCache)
            loggerController.info(`[${context}] update refresh cache`);
        else
            loggerController.warn(`[${context}] update don't refresh cache`);
        loggerController.debug(`FBCache response: ${util.inspect(resp, {showHidden: false, depth: null})}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

controller.delete = async (req, res, next) => {
    const id = req.params.id;
    let resp = null;
    let fbc = new FBCache();
    loggerController.debug(`[${context}] delete`);
    loggerController.debug(`param 'id' recibed: ${id}`);
    loggerController.debug(`route especified: persons`);
    try {
        resp = await fbc.database().ref("persons").child(id).remove();
        if(resp.updateCache)
            loggerController.info(`[${context}] delete refresh cache`);
        else
            loggerController.warn(`[${context}] delete don't refresh cache`);
        loggerController.debug(`FBCache response: ${util.inspect(resp, {showHidden: false, depth: null})}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

export const personsController = controller;