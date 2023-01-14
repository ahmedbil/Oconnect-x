//libraries
import React, {useContext, useEffect, useState} from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";
import { Widget } from 'react-chat-widget';


export default function Dashboard(props) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn);
  const userID = useSelector(state => state._id);
  const name = useSelector(state => state.username);
  const email = useSelector((state) => state.email);
  const chatroomName = useSelector((state) => state.chatroomName);
  const privateChats = useSelector((state) => state.privateChats);
  
  useEffect(()=> {
    dispatch({ type: "CHANGE_CHATROOMNAME", chatroomName: false });
  }, [])

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  function logout() {
    dispatch({type: "CHANGE_CHATYPE", chatType: null});
    dispatch({ type: "CHANGE_USERNAME", username: null });
    dispatch({ type: "CHANGE_EMAIL", email: null });
    dispatch({ type: "CHANGE_AVI", avi: null });
    dispatch({ type: "CHANGE_TYPE", myType: null });
    dispatch({ type: "CHANGE_CHATROOM", chatroom: false });
    dispatch({ type: "CHANGE_LASTUSER", lastUser: null });
    dispatch({ type: "CHANGE_LOGGEDIN", loggedIn: false });
    dispatch({ type: "SET_PRIVATECHATROOMS", privateChats: [] });
    window.location.reload();
  }

  const [modalState, setModalState] = useState(false);

  if (!loggedIn) {
    return (
      <Navigate
        to={{
          pathname: "/login",
        }}
      />
    );
  } else {
    return (
      <div className="dashboard">
        <DashboardNavbar logout={logout}/>
        <Sidebar/>
        <Widget
        handleNewUserMessage={handleNewUserMessage}
      />
      </div>
    )
  }
}
