import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import dataBaseConnection from "./config/database.js"
import cookieParser from 'cookie-parser';
import router from './routes/userRoute.js';
import createPostRoute from './routes/createPost.js';
import path from 'path';

// Load environment variables from .env file
dotenv.config();
dataBaseConnection();
const app = express();
const _dirname = path.resolve()


//middlewares
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow to server to accept request from different origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(cookieParser())


//apis

app.use("/api/user",router)
app.use("/api/posts",createPostRoute)


app.use(express.static(path.join(_dirname,"/Client/dist")));
app.get('*',(_, res)=>{
    res.sendFile(path.resolve(_dirname,"Client","dist","index.html"))
})




//http://localhost:8080/api/user/register

// Start the server on the specified port
app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});
