import { configDotenv } from "dotenv";
import express from "express";
import cors from 'cors'
import { userRoute } from "./Routes/userRoute.js";
import { postRoute } from "./Routes/postRoute.js";
import cookieParser from "cookie-parser";

configDotenv({ path: "./Database/config.env" })

export const app = express();
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hmmm.. Its Running BaBy.😏"
    })
})

app.use('/api/user', userRoute);
app.use('/api/post', postRoute);  
