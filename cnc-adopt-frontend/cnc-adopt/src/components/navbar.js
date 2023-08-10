import React,{useContext} from "react";
import "../css/navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { LoginContext } from "../context/logincontext";
export default function Navbar({login}){
  const navigate = useNavigate()
  const {setModalOpen} = useContext(LoginContext)
  const isLoggedIn = () => {
    const token = localStorage.getItem("jwt");
    return token;
  };

  const location = useLocation();
  const showCreatePost = location.pathname === "/adopt";
  const showMyFollowingPost = location.pathname==="/adopt";
  const adoptPage = location.pathname==="/adopt";
  const doctorPage = location.pathname==="/doctor";
  const doctorhome = location.pathname==="/doctorhome"
  const doctorservices = location.pathname==="/doctorservices"
  const findAdoctor = location.pathname==="/doctors"
  const doctorContact = location.pathname==="/doctorcontact"
  const loginStatus = 
  ()=>{
    const token = localStorage.getItem("jwt")
    console.log(token)
    if(login|| token){
      if(!doctorPage && !doctorhome && !doctorservices && !findAdoctor && !doctorContact){
        return[
        <>
        <Link to="/Categories"><li><span class="material-symbols-outlined">
lists
</span></li></Link>
            <Link to="/UrProfile"><li><span class="material-symbols-outlined">
account_circle
</span></li></Link>
            <Link to={""}>
             
                <li className="primaryBtn" onClick={()=>setModalOpen(true)}>
                  <span class="material-symbols-outlined">
logout
</span>
                </li>
              
            </Link>
        </>
      ]
      }
      
    }
    //if we are inside the doctor page 
    
    
    else{
      return[
        <>
         <Link to="/SignUp"><li>SignUp</li></Link>
        </>
      ]
    }
  };
 
//if we are not inside the doctor page then show the navbar
if(!doctorPage && !doctorhome && !doctorservices && !findAdoctor && !doctorContact){
 return (
    <div>
      <div className="navbar">
        <img src={logo} alt=""
        onClick={()=>{navigate("/")}}
        className="logo"
        id="logo"
        />
        <ul className="nav-menu">
          {showCreatePost && isLoggedIn() && <Link to="/createpost"><li>
            <span class="material-symbols-outlined">
add_a_photo
</span>
            </li></Link>}
          {showMyFollowingPost && isLoggedIn() && <Link to="/followingpost" style={{marginLeft:"20px"}}>
            <li>
              <span class="material-symbols-outlined">
subscriptions
</span>
            </li>
            </Link>}
          {loginStatus()}
        </ul>
      </div>
    </div>
  );


}
//if we are inside the doctor page then dont show the navbar
//means return null
else{
   return null;
   
}
 


}