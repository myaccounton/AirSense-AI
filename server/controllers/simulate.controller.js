import { getScenarioByCity } from '../services/scenario.service.js';
import { runSimulation } from '../services/orchestrator.service.js';
import ApiResponse from '../utils/apiResponse.js';

export const simulateScenarioController = async (req, res, next) => {
  try {
    const { city, action } = req.body;
    if (!city || !action) {
      return ApiResponse.error(res, 'City and action are required', 400);
    }
    const scenarioData = await getScenarioByCity(city);
    const simulationData = await runSimulation(scenarioData, action);
    
    return ApiResponse.success(res, 'Simulation completed successfully.', simulationData);
  } catch (error) {
    next(error);
  }
};
