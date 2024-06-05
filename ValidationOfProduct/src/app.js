import 'dotenv/config';

import express from "express"
import syncdb from "./db/init.js"
import { connectDB } from "./db/config.js"
import allRoutes from './Routes/allRoutes.js';
const posData = express()

posData.use(express.json());
posData.use(allRoutes)

connectDB;
syncdb;
syncdb().then(()=>{
    console.log("DB Synced!!")
});
posData.listen(3000, ()=>{
    console.log("Server is running on port 3000!")
})