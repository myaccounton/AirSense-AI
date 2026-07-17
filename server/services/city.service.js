/**
 * Fetches list of supported cities
 * @returns {Promise<string[]>} List of cities
 */
export const getCities = async () => {
  return [
    "Pune",
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow"
  ];
};
