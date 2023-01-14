import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./css/LoginWithEmail.css";
import "./css/FadeIn.css"
import axios from "axios";
import Navbar from "./Navbar";
import GoogleButton from "./GoogleButton.js"
import Modal from "./ForgetPassword";
import welcome from "../images/welcome.png"
import Cookies from 'universal-cookie';

export default function LoginWithEmail() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const isLoggedIn = useSelector((state) => state.loggedIn);
  axios.defaults.withCredentials = true;
  const cookies = new Cookies();
  const instance = axios.create({
    withCredentials: true
  })

  function onSubmit(e) {
    e.preventDefault();
    const userCredentials = {
      email: email,
      password: password
    };
    setEmail("");
    setPassword("");

  
    instance
      .post("http://localhost:5000/users/login", userCredentials, { withCredentials: true })
      .then((res) => {
        toast.success("You're now logged in!"); 
         dispatch({
            type: "CHANGE_USER_ALL",
            user: {
              loggedIn: true,
              username: res.data.user.name,
              email: res.data.user.email,
              _id: res.data.user._id,
              bio: res.data.user.bio,
              avi: res.data.user.avi,
              privateChats: res.data.user.privateChats
            },
          });
          dispatch({
            type: "CHANGE_TOKEN",
            token: res.data.token,
          })
          // cookies.set('token', res.data.token, { path: '/' });
          // localStorage.setItem("token", res.data.token);
          setLoggedIn(true);
          setProfile(res.data);
      })
      .catch((err) => {
        toast.error("Please provide a valid email address and password."); 
      })
  }
  return !isLoggedIn ? (

      <div>
        <Navbar/>
      <div className="login-content">
      <div className="welcome-back">
        <img src={welcome} alt="login_graphic" className="login-img fade" width="60%" />
      </div>
      <div className="input-container">
        <div className="email-login-input">
        <form  onSubmit={onSubmit}>
          <div className="email-input-form">
            <div className="input-field">
              <label>Email
              <input
                className="email-input-box"
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              </label>
            </div>

            <div className="input-field">
              <label>Password
              <input
                className="email-input-box"
                type="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              </label>
            </div>   
            <div onClick={() => setShow(true)} className="forgot-password">Forgot your password ?</div>
            <Modal onClose={() => setShow(false)} show={show}>
            </Modal>  
            <input type="submit" className="login-button" value="Log in" />
          </div>
        </form>
        <div className="vertical-center">
                <GoogleButton login='true'/>
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
        <div className="no-account-email">
          Don't have an account?{" "}
          <Link to="/signup" className="sign-up-button">Sign Up</Link>
        </div>
        </div>
      </div>
      </div>
      </div>
  ) : (
    <Navigate
      to={{
        pathname: "/dashboard",
        state: profile,
      }}
    />
  );
}
