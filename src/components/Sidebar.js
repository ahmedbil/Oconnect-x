//libraries
import React, {useState, useEffect, useContext} from "react";
import { useSelector, useDispatch } from 'react-redux';
import io from "socket.io-client";
import { Link } from "react-router-dom";
import axios from "axios"
import {SocketContext} from "../context/socket";
import SearchBar from "./SearchBar";



//Component Imports
//Style Imports
import "./css/Sidebar.css";

//Icon Imports
import toggleSidebar from "../images/dashboardIcons/Subtract.png";
import togSidebar from "../images/dashboardIcons/greySubtract.jpg";
import messages from "../images/dashboardIcons/messages.png";
//import { StarBorder } from "@material-ui/icons";

export default function SideBar({props, setModalState}) {
  const dispatch = useDispatch();

 const [sidebar, setSidebar] = useState(false);

 const [openChatModal, setChatModal] = useState(false);

 const showSidebar = () => {
   setSidebar(!sidebar);
 };

 const [show, setShow] = useState(true)

 function showModal() {
  setModalState(show)
}

  return (
    <div
      //onClick={showSidebar}
      className={sidebar ? "sidebar-body active" : "sidebar-body"}
    >
      <div
        className={sidebar ? "chat-room-panel active" : "chat-room-panel"}
        
      >
        {openChatModal && <SearchBar/>}
        <div className={sidebar ? "sidebar-title active" : "sidebar-title"}>
          Chats
          <button onClick={() => setChatModal(!openChatModal)}>
            <img src={messages} alt="text" />
          </button>
        </div>
      </div>
      <div
        onClick={showSidebar}
        className={sidebar ? "toggle-container active" : "toggle-container"}
      >
        <Link to="#">
          {sidebar ? (
            <img src={togSidebar} alt="toggle sidebar" />
          ) : (
            <img src={toggleSidebar} alt="toggle sidebar" />
          )}
          {sidebar ? <text>Toggle Sidebar</text> : <text></text>}
        </Link>
      </div>
    </div>
  );
}
