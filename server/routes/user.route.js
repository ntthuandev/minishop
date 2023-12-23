import express from "express"
import {  getUserById, getAllUsers, deleteUser, searchUser, getUserStats, restoreUser, createUser } from "../controllers/user.controller.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
const router = express.Router();

// get user by id
router.get("/:id", verifyUser, getUserById)
// create user
router.post("/", verifyAdmin,createUser)
// delete a user by id
router.delete("/:id", verifyUser, deleteUser)
// get all user
router.get("/", verifyAdmin, getAllUsers)

//search user
router.get("/user/search", searchUser)

// get user stat
router.get("/user/stats", verifyAdmin, getUserStats)
// restore users
router.put("/restore/:id", verifyAdmin, restoreUser)
export default router
