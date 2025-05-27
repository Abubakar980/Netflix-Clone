import express from "express";
import { deleteSearchHistory, getSearchHistory, searchMovie, searchPerson, searchTv } from "../controllers/search.contorller.js";

const searchRoutes = express.Router();

searchRoutes.get("/person/:query", searchPerson);
searchRoutes.get("/movie/:query", searchMovie);
searchRoutes.get("/tv/:query", searchTv);
searchRoutes.get("/history", getSearchHistory);
searchRoutes.delete("/history/:id", deleteSearchHistory);

export default searchRoutes;


