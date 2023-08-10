const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const POST = mongoose.model("POST");
const requirelogin = require("../middlewares/requirelogin");
//to get user profile
router.get("/user/:id",(req,res)=>{
    USER.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        POST.find({postedBy:req.params.id})
        .populate("postedBy","_id")
        .exec((err,post)=>{
            if(err){
           return     res.status(422).json({error:err})
            }
            res.status(200).json({user,post})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

//to follow user
router.put("/follow",requirelogin,(req,res)=>{
    USER.findByIdAndUpdate(req.body.followId,{
        $push:{followers: req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        USER.findByIdAndUpdate(req.user._id,{
            $push:{following: req.user.followId}
        },{
            new:true 
        }).then(result=> result.json(result))
        .catch(err=>{return res.status(422).json({error:err})})
    })
})


//unfollow user
router.put("/unfollow",requirelogin,(req,res)=>{
    USER.findByIdAndUpdate(req.body.followId,{
        $pull:{followers: req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        USER.findByIdAndUpdate(req.user._id,{
            $pull:{following: req.user.followId}
        },{
            new:true 
        }).then(result=> result.json(result))
        .catch(err=>{return res.status(422).json({error:err})})
    })
})

//to upload profile pic
router.put("/uploadProfilePic",requirelogin,(req,res)=>{
    USER.findByIdAndUpdate(req.user._id,{
        $set:{Phptp:req.body.pic}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
        return    res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


module.exports = router;
