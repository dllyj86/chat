import './pre-start'; // Must be the first import
import logger, { LoggerModes } from 'jet-logger';
import EnvVars from './constants/EnvVars';
import server from './server';

logger.settings.mode = LoggerModes.Console;
// **** Run **** //
const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
