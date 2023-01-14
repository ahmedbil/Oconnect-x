import React, {useState} from 'react';
import "./css/ModalUser.css"

// image imports 
import userIcon from "../images/default-avatar.png"

/**
* @author
* @function ModalUser
**/

const ModalUser = (props, user, selectUser) => {
  const [selected, setSelected] = useState(false);

  return(
    <button 
      className={`user-content ${selected ? "selected" : ""}`}
      val={props.user._id}
      onClick = {() => {
        setSelected(!selected);
        props.selectUser(props.user._id);
        }}>
        <img 
            className="user-profile-pic" 
            src={userIcon} /* change this so that it displays the user's profile pic, maybe a {props.icon}*/
        />
        <span className="username"> 
          {props.user.name}
        </span> 
    </button>
   )

 }

export default ModalUser