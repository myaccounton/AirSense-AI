import { getScenarioByCity } from '../services/scenario.service.js';

/**
 * Controller to get scenario by city
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getScenarioController = async (req, res) => {
  try {
    const { city } = req.params;
    
    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City parameter is required'
      });
    }

    const scenario = await getScenarioByCity(city);
    return res.status(200).json({
      success: true,
      message: 'Scenario fetched successfully.',
      data: scenario
    });
  } catch (error) {
    if (error.statusCode === 404 || error.message === 'City not found') {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};
