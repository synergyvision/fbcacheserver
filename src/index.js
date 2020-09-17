import "@babel/polyfill";
import { logger } from "./utils/logger";
import { app } from './app/server';

app.listen(app.get('port'), () => 
    logger.info(`Server on port ${app.get('port')}`)
)