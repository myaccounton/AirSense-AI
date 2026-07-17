import { getScenarioByCity } from '../services/scenario.service.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * Controller to get scenario by city
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const getScenarioController = async (req, res, next) => {
  try {
    const { city } = req.params;
    
    if (!city) {
      const err = new Error('City parameter is required');
      err.statusCode = 400;
      throw err;
    }

    const scenario = await getScenarioByCity(city);
    return ApiResponse.success(res, 'Scenario fetched successfully.', scenario);
  } catch (error) {
    next(error);
  }
};
