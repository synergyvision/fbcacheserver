import express from 'express';
import morgan from 'morgan';
import axios from "axios";
import { config } from "../enviroment";
import { logger } from "../utils/logger";
import { FBCache } from "fbcache";
import { apiRouter } from "../routes/api.routes";

const initFBCache = async (credential) => {
    let fbcConfig = null;
    if (config.CONFIG === "local")
    fbcConfig = require(config.CONFIG_LOCATION);
    else if (config.CONFIG === "web") {
        const response = await axios.get(config.CONFIG_LOCATION);
        fbcConfig = response.data;
    }
    FBCache.init(fbcConfig, config.URL, config.CREDENTIAL_TYPE, credential);
    logger.info("FBCache is ready");
};

const firebaseCredential = {
    type: config.CREDENTIAL_FILE_TYPE,
    project_id: config.CREDENTIAL_FILE_PROYECT_ID,
    private_key_id: config.CREDENTIAL_FILE_PRIVATE_KEY_ID,
    private_key: config.CREDENTIAL_FILE_PRIVATE_KEY,
    client_email: config.CREDENTIAL_FILE_CLIENT_EMAIL,
    client_id: config.CREDENTIAL_FILE_CLIENT_ID,
    auth_uri: config.CREDENTIAL_FILE_AUTH_URI,
    token_uri: config.CREDENTIAL_FILE_TOKEN_URI,
    auth_provider_x509_cert_url: config.CREDENTIAL_FILE_AUTH_PROV_CERT,
    client_x509_cert_url: config.CREDENTIAL_FILE_CLIENT_CERT
};

initFBCache(firebaseCredential);
export const app = express();

// MIDDLEWARES
app.use(morgan("dev", { "stream": logger.stream }));
app.use(express.json());

// SETTINGS
app.set('port', config.PORT || 3000);

// ROUTES
app.get('/', (req, res) => {
    res.json("FBCache Server is running")
});
app.use('/api', apiRouter);

// ERROR HANDLER
app.use(function(err, req, res, next) {
    logger.error(err.message);
    res.status(500).send('Something broke!');
});

process.on('unhandledRejection', (reason, p) => {});