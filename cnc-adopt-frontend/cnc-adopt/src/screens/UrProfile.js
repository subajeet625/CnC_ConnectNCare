import React, { useEffect, useState } from "react";
import "../css/UrProfile.css";
import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";


export default function UrProfile() {
  
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState("");

  

  const toggleDetails = (posts) => {
    setShow(!show);
    setPosts(posts);
  };

  const changeProfile = () => {
    setChangePic(!changePic);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result.post);
        setUser(result.user);
      });
  }, []);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            onClick={changeProfile}
            src={user.Photo ? user.Photo : picLink}
            alt="Profile"
          />
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>

             
          <div className="profile-stats">
           <p>{pic ? pic.length : 0} posts</p>
  <p>{user.followers ? user.followers.length : 0} followers</p>
  <p>{user.following ? user.following.length : 0} following</p>
          </div>
        </div>
      </div>
      <hr className="separator" />
      <div className="gallery">
        {pic.map((pics) => (
          <img
            key={pics._id}
            src={pics.photo}
            onClick={() => toggleDetails(pics)}
            className="item"
            alt="Post"
          />
        ))}
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeprofile={changeProfile} />}
    </div>
  );
}