import express from 'express';
import './config/groq.config.js';
import cors from 'cors';
import apiRoutes from './routes/api.routes.js';
import { requestLogger } from './middleware/logger.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ message: 'AirSense Server is running' });
});

// Centralized API routes
app.use('/api', apiRoutes);

// Centralized error handling middleware (must be registered last)
app.use(errorHandler);

export default app;
