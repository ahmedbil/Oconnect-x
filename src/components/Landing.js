//import header from "../images/header.svg";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";


//Style imports
import "./css/Landing.css";
import "./css/FadeIn.css";

export default function Landing() {
  let navigate = useNavigate(); 
  const profile = useSelector((state) => state.profile);

  function logout(e) {
    console.log("Test");
    localStorage.setItem("loggedIn", "false");
    this.setState(this.state);
  }
  
  function getStarted() { 
    console.log("Hello");
    let path = `/signup`; 
    navigate(path);
  }

  const loggedIn = useSelector((state) => state.loggedIn);
  if (!loggedIn) {
    return (
      <>
      <Navbar/>
        <div className="landingHeader fade">
          <h1>OCONNECT-X</h1>
          <span>STAY CONNECTED WITH WORLD AND WORK</span>
          <div className="buttonContainer">
            <button onClick={getStarted} className="getStartedButton">GET STARTED</button>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1340 320"><path fill="#a2d9ff" fill-opacity="1" d="M0,96L16,117.3C32,139,64,181,96,208C128,235,160,245,192,250.7C224,256,256,256,288,213.3C320,171,352,85,384,42.7C416,0,448,0,480,42.7C512,85,544,171,576,202.7C608,235,640,213,672,176C704,139,736,85,768,101.3C800,117,832,203,864,218.7C896,235,928,181,960,165.3C992,149,1024,171,1056,154.7C1088,139,1120,85,1152,80C1184,75,1216,117,1248,149.3C1280,181,1312,203,1344,181.3C1376,160,1408,96,1424,64L1440,32L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"></path></svg>
        </div>
      </>
    );
  } else {
    return (
      <Navigate
        to={{
          pathname: "/dashboard",
          state: profile,
        }}
      />
    );
  }
}
