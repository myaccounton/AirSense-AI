import ApiResponse from '../utils/apiResponse.js';
import { getAllCities } from '../services/dataset.service.js';

/**
 * Middleware to validate city name input in POST request body dynamically using the loaded CSV dataset
 */
export const validateCityRequest = (req, res, next) => {
  const body = req.body;

  // Reject empty bodies
  if (!body || Object.keys(body).length === 0) {
    return ApiResponse.error(
      res,
      'Invalid Request Body',
      { detail: 'Request body must not be empty.' },
      400
    );
  }

  const { city } = body;

  // Verify city field is provided
  if (!city) {
    return ApiResponse.error(
      res,
      'Validation Error',
      { detail: 'City field is required in request body.' },
      400
    );
  }

  try {
    const normalizedCity = city.trim().toLowerCase();
    const citiesList = getAllCities();
    const supportedCitiesLower = citiesList.map(c => c.toLowerCase());

    // Verify city exists in the loaded dataset
    if (!supportedCitiesLower.includes(normalizedCity)) {
      return ApiResponse.error(
        res,
        'City Not Found',
        { detail: `City '${city}' is not supported. Supported cities are: ${citiesList.join(', ')}.` },
        400
      );
    }

    // Set normalized city on request for downstream usage
    req.normalizedCity = normalizedCity;
    next();
  } catch (error) {
    next(error);
  }
};
