/**
 * Utility class for formatting standardized API responses
 */
class ApiResponse {
  /**
   * Send a successful response
   * @param {object} res - Express response object
   * @param {string} message - Success message description
   * @param {any} data - Content payload
   * @param {number} statusCode - HTTP status code (default: 200)
   */
  static success(res, message, data = {}, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  /**
   * Send an error response
   * @param {object} res - Express response object
   * @param {string} message - Error description message
   * @param {any} error - Detailed error payload or object (default: {})
   * @param {number} statusCode - HTTP status code (default: 500)
   */
  static error(res, message, error = {}, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
      error: typeof error === 'string' ? { detail: error } : error
    });
  }
}

export default ApiResponse;
