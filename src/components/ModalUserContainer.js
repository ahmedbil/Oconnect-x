import React, { useState, useContext, useCallback, useEffect } from "react";
import {SocketContext} from "../context/socket";
import { useSelector } from 'react-redux';
import "./css/ModalUserContainer.css"
import ModalUser from './ModalUser'


export default function ModalUserContainer(props) {
  //const mainSocket = useContext(SocketContext);
  const userID = useSelector(state => state._id);
  const [selectedUsers, setselectedUsers]  = useState([userID]);
  
  function selectUser(userID) {
    const exists = selectedUsers.includes(userID);
    if (exists) {
      const tempSelectedUsers = [...selectedUsers];
      const index = tempSelectedUsers.indexOf(userID);
      if (index > -1) {
        tempSelectedUsers.splice(index, 1)
        setselectedUsers(tempSelectedUsers);
      }
    } else {
      setselectedUsers([...selectedUsers, userID]);
    }
  }

  /*useEffect(() => {
    mainSocket.emit("createRoom", {userID});
  }, []);*/

  function onClick(e) {
    const data = {usersID: selectedUsers , adminID: userID}
    //mainSocket.emit("Invite", {data})
    }

  return(
            <div className="modal-users-container">
              <button onClick={onClick}>Chat!</button>
              {props.users.map((user) => {
                return <ModalUser user={user} selectUser={selectUser}/>
              })}
            </div>
   );

 }