import { getCities } from '../services/city.service.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * Controller to get list of cities
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const getCitiesController = async (req, res, next) => {
  try {
    const cities = await getCities();
    // Return array directly inside the data field as required
    return ApiResponse.success(res, 'Cities retrieved successfully', cities);
  } catch (error) {
    next(error);
  }
};
