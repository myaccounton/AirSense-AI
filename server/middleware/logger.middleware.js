import Logger from '../utils/logger.js';

/**
 * Express middleware to log metadata for all incoming HTTP requests
 */
export const requestLogger = (req, res, next) => {
  const { method, url, body, params } = req;
  const city = body?.city || params?.city || '';
  const cityLog = city ? ` | City: ${city}` : '';

  Logger.info(`Incoming Request: ${method} ${url}${cityLog}`);
  next();
};
