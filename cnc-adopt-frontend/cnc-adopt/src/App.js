import logo from './logo.svg';
import React, { createContext, useState } from 'react';
import './App.css';
import SideBar from './components/Sidebar';
import Navbar from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Categories from './components/Caterogies';
import UrProfile from './screens/UrProfile';
import Info from './components/Info';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Adopt from './screens/adopt';
import Createpost from './screens/createpost';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginContext } from './context/logincontext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';
import Doctor from './components/DOCTOR/Doctor';
import Rescue from './components/Rescue';
import FreeMe from './components/FreeMe';
import Chat from './components/Chat';
import Blog from './components/Blog';
import Stories from './components/Stories';
import Market from './components/Market';
import Programs from './components/Programs';
import DoctorHome from './components/DOCTOR/doctorComponents/DoctorHome';
import Services from './components/DOCTOR/doctorComponents/Services';
import Doctors2 from './components/DOCTOR/doctorComponents/Doctors/Doctors2';
import DoctorDetails from './components/DOCTOR/doctorComponents/Doctors/DoctorDetails';
import Contact from './components/DOCTOR/doctorComponents/Contact';

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

   const toggleSidebar = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <GoogleOAuthProvider clientId="738462810559-g3h913uach43eclac5tqbgak7kdcd2mu.apps.googleusercontent.com">
          <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
            <Navbar login={userLogin} />
            
           <SideBar isOpen={modalOpen} toggle={toggleSidebar} />
               
              <Routes>
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/" element={<Home />} />
                <Route path="/Categories" element={<Categories />} />
                <Route path="/UrProfile" element={<UrProfile />} />
                <Route path="/Info" element={<Info />} />
                <Route path="/adopt" element={<Adopt />} />
                <Route path="/createpost" element={<Createpost />} />
                <Route path="/UrProfile/:userid" element={<UserProfile />} />
                <Route path="/followingpost" element={<MyFollowingPost />} />
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/rescue" element={<Rescue />} />
                <Route path="/freeme" element={<FreeMe />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/market" element={<Market />} />
                <Route path="/programs" element={<Programs />} />



             

               {/* DOCTOR */}


                {/* //App should also know that DoctorHome is linked to "/doctorhome" url */}
                <Route path='/doctorhome' element={<DoctorHome/>}></Route>
                <Route path="/doctorservices" element={<Services/>}></Route>
                <Route path='/doctors' element={<Doctors2/>}></Route>
                <Route path='/doctors/:id' element={<DoctorDetails/>}></Route>
                <Route path='/doctorcontact' element={<Contact/>}></Route>


















































              </Routes>
           
           
            <ToastContainer theme="dark" />
            {modalOpen && <Modal setModalOpen={setModalOpen} />}
          </LoginContext.Provider>
        </GoogleOAuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
