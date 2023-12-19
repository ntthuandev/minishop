import express from "express"
import {  getUserById, getAllUsers, deleteUser, searchUser, getUserStats } from "../controllers/user.controller.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
const router = express.Router();

// get user by id
router.get("/:id", verifyUser, getUserById)

// delete a user by id
router.delete("/:id", verifyUser, deleteUser)
// get all user
router.get("/", verifyAdmin, getAllUsers)

//search user
router.get("/user/search", searchUser)

// get user stat
router.get("/user/stats", verifyAdmin, getUserStats)

export default router
