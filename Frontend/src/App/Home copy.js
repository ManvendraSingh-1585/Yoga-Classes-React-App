import React from 'react'
import {Link} from 'react-router-dom'
import logo from './../images/logo.png';
export default function Home() {
  return (
    <div className="container">
        <nav id="navbar">
            <Link to='/'><img src={logo} alt="logo"/></Link>
            <label  htmlFor="burger-toggle">
            <div></div>
            </label>
            <ul>
            <li>
                <Link to="/" className="shortcut">Home</Link>
            </li>
            <li>
                <a href='#description-two' className="shortcut">About</a>
            </li>
            <li>
                <Link to="/signup" className="shortcut">Sign Up</Link>
            </li>
            <li>
                <Link to="/login" className="shortcut">Log In</Link>
            </li>
            </ul>
        </nav>
        <section id="nes" >
            <main>
              <h1 >GYM</h1>
            </main>
        </section>
        
        <section className="more">
            <h2>About Us</h2>
            <div className="description" id="description-two">
              <div className="">
                <p>The gym holds significant importance as a dedicated space for physical fitness and well-being. It provides individuals with access to a variety of exercise equipment, specialized training programs, and expert guidance. Regular gym attendance contributes to improved physical health, enhanced cardiovascular fitness, increased strength, and stress relief. Additionally, the gym serves as a community hub, fostering social connections and motivation among individuals with shared fitness goals. Overall, the gym plays a pivotal role in promoting a healthy and active lifestyle.</p>
                </div>
            </div>
            <div id="btn-wrap">
              <Link to="/signup" className="pill">Sign up</Link>
              <Link to="/login" className="pill">Log in</Link>      
            </div>
        </section>
    </div>
  )
}
