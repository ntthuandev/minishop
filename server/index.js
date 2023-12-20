import express from "express";
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser";

// 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
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




const allowedOrigins = [
    'http://localhost:3000',
    'https://minishop-frontend.vercel.app',
    
];
const corsOptions = {
    origin:"https://minishop-frontend.vercel.app/",
    credentials: true,
    // optionsSuccessStatus: 200,
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // allowedHeaders: "Content-Type, Authorization",
}

const POST = process.env.POST || 8080
 app.set("trust proxy", 1)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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