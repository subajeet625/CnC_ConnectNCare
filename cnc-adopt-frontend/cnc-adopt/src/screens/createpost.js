import React, { useState, useEffect } from 'react';
import '../css/createpost.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createpost", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            showErrorToast(data.error);
          } else {
            showSuccessToast("Successfully posted");
            navigate("/adopt");
          }
        })
        .catch(err => {
          console.log(err);
          showErrorToast("An error occurred while posting");
        });
    }
  }, [url]);

  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "connectncare");
    data.append("cloud_name", "subhajitdas");
    fetch("https://api.cloudinary.com/v1_1/subhajitdas/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => {
        console.log(err);
        showErrorToast("An error occurred while uploading the image");
      });
  };

  const loadFile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const showErrorToast = (msg) => {
    toast.error(msg);
  };

  const showSuccessToast = (msg) => {
    toast.success(msg);
  };

  return (
    <div className='createpost'>
      <div className='post-header'>
        <h4 style={{ margin: '3px auto' }}>Create New Post</h4>
        <button id='post-btn' onClick={postDetails}>Share</button>
      </div>
      <div className='main-div'>
        <img id='output' src='https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png' alt='Preview' />
        <input type='file' accept='image/*' onChange={(event) => {
          loadFile(event);
          setImage(event.target.files[0]);
        }} />
      </div>
      <div className='details'>
        <div className='card-header'>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type='text'
          placeholder='Write a caption...'
        ></textarea>
      </div>
    </div>
  );
}
