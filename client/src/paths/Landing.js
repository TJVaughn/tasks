import React, { useState, useEffect} from 'react';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import homeImg from '../assets/home.png'
import homeImgM from '../assets/home-m.png'
import projectImg from '../assets/project.png'
import tasksImg from '../assets/tasks.png'
import { Link } from 'react-router-dom';

export default function Landing() {
    gsap.registerPlugin(ScrollTrigger)
    const setAnimOptions = (trig, endTrig) => {
        let animOptions = {
            scrollTrigger: {
                start: "center 50%", 
                end: "center 50%",
                // trigger: ".end-scene-1",
                trigger: trig,
                endTrigger: endTrig,
                // endTrigger: "#todo-list-img",
                // scrub: 2,
                pin: true,
                // toggleActions: "restart pause reverse pause",
                // markers: true
            },
            // x:0,
            // scale: 1
        }
        return animOptions
    }

    useEffect(() => {
        // gsap.to('.scene-1', setAnimOptions('.scene-1', '.scene-2'))
        gsap.to('.scene-2', setAnimOptions('.scene-2', '.scene-3'))
        gsap.to('.scene-3', setAnimOptions('.scene-3', '.scene-4'))
        gsap.to('.scene-4', setAnimOptions('.scene-4', '.scene-5'))
        gsap.to('.scene-5', setAnimOptions('.scene-5', '.scene-6'))

    }, [])

    return(
        <div>
            <div className="scene scene-1 jumbo">
                <h1>Could Do List</h1>
                <h3>Empower yourself</h3>
            </div>
  
            <div className="scene scene-2 jumbo">
                <h2>A task managment application built around you</h2>
                <p>
                    Our mission is to give you more time and freedom
                </p>
                <div>
                    <img className="img mobile" alt="home page-mobile, add a new project" src={homeImgM} />
                </div>
            </div>
            <div className="scene scene-3 jumbo">
                <h2>Add a new project</h2>
                {/* <p></p> */}
                <div className="img-container">
                    <img className="img" alt="home page, add a new project" src={homeImg} />
                    {/* <img className="img" alt="home page-mobile, add a new project" src={homeImgM} /> */}
                </div>
            </div>
            <div className="scene scene-4 jumbo">
                <h2>Categorize your tasks</h2>
                <div className="img-container">
                    {/* <img className="img" alt="add categories and tasks - mobile" src={projectImgM} /> */}
                    <img className="img" alt="add categories and tasks" src={projectImg} />
                </div>
            </div>
            <div className="scene-5 scene jumbo">
                <h2>Add Tasks</h2>
                <p>Add them to the general could do list, or a custom category!</p>
                <div className="img-container">
                    {/* <img className="img" alt="add categories and tasks - mobile" src={projectImgM} /> */}
                    <img className="img" alt="add categories and tasks" src={tasksImg} />
                </div>
            </div>
            <div className="scene scene-6 jumbo">
                <h2>
                    It's Free and Open Source!
                </h2>
                <h2>
                    Give the app a try!
                </h2>
                <Link className="btn btn-action" to="/login-signup">Signup</Link>
            </div>
            <div>
                <h2 className=""> Links</h2>
                <ul>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/TJVaughn/tasks">github</a>
                    </li>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href="https://paypal.me/TrevorHauck?locale.x=en_US">support(paypal)</a>

                    </li>

                </ul>
                
            </div>
        </div>
    )
}
