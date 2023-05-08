import express  from "express";
import {MongoClient} from "mongodb";
import userRouter from "./routes/user.route.js"
import cors from  "cors";
import * as dotenv from 'dotenv'

dotenv.config()
const app=express();
const PORT = 4000;
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
// top level await 
await client.connect()
console.log("MongoDb Connected Successfully")

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

app.get("/", function(request, response){
    response.send({message: "Welcome to Login / LogOut APP"})
})
app.use("/users", userRouter)


app.listen (PORT, ()=>console.log(`server connected,${PORT}`))
export {client}