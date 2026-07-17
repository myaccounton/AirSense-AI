import { getCities } from '../services/city.service.js';

/**
 * Controller to get list of cities
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getCitiesController = async (req, res) => {
  try {
    const cities = await getCities();
    return res.status(200).json({
      success: true,
      message: 'Cities retrieved successfully',
      cities,
      data: { cities }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      data: null
    });
  }
};
