import 'dotenv/config';
import app from './app.js';
import { loadDataset } from './services/dataset.service.js';

const PORT = process.env.PORT || 5000;

// Load the CSV dataset once when the server starts
loadDataset()
  .then((stats) => {
    console.log(`✓ Dataset Loaded\nTotal Records: ${stats.totalRecords}\nCities: ${stats.cityCount}`);
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Fatal: Failed to load dataset on startup:', err);
    process.exit(1);
  });
