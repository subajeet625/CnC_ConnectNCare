import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { FaPaw } from 'react-icons/fa';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { FaAmbulance } from 'react-icons/fa';
import { GiHummingbird } from 'react-icons/gi';
import { BsFillChatLeftDotsFill } from 'react-icons/bs';
import { MdOutlineAmpStories } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { MdVolunteerActivism } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import './SideBar.css';
import { AnimatePresence } from 'framer-motion';

const routes = [
  {
    path: '/adopt',
    name: 'Adopt',
    icon: <FaPaw />,
  },
  {
    path: '/doctor',
    name: 'Health',
    icon: <FaBriefcaseMedical />,
  },
  {
    path: '/rescue',
    name: 'Rescue',
    icon: <FaAmbulance />,
  },
  {
    path: '/freeme',
    name: 'FreeMe',
    icons: <GiHummingbird />,
  },
  {
    path: 'chat',
    name: 'Chat',
    icon: <BsFillChatLeftDotsFill />,
  },
  {
    path: '/stories',
    name: 'Stories',
    icon: <MdOutlineAmpStories />,
  },
  {
    path: '/market',
    name: 'Shop',
    icon: <FaShoppingCart />,
  },
  {
    path: '/programs',
    name: 'Programs',
    icon: <MdVolunteerActivism />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [tokenPresent, setTokenPresent] = useState(false);
   useEffect(() => {

    
    // Check if a JWT token is present in local storage
    const token = localStorage.getItem('jwt');
    if (token) {
      setTokenPresent(true);
    }
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: '140px',
      padding: '5px 15px',
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  }

   return (
    <>
      <div className="main-container">
        {tokenPresent && (
          <motion.div
            animate={{
              width: isOpen ? '200px' : '45px',
              transition: {
                duration: 0.5,
                type: 'spring',
                damping: 10,
              },
            }}
            className={`sidebar `}
          >
            <div className="top_section">
              <AnimatePresence>
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                  >
                    ConnectnCare
                  </motion.h1>
                )}
              </AnimatePresence>
    
              <div className="bars">
                <FaBars onClick={toggle} />
              </div>
            </div>
            <div className="search">
              <div className="search_icon">
                <BiSearch />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.input
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={inputAnimation}
                    type="text"
                    placeholder="Search"
                  />
                )}
              </AnimatePresence>
            </div>
            <section className="routes">
              {routes.map((route, index) => (
                <div className="link-container" key={index}>
                  <NavLink
                    to={route.path}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </div>
              ))}
            </section>
          </motion.div>
        )}

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;