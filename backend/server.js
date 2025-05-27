import express from 'express';

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { ENV_VARS } from './config/envVars.js';

import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import tvRoutes from './routes/tvRoutes.js';
import cors from 'cors';


import { protectRoute } from './middleware/protectRoute.js';
import cookieParser from 'cookie-parser';

// dotenv.config();   this is not working anymore, so we are using the below method to load env variables
dotenv.config({ path: './backend/.env' });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));



app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies
connectDB();


app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/movie", protectRoute ,movieRoutes)
app.use("/api/v1/tv", protectRoute ,tvRoutes)
app.use("/api/v1/search", protectRoute ,searchRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Mongo URI:", process.env.MONGO_URI);
});



// continur from 2:28:54
// backend completed