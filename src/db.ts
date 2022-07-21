import { config as configDotenv } from 'dotenv';
import mongoose  from "mongoose";
mongoose.connect(configDotenv().parsed.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((resp)=>{
    console.log("Database connnected");
}).catch((err)=>{
    console.log("Error",err);
});