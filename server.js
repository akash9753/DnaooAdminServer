import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import path from "path";
const port = process.env.PORT || 5000

import { fileURLToPath } from 'url';

dotenv.config()
console.log(`process.env.CLOUD_NAME server`,process.env.CLOUD_NAME);
const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('uploads',express.static(path.join(__dirname,"uploads")))

import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js"
import imageUploadRouter from "./routes/imageUploadRouter.js"
import videoUploadRouter from "./routes/videoUploadRouter.js"

app.use("/users", userRouter) //http://localhost:5000/users/signup
app.use("/tour", tourRouter)
app.use("/api/v1/imagesUpload",imageUploadRouter)
app.use('/api/v1/videoUpload',videoUploadRouter)

const MONGODB_URL = process.env.MONGO_DB
// const MONGODB_URL = "mongodb://localhost:27017/tour_db"
// tExo3v5ROD1nUukE


mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`);
    })
}).catch((error)=> console.log(`${error} did not connect`))

