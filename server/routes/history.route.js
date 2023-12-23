import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {getAllHistory} from "../controllers/history.controller.js"
const router = express.Router()

router.get("/", verifyAdmin, getAllHistory)

export default router;