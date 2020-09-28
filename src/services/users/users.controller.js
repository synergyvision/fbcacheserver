import { loggerController } from "../logger/logger.controller";
import { FBCache } from "fbcache";
const util = require('util')

const controller = {};

const context = "Users Controller"

controller.getAll = async (req, res, next) => {
    loggerController.debug(`[${context}] getAll`);
    loggerController.debug(`route especified: users`);
    let fbc = new FBCache();
    try {
        const resp = await fbc.firestore().collection("users").get();
        if(resp.cache)
            loggerController.info(`[${context}] get users from cache`);
        else
            loggerController.warn(`[${context}] get users from Firestore`);
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
    loggerController.debug(`route especified: users`);
    try {
        resp = await fbc.firestore().collection("users").add(info);
        if(resp.updateCache)
            loggerController.info(`[${context}] insert refreshed cache`);
        else
            loggerController.warn(`[${context}] insert don't refreshed cache`);
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
    loggerController.debug(`route especified: users`);
    try {
        resp = await fbc.firestore().collection("users").doc(id).set(info);
        if(resp.updateCache)
            loggerController.info(`[${context}] insert refreshed cache`);
        else
            loggerController.warn(`[${context}] insert don't refreshed cache`);
        loggerController.debug(`FBCache response: ${util.inspect(resp, {showHidden: false, depth: null})}`);
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
    loggerController.debug(`route especified: users`);
    try {
        resp = await fbc.firestore().collection("users").doc(id).update(info);
        if(resp.updateCache)
            loggerController.info(`[${context}] update refreshed cache`);
        else
            loggerController.warn(`[${context}] update don't refreshed cache`);
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
    loggerController.debug(`route especified: users`);
    try {
        resp = await fbc.firestore().collection("users").doc(id).delete();
        if(resp.updateCache)
            loggerController.info(`[${context}] delete refreshed cache`);
        else
            loggerController.warn(`[${context}] delete don't refreshed cache`);
        loggerController.debug(`FBCache response: ${util.inspect(resp, {showHidden: false, depth: null})}`);
        res.json(resp);
    } catch (error) {
        next(error);
    }
}

export const usersController = controller;