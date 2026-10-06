import express from 'express'
import authRoutes from '../routes/auth.route.js'
import productRoutes from '../routes/products.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'




const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://e-comm-product-tawny.vercel.app"
    ],
    credentials: true
}))


app.use("/api/auth", authRoutes)

app.use("/api/products",productRoutes)



export default app