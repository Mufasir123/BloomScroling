import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import dataBaseConnection from "./config/database.js"
import cookieParser from 'cookie-parser';
import router from './routes/userRoute.js';
import createPostRoute from './routes/createPost.js';

// Load environment variables from .env file
dotenv.config();
dataBaseConnection();
const app = express();


//middlewares
app.use(cors({
    origin: `${process.env.CLIENT_URL}`, // Allow requests from your frontend
    credentials: true,              // Allow credentials (cookies, headers)
}))
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(cookieParser())


//apis

app.use("/api/user",router)
app.use("/api/posts",createPostRoute)




//http://localhost:8080/api/user/register

// Start the server on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});
