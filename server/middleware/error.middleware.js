import ApiResponse from '../utils/apiResponse.js';
import Logger from '../utils/logger.js';

/**
 * Global Express error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Logger reports errors internally
  Logger.error('Unhandled server error captured by global middleware', err);

  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  
  // Clean structure for returning standard API responses
  const responseError = {
    detail: err.detail || message
  };

  // Map specific error scenarios
  if (statusCode === 400) {
    message = message || 'Bad Request';
  } else if (statusCode === 404) {
    message = message || 'Resource Not Found';
  } else if (statusCode === 429) {
    message = 'AI quota exceeded. Please try again later.';
  } else if (statusCode === 503) {
    message = 'AI Service is currently unavailable. Please check backend config.';
  } else if (statusCode === 500) {
    message = 'An unexpected internal server error occurred.';
  }

  // Never expose stack trace in production responses
  return ApiResponse.error(res, message, responseError, statusCode);
};
