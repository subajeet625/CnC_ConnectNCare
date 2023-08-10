const jwt = require("jsonwebtoken")
const {Jwt_secret} = require("../keys")
const mongoose = require("mongoose")
const USER = mongoose.model("USER")

module.exports = (req,res,next)=>{
   const {authorization} = req.headers;
   if(!authorization){
    return res.status(401).json({error:"You must have logged in 1"})
   }
   const token = authorization.replace("Bearer ","")
   jwt.verify(token,Jwt_secret,(err,payload)=>{
    if(err){
        return res.status(401).json({error:"You must have logged in 2"})
    }
    //If there is no error then payload will have an encoded string which will contain the id which is saved in mongodb
    const {_id}=payload 
    //Check whether this id is already there in mongodb or not
    USER.findById(_id).then(userData=>{
        req.user =userData
        next()  
    })
   })
   
}