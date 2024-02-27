import express from "express";
import { signup, signin, deleteAllUser } from "../controllers/user";
import { home } from "../controllers/home";
import verifyToken from "../middlewares/auth";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/deleteallusers", deleteAllUser);
router.get("/home", verifyToken, home);

export default router;
