import express from "express";
import { getSimilarTv, gettrendingTv, getTvByCategory, getTvDetails, getTvTrailers } from "../controllers/tv.contorller.js";

const tvRoutes = express.Router();

tvRoutes.get("/trending", gettrendingTv);
tvRoutes.get("/:id/trailers", getTvTrailers);
tvRoutes.get("/:id/details", getTvDetails);
tvRoutes.get("/:id/similar", getSimilarTv);
tvRoutes.get("/:category", getTvByCategory);

export default tvRoutes;



// continue from 1:35:00 