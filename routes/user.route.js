import express from "express";
import { client } from "../index.js";
import bcrypt from "bcrypt";
import { generatePassword, registerMongodb, userFind } from "../services/user.service.js";
import  jwt  from "jsonwebtoken";

const router = express.Router();

router.post("/register", async function(request, response){
    const {userName, email, password} = request.body;

    const userFromDb= await userFind(email)  

    if (userFromDb) {
        response.status(400).send({status:400, message:"Email Already exists"})
    }
    else {
        const createHashedPassword =await  generatePassword(password)

        const registerDone = await registerMongodb(userName,email, createHashedPassword)
        response.send(registerDone)
    }
})

router.post("/login", async function(request, response){
    const { email, password} = request.body;

    const userFromDb = await userFind(email)  

    if (!userFromDb) {
        response.status(401).send({ status:401, message:"Unauthroize"})
    }
    else{
        const storedDBPassword = userFromDb.password;
        const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
        console.log(isPasswordCheck);
        
        if (isPasswordCheck) {
          const token = jwt.sign({ id : userFromDb._id }, process.env.SECRET_KEY);
          response.status(200).send({status:200, message : "Successful login", token : token });
        } else {
          response.status(401).send({status:401, message: "Invalid Credentials"});
        }
    }
})

export default router;