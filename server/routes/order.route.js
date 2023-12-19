import express from "express"

import {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getRecentOrders,
    searchOrder,
    exportOrderExcel,
    downloadOrderDetail,
    getMonthlyIncome,
    getOrderDataYear
  } from "../controllers/order.controller.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router()

router.post("/", createOrder)
router.put("/:id", verifyAdmin, updateOrder)
router.get("/:id", verifyUser, getSingleOrder)
router.get("/", verifyAdmin,  getAllOrders)
router.delete("/:id", verifyAdmin, deleteOrder)
router.get("/order/:userId", verifyUser,  getCurrentUserOrders)
router.get("/top/resent", verifyAdmin, getRecentOrders)
// search router
router.get("/searchorder/result", verifyAdmin, searchOrder)

// dowload excel 
router.get("/export/order", verifyAdmin , exportOrderExcel)
router.get("/export/detail/:id", verifyAdmin, downloadOrderDetail

)

// get monthly income 
router.get("/order/data/income", verifyAdmin, getMonthlyIncome)

// get data order year
router.get("/order/data/year/income", verifyAdmin, getOrderDataYear)
export default router;