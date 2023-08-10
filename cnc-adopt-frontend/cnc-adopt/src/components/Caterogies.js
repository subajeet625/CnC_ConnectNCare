import React from "react";


import adoptimg from "../img/adopty2.jpg" ;
import doctorimg from "../img/doctor.jpg";
import rescueimg from "../img/rescue.avif";
import freemeimg from "../img/freeme.jpg";
import friendsimg from "../img/friends.jpg";
import blogimg from "../img/BLOG.jpg";
import storyimg from "../img/STORIES.jpg";
import marketimg from "../img/market.jpg";
import programimg from "../img/programs.jpg";
import { Link } from "react-router-dom";
import "../css/Categories.css";
export default function Categories(){

  
    return(
        <div>
            
            <div id="container">
            <div className="box1">
                <h1>Sections</h1>
                <div className="photo">
                    <Link to="/adopt">
                        <figure className="cards">
                            <img src={adoptimg} />
                            <figcaption>ADOPTION</figcaption>

                        </figure>
                    </Link>
                    <Link to="/doctor">
                        <figure className="cards">
                            <img src={doctorimg} />
                            <figcaption>DOCTOR</figcaption>

                        </figure>
                    </Link>
                    <Link to="/rescue">
                        <figure className="cards">
                            <img src={rescueimg} />
                            <figcaption>RESCUE</figcaption>

                        </figure>
                     </Link>
                    <Link to="/freeme">
                        <figure className="cards">
                            <img src={freemeimg} />
                            <figcaption>FREE-ME</figcaption>

                        </figure>
                    </Link>
                    <Link to="/chat">
                        <figure className="cards">
                            <img src={friendsimg} />
                            <figcaption>CHAT</figcaption>

                        </figure>
                    </Link>
                    <Link to="/blog">
                        <figure className="cards">
                            <img src={blogimg} />
                            <figcaption>BLOG</figcaption>

                        </figure>
                    </Link>
                    <Link to="/stories">
                        <figure className="cards">
                            <img src={storyimg} />
                            <figcaption>STORIES</figcaption>
                           </figure>
                       
                        </Link>
                        <Link to="/market">
                        <figure className="cards">
                            <img src={marketimg} />
                            <figcaption>MARKET</figcaption>

                        </figure>
                    </Link>
                    <Link to="/programs">
                        <figure className="cards">
                            <img src={programimg} />
                            <figcaption>PROGRAMS</figcaption>

                        </figure>
                    </Link>
                  
                </div>

            </div>

         </div>
        </div>
    )

}