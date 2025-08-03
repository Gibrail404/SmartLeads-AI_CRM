import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.routes.js';
import errorHandler from './middlewares/error.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // MongoDB connection

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', routes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
