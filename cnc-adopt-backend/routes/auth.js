const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt')
//importing json web token which will provide an unique id to the user
const jwt = require("jsonwebtoken");
//importing jwt secret
const {Jwt_secret} = require("../keys");
const requirelogin = require("../middlewares/requirelogin");


router.get('/',(req,res)=>{
   res.send("hello")
})

router.post("/SignUp",(req,res)=>{
   const {
      name,userName,email,password
   }= req.body;
   if(!name || !email|| !userName ||!password){
     return res.status(422).json({error:"Please ad all the fields"})
   }
   USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
      if(savedUser){
         return res.status(422).json({error:"User already exist with that email or userName"})
      }
      bcrypt.hash(password, 12).then((hashedPassword)=>{
         const user = new USER({
            name,
            email,
            userName,
            password: hashedPassword
         })
      
      user.save()
      .then(user => {res.json({message: "Registered successfully"})})
      .catch(err =>{console.log(err)} )
      })
      
   })
   

})

router.post("/SignIn",(req,res)=>{
      const {email,password}=req.body;

      if(!email|| !password){
         return res.status(422).json({error:"Please add email and password"})

      }
     USER.findOne({email:email}).then((savedUser)=>{
      if(!savedUser){
         return res.status(422).json({error:"Invalid email"})
      }
        bcrypt,bcrypt.compare(password, savedUser.password).
        then((match)=>{
         if(match){
            //  return res.status(200).json({
            //    message:"Signed in successfully"
            //  })
            const token = jwt.sign({_id:savedUser.id},Jwt_secret)
            const {_id,name,email,userName}=savedUser
            res.json({token,user:{_id,name,email,userName}})
            console.log({token,user:{_id,name,email,userName}})
            
         }else{
            return res.status(422).json({
               error:"Invalid password"
            })
         }
        })
        .catch(err=>console.log(err))
     }) 
})

router.post("/googleLogin",(req,res)=>{
   const {email_verified,email,name,clientId,userName,Photo}=req.body
   if(email_verified){
      USER.findOne({email:email}).then((savedUser)=>{
      if(savedUser){
         //If the user is a savedUser then using jwt we will provide an unique id to user
         //For that we will use the jwt sign method that will take the already saved id of user in mongodb and the jwt_secret
         //Using both of them the user will make an id
        const token = jwt.sign({_id:savedUser.id},Jwt_secret)
        //Token created successfully
        //For the verification of the id, we need a middleware
            const {_id,name,email,userName}=savedUser
            res.json({token,user:{_id,name,email,userName}})
            console.log({token,user:{_id,name,email,userName}})
      }else{
         const password = email + clientId
          const user = new USER({
            name,
            email,
            userName,
            password: password,
            Photo
         })
      
      user.save()
      .then(user => {
         let userId = user._id.toString()
          const token = jwt.sign({_id:userId},
            Jwt_secret)
            const {_id,name,email,userName}=user 
            res.json({token,user:{_id,name,email,userName}})
            console.log({token,user:{_id,name,email,userName}})
      })
      .catch(err =>{console.log(err)} )

      }
        
       
     })  
   }
})
module.exports = router;