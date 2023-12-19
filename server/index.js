import express from "express";
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser";
// import routers
import authRoute from "./routes/auth.route.js"
import usersRoute from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"
import orderRoute from "./routes/order.route.js"
import connectDB from "./mongodb/connect.js";
import cors from "cors";
const app = express();
//config app
dotenv.config();
const corsOptions ={
    // origin:'http://localhost:3000', 
    origin:'https://minishop.onrender.com', 
    credentials:true,            //access-control-allow-credentials:true
}

const POST = process.env.POST || 8080
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json());
// add middleware
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute);
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
// handle error
app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Có lỗi xảy ra!"

    return res.status(errStatus).json({
        success: false,
        status:errStatus,
        message: errMessage
    })
})
// start server and connect to database
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)

        app.listen(POST, () => {
            console.log(`Server started on port http://localhost:${POST}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()