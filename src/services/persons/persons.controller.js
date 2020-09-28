import { loggerController } from "../logger/logger.controller";
import { FBCache } from "fbcache";
const util = require('util')

const controller = {};

const context = "Persons Controller"

controller.getAll = async (req, res, next) => {
    loggerController.debug(`[${context}] getAll`);
    loggerController.debug(`route especified: persons`);
    let fbc = new FBCache();
    try {
        const resp = await fbc.database().ref("persons").once();
        if(resp.cache)
            loggerController.info(`[${context}] get persons from cache`);
        else
            loggerController.warn(`[${context}] get persons from Real Time Database`);
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
    loggerController.debug(`route especified: persons`);
    try {
        resp = await fbc.database().ref("persons").child(id).set(info);
        if(resp.updateCache)
            loggerController.info(`[${context}] insert refreshed cache`);
        else
            loggerController.warn(`[${context}] insert don't refreshed cache`);
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
    loggerController.debug(`route especified: persons`);
    try {
        resp = await fbc.database().ref("persons").child(id).remove();
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

export const personsController = controller;