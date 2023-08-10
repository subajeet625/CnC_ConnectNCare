const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requirelogin");
const requirelogin = require("../middlewares/requirelogin");
const POST = mongoose.model("POST");

router.get("/allposts", requireLogin, (req, res) => {
  let limit = req.query.limit 
  let skip  = req.query.skip
    POST.find()
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

//Route for create post
//Whenever a user will send a request to this url then we need to check his/her authentication
//Only signed in user can send a request
//For that, we need requireLogin
router.post("/createpost", requireLogin, (req, res) => {
  const { body, pic } = req.body;
  console.log(pic);
  if (!body || !pic) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  console.log(req.user);
  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

router.get("/myposts", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy","_id name")
    .sort("-createdAt")
    .then((myposts) => {
      res.json(myposts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/adoptReq", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { adoptReq: req.user._id },
    },
    {
      new: true,
    }
  ).populate("postedBy","_id name Photo")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/cancelReq", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { adoptReq: req.user._id },
    },
    {
      new: true,
    }
  ).populate("postedBy","_id name Photo")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy","_id name Photo")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

// API TO DELETE POST

router.delete("/deletePost/:postId", requirelogin, (req, res) => {
  POST.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .then((post) => {
      if (!post) {
        return res.status(422).json({ error: "Post not found" });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .deleteOne()
          .then(() => {
            return res.json({ message: "Deleted successfully" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

//to show following post 
router.get("/myfollowingpost",requirelogin,(req,res)=>{
  POST.find({postedBy: {$in:req.user.following}})
  .populate("postedBy","_id name")
  .populate("comments.postedBy","_id name")
  .then(posts=>{
    res.json(posts)
    
  })
  .catch(err=>{console.log(err)})
})




module.exports = router;
