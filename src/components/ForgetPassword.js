import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import CloseButton from 'react-bootstrap/CloseButton'
import './css/Modal.css';
import './css/ForgetPassword.css';
import closeModalIcon from "../images/icons/closeModal.png";


const Modal = props => {
    const [email, setEmail] = useState("");
  
    function onSubmit(e) {
      e.preventDefault();
  
      setEmail("");
    }
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div onClick={e => e.stopPropagation()}>
        <div className="modal-body">
        <div className="forget-password">
        <button className="closeButton" onClick={props.onClose}><img src={closeModalIcon}/></button>
            <div className="forget-password-text-container">
            <h1 className="forget-password-heading">Reset your password</h1>
            <span className="forget-password-text">To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</span>
            </div>
            <form onSubmit={onSubmit}>
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
                <button type="submit" className="reset-password-button">Reset Password</button>
            </form>
        </div>
        </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
