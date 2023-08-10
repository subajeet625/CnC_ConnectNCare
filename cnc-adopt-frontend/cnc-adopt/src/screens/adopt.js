import React, { useEffect, useState } from "react";
import "../css/adopt.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {Link} from "react-router-dom";

export default function Adopt() {
   var picLink ="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comments, setComments] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([])
  let limit = 10;
  let skip = 0;


 const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/SignUp");
    }
fetchPosts()
   
window.addEventListener("scroll",handleScroll)
return ()=>{
  window.removeEventListener("scroll",handleScroll)
}
  }, []);


 const fetchPosts = () => {
  fetch(`http://localhost:5000/allposts?limit=${limit}&skip=${skip}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
    .then((res) => res.json())
    .then((result) => {
      // Filter out posts that are already in the data array
      const filteredPosts = result.filter((post) => !data.some((existingPost) => existingPost._id === post._id));
      setData((prevData) => [...prevData, ...filteredPosts]);
    })
    .catch((err) => console.log(err));
}
  const handleScroll = () => {
    if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
      skip = skip + 10;
      fetchPosts();
    }
  }

  //to show and hide comments
  const toggleComment=(posts)=>{
    if(show){
      setShow(false)
    }else{
      setShow(true);
      setItem(posts)
    }
  }

  const adoptRequest = (id) => {
    fetch("http://localhost:5000/adoptReq", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  const cancelRequest = (id) => {
    fetch("http://localhost:5000/cancelReq", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
         const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
        
        setComments("");
        notifyB("Comment posted")
      });
  };

  return (
    <div className="adopt">
      {/* card */}
      {data.map((posts) => {
        return (
          <div className="card" key={posts._id}>
            {/* card-header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src={posts.postedBy.Photo? posts.postedBy.Photo : picLink}
                  alt=""
                />
              </div>
              <h5><Link to={`/UrProfile/${posts.postedBy._id}`}>
                {posts.postedBy.name}
              </Link>
                
                </h5>
            </div>
            <div className="card-image">
              <img src={posts.photo} alt="" />
              
            </div>
            {/* card-content */}
            <div className="card-content">
              {posts.adoptReq &&
              posts.adoptReq.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <span  className="material-symbols-outlined material-symbols-outlined-green"
 onClick={() => {
                    cancelRequest(posts._id);
                  }}

>
pets
</span>
              ) : (
               <span class="material-symbols-outlined"
onClick={() => {
                    adoptRequest(posts._id);}}

>
pets
</span>

              )}
              <p><b> {"Requests: "}</b>{posts.adoptReq ? posts.adoptReq.length : 0}</p>
              <p> <b>{posts.postedBy.name}{": "}</b>{posts.body}</p>
              <p style={{fontWeight:"bold", cursor:"pointer"}} 
              onClick={()=>{toggleComment(posts);}}
              >View all comments</p>
            </div>
            {/* add comment */}
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment"
                value={comments[posts._id] || ""}
                onChange={(e) => {
                  setComments((prevComments) => ({
                    ...prevComments,
                    [posts._id]: e.target.value,
                  }));
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makeComment(comments[posts._id], posts._id);
                }}
              >
               <li>
                <span class="material-symbols-outlined">
send
</span>
               </li>
              </button>
            </div>
            {/* Show comments */}
            {show && (
               <div className="showComment">
                <div className="container" >
                  <div className="postPic">
                    <img src={item.photo} />
                  </div>
                  <div className="details">
        {/* card-header */}
            <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
              <div className="card-pic">
                <img
                  src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                />
              </div>
              <h5>{item.postedBy.name}</h5>
            </div>
            {/* comment section */}
            <div className="comment-section" style={{borderBottom:"1px solid #00000029"}}>
             {item.comments.map((comment)=>{
           return  (<p className="comm">
                <span className="commenter" style={{fontWeight:"bolder"}}>{comment.postedBy.name}{" "} </span>
                <span className="commentText">{comment.comment}</span>
              </p>)
             })}
            </div>
            {/* card-content */}
            <div className="card-content"> 
              <p>{"Requests: "}{posts.adoptReq ? posts.adoptReq.length : 0} </p>
              <p>{posts.body}</p>
             </div>

              {/* add comment */}
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment"
                value={comments[posts._id] || ""}
                onChange={(e) => {
                  setComments((prevComments) => ({
                    ...prevComments,
                    [posts._id]: e.target.value,
                  }));
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makeComment(comments[posts._id], item._id);
                  toggleComment();
                }}
              >
               <li>
                <span class="material-symbols-outlined">
send
</span>
               </li>
              </button>
            </div>
                    </div>
                  </div>
                  <div className="close-comment" onClick={()=>{toggleComment()}}>
                    <span class="material-symbols-outlined material-symbols-outlined-comment">close</span>
                  </div>
                </div>)
            }
           
               </div>
          
        );
      })}
    </div>
  );
}
