const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');
const DataBaseWrapper = require('./mongooseDB');

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    this.expressServer.launch();
    logger.info('Express server running');
    this.dbWrapper = new DataBaseWrapper(config.DB_URL, config.DEBUG_MODE);
    this.dbWrapper.launch();
  } catch (error) {
    logger.error('Express Server failure', error.message);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));
