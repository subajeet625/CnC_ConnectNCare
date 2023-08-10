
import React, { useEffect, useState } from 'react';
import logo from "../doctorimg/drlogo.png"
import { Routes, Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import "./doctorHome.css"
//make an array of paths and display
const navLinks = [
  {
    path:"/doctorhome",
    display:"Home"
  },
  {
    path:"/doctors",
    display:"Find A Doctor"
  },
  {
    path:"/doctorservices",
    display:"Services"
  },
  {
    path:"/doctorcontact",
    display:"Contact"
  }
]
export default function Services() {
  const [tokenPresent, setTokenPresent] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setTokenPresent(true);
    }
  }, []);
  if (!tokenPresent) {
    // If token is not present, you can show a message or redirect to a different page
    return (
      <div className="text-[20px] text-red-600 pt-16">
        You are not authorized to view this page.
      </div>
    );
  }
  // If token is present, show the Doctor component
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img className='drlogo' src={logo} alt='' />
        </div>
       <ul>
        {navLinks.map((items,index) => <li key={index}>
          <NavLink to={items.path}>{items.display}</NavLink>
        </li>)}
       </ul>
      </nav>
      <div className="text">
        {/* Content of the Doctor component */}
      </div>
    </div>
  );
}
