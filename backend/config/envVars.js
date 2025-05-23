import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

export const ENV_VARS ={
    MONGO_URI: process.env.MONGO_URI,
    PORT : process.env.PORT || 8000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
}
console.log("This is secret key", ENV_VARS.JWT_SECRET);