import express from 'express';
import morgan from 'morgan';
import { config } from "../enviroment";
import { logger } from "../utils/logger";
import { FBCache } from "fbcache";
import * as fbcConfig from "../../fbcache.config.json";

FBCache.init(fbcConfig);
export const app = express();

// MIDDLEWARES
app.use(morgan("dev", { "stream": logger.stream }));
app.use(express.json());

// SETTINGS
app.set('port', config.PORT || 3000);

// ERROR HANDLER
app.use(function(err, req, res, next) {
    logger.error(err.message);
    res.status(500).send('Something broke!');
});