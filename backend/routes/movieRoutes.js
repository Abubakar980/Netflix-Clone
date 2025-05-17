import express from "express";
import { gettrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory } from "../controllers/movie.controllers.js";

const movieRoutes = express.Router();

movieRoutes.get("/trending", gettrendingMovie);
movieRoutes.get("/:id/trailers", getMovieTrailers);
movieRoutes.get("/:id/details", getMovieDetails);
movieRoutes.get("/:id/similar", getSimilarMovies);
movieRoutes.get("/:category", getMoviesByCategory);

export default movieRoutes;


