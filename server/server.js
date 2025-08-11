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

app.use(cors(
  {
  origin: function(origin, callback) {
    const allowedOrigins = ['https://smart-leads-ai-crm.vercel.app', 'http://localhost:5173'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/v1', routes);


// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
