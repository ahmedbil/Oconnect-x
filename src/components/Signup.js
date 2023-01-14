import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/FadeIn.css"
import './css/Signup.css';
import "./css/SignupForm.css";
import axios from "axios";
import background from "../images/signup.png"
import GoogleIcon from "../images/new-google-favicon-512.png"
import GoogleButton from "./GoogleButton.js"
import Navbar from "./Navbar.js"

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [avi, setAvi] = useState("01");
    const loggedIn = useSelector((state) => state.loggedIn);
  
    function onSubmit(e) {
      e.preventDefault();

      if (confirmPassword !== password) {
        toast.error("Sorry, the passwords don't match."); 
        setConfirmPassword("");
        setPassword("");
        return;
    }
    
      const newUser = {
        name: username,
        password: password,
        email: email,
        avi: avi,
      };
      console.log(newUser);
  
      setUsername("");
      setConfirmPassword("");
      setPassword("");
      setEmail("");
      setAvi("01");
      axios.post("http://localhost:5000/users/signup", newUser).then((res) => {
          console.log("what");
        if (res.data === "User added!") {
            toast.success("You have successfully been signed up!");
        } else {
            toast.error("Sorry,there was an error while signning you up!");  
        }
      });
    }
    return (
        <div className="main">
        <Navbar />
        <div className="row-flex">
        <div>
            <img className="signupImg" src={background}/>
        </div>
        <div id="rightSide">
        <form onSubmit={onSubmit}>
              <div className="allInput">
                <label>User Name</label> <br/>
                <input
                  className="signup-input"
                  type="text"
                  
                  name="Nickname"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              
              <div className="allInput">
                <label>Email</label>
                <input
                  className="signup-input"
                  type="email"
                  
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              
              <div className="allInput">
                <label>Password</label>
                <input
                  className="signup-input"
                  type="password"
                  
                  name="passcode"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="allInput">
                <label>Confirm Password</label>
                <input
                  className="signup-input"
                  type="password"
                  
                  name="passcode"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div> 
              <input type="submit" className="signupButton" value="Continue" />
          </form>
            <div className="vertical-center">
                <GoogleButton/>
            </div>
            <div className="alreadyHaveAnAccountText">
                Already have an account?
                <Link to="/login" className="sign-in-button">   Log In</Link>
            </div>
        </div>
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />
        </div>
    </div>
    )
}