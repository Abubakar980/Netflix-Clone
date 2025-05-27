import express from "express";
import { authCheck, logout, signin, signup } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post("/logout", logout);
authRoutes.get("/authCheck", protectRoute, authCheck);

export default authRoutes;
