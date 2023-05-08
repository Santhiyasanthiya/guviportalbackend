import { client } from "../index.js";
import bcrypt from "bcrypt";

 export async function generatePassword (password){
    const NO_OF_ROUNDS=10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword 
}
 
export async function registerMongodb (userName,email, createHashedPassword){
return await client 
.db("infodazz")
.collection("private")
.insertOne({userName: userName, email:email, password: createHashedPassword})
}

 export async function userFind (email){
    return await client 
    .db("infodazz")
    .collection("private")
    .findOne({email:email })
}