# AirSense AI - Backend API Documentation

AirSense AI is a production-quality Node.js backend built on Express, integrated with the Groq API (`groq-sdk`) to generate structured, real-time air quality analyses, meteorology correlations, and municipal recommendations for smart city planning.

---

## Architecture Overview
The backend follows a strict **Controller → Service → Route** pattern:
- **Routes**: Handle routing declarations and bind request validation middleware.
- **Middleware**: Intercepts requests for logging (`requestLogger`), validation (`validateCityRequest`), and global error mapping (`errorHandler`).
- **Controllers**: Handle request extraction and map standardized JSON outputs (`ApiResponse`).
- **Services**: Execute database/file scenario resolutions, cache interactions, and coordinates Groq AI Orchestration.
- **Scenarios**: JSON files containing environmental parameters for supported cities.

---

## Global Response Standards

### Success Responses (HTTP 200)
All successful API requests return a standard JSON envelope:
```json
{
  "success": true,
  "message": "Description of transaction",
  "data": { ...Payload }
}
```

### Error Responses (HTTP 4xx / 5xx)
All failures return a standard envelope and hide internal stack traces:
```json
{
  "success": false,
  "message": "User-friendly description of error status",
  "error": {
    "detail": "Actionable error details"
  }
}
```

---

## API Endpoints Reference

### 1. Get Supported Cities
* **Endpoint**: `GET /api/cities`
* **Purpose**: Fetches the list of all supported cities inside the AirSense platform.
* **Request Headers**: None
* **Request Body**: Empty
* **Example Request**:
  `GET http://localhost:5000/api/cities`
* **Example Response**:
  ```json
  {
    "success": true,
    "message": "Cities retrieved successfully",
    "data": {
      "cities": [
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
      ]
    }
  }
  ```
* **Possible Errors**:
  - `500 Internal Server Error`: Generic internal server failures.

---

### 2. Get Scenario Data for a City
* **Endpoint**: `GET /api/scenario/:city`
* **Purpose**: Resolves the real-time environmental scenario metrics stored locally for the target city.
* **Request Params**: `city` (string, case-insensitive)
* **Example Request**:
  `GET http://localhost:5000/api/scenario/Delhi`
* **Example Response**:
  ```json
  {
    "success": true,
    "message": "Scenario fetched successfully.",
    "data": {
      "city": "Delhi",
      "aqi": 365,
      "category": "Very Poor",
      "temperature": 34,
      "humidity": 45,
      "windSpeed": 5,
      "pressure": 1010,
      "visibility": 1,
      "pollutants": {
        "pm25": 310,
        "pm10": 420,
        "no2": 78,
        "so2": 24,
        "co": 3.8,
        "o3": 55
      },
      "sources": {
        "traffic": "High",
        "construction": "High",
        "industry": "High",
        "wasteBurning": "High"
      },
      "forecast": {
        "tomorrowAQI": 380,
        "trend": "Increasing"
      }
    }
  }
  ```
* **Possible Errors**:
  - `404 Not Found`: Returned when the city parameter does not match any local scenario file (e.g. `/api/scenario/Paris`).
    ```json
    {
      "success": false,
      "message": "City not found",
      "error": {
        "detail": "City not found"
      }
    }
    ```

---

### 3. Analyze Air Quality scenario
* **Endpoint**: `POST /api/analyze`
* **Purpose**: Generates a unified, dashboard-optimized Groq AI analysis mapping the weather, AQI trends, main pollution drivers, policy advice, and health tips.
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "city": "Delhi"
  }
  ```
* **Example Request**:
  `POST http://localhost:5000/api/analyze`
* **Example Response**:
  ```json
  {
    "success": true,
    "message": "Analysis completed successfully.",
    "data": {
      "city": "Delhi",
      "aqiSummary": "Delhi's current AQI of 365 is \"Very Poor,\" indicating severe health impacts for all. With a forecast of 380 and an increasing trend, conditions are critically dangerous and require urgent intervention.",
      "weatherImpact": "Very low wind speed (5 km/h) traps pollutants close to the surface, preventing dispersion. High particulate levels drastically reduce visibility (1 km), confirming severe air stagnation and accumulation.",
      "pollutionReason": "Extremely high PM2.5 and PM10 levels are primarily driven by rampant construction dust, vehicular emissions, and extensive waste burning. Industrial activities also significantly contribute to NO2 and other particulate matter, exacerbating the overall pollutant load.",
      "majorSources": [
        "Construction activities",
        "Vehicular emissions",
        "Waste burning"
      ],
      "recommendations": [
        "Enforce strict dust control at construction sites immediately.",
        "Implement odd-even vehicle restrictions and promote public transport.",
        "Ban all waste burning; provide alternative disposal solutions.",
        "Temporarily shut down highly polluting industrial units.",
        "Deploy water sprinklers and street cleaning to reduce dust."
      ],
      "healthAdvice": [
        "Stay indoors; avoid outdoor physical activities.",
        "Wear N95 masks if outdoor movement is unavoidable.",
        "Keep windows and doors closed; use air purifiers.",
        "Monitor health; consult a doctor for respiratory issues.",
        "Hydrate well and consume immunity-boosting foods."
      ]
    }
  }
  ```
* **Possible Errors**:
  - `400 Bad Request`: Body is empty, `city` field is missing, or the city is not supported.
    ```json
    {
      "success": false,
      "message": "City Not Found",
      "error": {
        "detail": "City 'Paris' is not supported. Supported cities are: Pune, Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Lucknow."
      }
    }
    ```
  - `429 Too Many Requests`: Triggered when Groq API quota limits are exceeded.
    ```json
    {
      "success": false,
      "message": "AI quota exceeded. Please try again later.",
      "error": {
        "detail": "Groq API quota or rate limit exceeded. Please try again later."
      }
    }
    ```
  - `503 Service Unavailable`: Triggered on invalid API keys, network failures, or API timeouts.
    ```json
    {
      "success": false,
      "message": "AI Service is currently unavailable. Please check backend config.",
      "error": {
        "detail": "Authentication failed. Please verify your GROQ_API_KEY configuration."
      }
    }
    ```

---

### 4. Generate Air Quality Action Report
* **Endpoint**: `POST /api/report`
* **Purpose**: Resolves scenario metrics and compiles a comprehensive action-oriented layout ready for conversion into PDF formats on the frontend.
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "city": "Delhi"
  }
  ```
* **Example Request**:
  `POST http://localhost:5000/api/report`
* **Example Response**:
  ```json
  {
    "success": true,
    "message": "Report generated successfully.",
    "data": {
      "title": "Air Quality Action Report",
      "city": "Delhi",
      "generatedAt": "2026-07-17T14:05:17.338Z",
      "summary": "The air quality in Delhi is currently categorized as Very Poor with an AQI of 365. Meteorology shows a temperature of 34°C, humidity of 45%, and wind speed of 5 km/h. Key particulate counts (PM2.5: 310 µg/m³, PM10: 420 µg/m³) are elevated, and the short-term forecast trend is Increasing.",
      "aqiSummary": "AQI 365 represents 'Very Poor' air quality, posing severe health risks to the entire population. This extremely hazardous level indicates high concentrations of pollutants, significantly impacting respiratory and cardiovascular systems, with a worsening trend forecasted for tomorrow.",
      "weatherImpact": "Low wind speed (5 km/h) significantly hinders pollutant dispersion, trapping them near the ground. High temperatures can exacerbate secondary pollutant formation. Poor visibility (1 km) confirms high particulate matter accumulation due to these stagnant conditions.",
      "pollutionReason": "Extremely high PM2.5 and PM10 are primarily due to heavy traffic emissions, uncontrolled construction dust, and pervasive waste burning. Industrial discharges also contribute significantly. These combined sources, coupled with poor dispersion, create severe particulate pollution.",
      "majorSources": [
        "Traffic",
        "Construction",
        "Waste Burning"
      ],
      "municipalRecommendations": [
        "Implement emergency vehicle rationing (e.g., odd-even scheme) immediately.",
        "Issue a complete ban on all non-essential construction activities.",
        "Strictly enforce bans on waste burning with heavy penalties.",
        "Deploy water sprinklers and anti-smog guns on major roads.",
        "Increase public transport frequency and offer discounted fares."
      ],
      "healthAdvice": [
        "Stay indoors and keep windows/doors tightly closed.",
        "Wear N95 masks diligently if venturing outdoors.",
        "Avoid all strenuous outdoor physical activities.",
        "Children, elderly, and those with respiratory issues must avoid going out.",
        "Seek immediate medical attention for any breathing difficulties."
      ],
      "forecast": {
        "tomorrowAQI": 380,
        "trend": "Increasing"
      }
    }
  }
  ```
* **Possible Errors**:
  - Same as `/api/analyze` (400, 429, 503, 500).

---

## In-Memory Caching & Performance
To avoid redundant Groq API calls during hackathon demos, the server implements an in-memory cache.
- The cache resolves queries using lowercase, trimmed city keys.
- Subsequent calls to `/api/analyze` or `/api/report` for the same city retrieve stored reports instantly, showing **0ms** Groq API response time.
- The cache survives for the duration of the server runtime.
