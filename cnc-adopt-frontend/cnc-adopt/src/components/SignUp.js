import React, { useState,useEffect,useContext } from "react";
import "../css/SignUp.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { LoginContext } from "../context/logincontext";


export default function SignUp() {
  const {setUserLogin} = useContext(LoginContext)
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;





  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        "Password must contain at least 8 characters, including at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character such as @, #, !"
      );
      return;
    }
    fetch("http://localhost:5000/SignUp", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/SignIn");
        }
        console.log(data);
      });
  };

const continueWithGoogle=(credentialResponse)=>{
console.log(credentialResponse);
const jwtDetail = jwt_decode(credentialResponse.credential)
console.log(jwtDetail)
fetch("/googleLogin",
 fetch("http://localhost:5000/SignUp", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: jwtDetail.name,
        userName: jwtDetail,
        email: jwtDetail.email,
        email_verified:jwtDetail.email_verified,
        clientId:credentialResponse.clientId,
        Photo:jwtDetail.picture 
      })
    })
      .then(res => res.json())
      .then(data => {
         if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user",JSON.stringify(data.user) );
          setUserLogin(true)
          navigate("/");
        }
        console.log(data);
      }))
}



  return (
    <div className="SignUp">
      <div className="form-container">
        <div className="form">
          <img src={logo} className="SignUpLogo" />
          <p className="loginPara">Sign Up To Get Connected !!!</p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="loginPara" style={{ fontSize: "13px", margin: "3px 0px" }}>
            By signing up, you agree to our Terms, privacy policy and cookies policy.
          </p>
          <input type="submit" id="submit-btn" value="Sign Up" onClick={() => postData()} />
          <hr/>
          <GoogleLogin
  onSuccess={credentialResponse => {
    continueWithGoogle(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
          <div className="form2">
            Already have an account?
            <Link to="/SignIn">
              <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
