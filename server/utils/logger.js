/**
 * Reusable logging utility using console outputs with formatted timestamps
 */
class Logger {
  static getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Logs general info/request details
   * @param {string} message 
   * @param {object} meta 
   */
  static info(message, meta = {}) {
    const metaStr = Object.keys(meta).length ? ` | ${JSON.stringify(meta)}` : '';
    console.log(`[${this.getTimestamp()}] [INFO] ${message}${metaStr}`);
  }

  /**
   * Logs warnings
   * @param {string} message 
   * @param {object} meta 
   */
  static warn(message, meta = {}) {
    const metaStr = Object.keys(meta).length ? ` | ${JSON.stringify(meta)}` : '';
    console.warn(`[${this.getTimestamp()}] [WARN] ${message}${metaStr}`);
  }

  /**
   * Logs errors
   * @param {string} message 
   * @param {Error|object} error 
   */
  static error(message, error = {}) {
    const errDetails = error instanceof Error 
      ? { message: error.message, code: error.code } 
      : error;
    console.error(`[${this.getTimestamp()}] [ERROR] ${message} | Details: ${JSON.stringify(errDetails)}`);
  }
}

export default Logger;
