import express from "express";
import { deleteSearchHistory, getSearchHistory, searchMovie, searchPerson, searchTv } from "../controllers/search.contorller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const searchRoutes = express.Router();

searchRoutes.get("/person/:query", protectRoute, searchPerson);
searchRoutes.get("/movie/:query",protectRoute,  searchMovie);
searchRoutes.get("/tv/:query",protectRoute, searchTv);
searchRoutes.get("/history",protectRoute, getSearchHistory);
searchRoutes.delete("/history/:id",protectRoute, deleteSearchHistory);

export default searchRoutes;


