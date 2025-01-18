import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const dataBaseConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to mongodb");
        
        
    }).catch((error)=>{
        console.log(error);
        
    })
}

export default dataBaseConnection