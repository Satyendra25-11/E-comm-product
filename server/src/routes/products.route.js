import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createProduct, deleteProduct, getSingleProduct, listAllProduct, updateProduct } from "../controllers/products.controller.js";
import { productValidator } from "../validators/products.validator.js";
import multer from 'multer'


const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        files:5,
        fileSize: 1* 1024 * 1024
    }
})


const router = Router()

router.post("/",authenticate, upload.array("images",4), 
(req,res,next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    next()
} ,
productValidator,createProduct)


router.get("/", listAllProduct)

router.get("/:id", getSingleProduct)

router.put("/:id", authenticate,
    upload.array("images",4),
    (req,res,next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    next()
} ,
 productValidator, updateProduct)

router.delete("/:id", authenticate, deleteProduct)





export default router