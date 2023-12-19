import express from "express"

import { createProduct, deleteProduct, updateProduct, getAllProduct, getProduct , getMaxInventoryProducts, getPanigation, getSearchProduct} from "../controllers/product.controller.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router()

router.post("/create", verifyAdmin, createProduct )
router.put("/update/:id", verifyAdmin, updateProduct)
router.get("/:id", verifyUser, getProduct)
router.get("/", verifyUser, getAllProduct)
router.delete("/:id", verifyAdmin, deleteProduct)
router.get("/top/sales", verifyAdmin, getMaxInventoryProducts)

//router.get("/list/?limit&page", verifyUser,getPanigation)
router.get("/pagination/list", getPanigation)

// search product
router.get("/search/result", verifyUser, getSearchProduct)

export default router;