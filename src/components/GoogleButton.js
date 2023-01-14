import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Navigate} from 'react-router-dom';
import GoogleLogin from 'react-google-login'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import './css/GoogleButton.css';
import GoogleIcon from "../images/new-google-favicon-512.png"
export class GoogleButton extends Component {
    responseSuccessGoogle=(response)=>{
        console.log(response.tokenId);
        console.log(response.profileObj);
        axios({
            method: "POST",
            url: "http://localhost:5000/users/auth/login",
            data: {tokenId: response.tokenId}
        }).then((response) => {
            const accountEvent = this.props.login? 'logged in' : 'signed up';
            toast.success(`You have successfully been ${accountEvent}!`);
            this.props.loginUserDetail(response);
            this.props.updateToken(response);
            this.props.updateLogin(this.props.loggedIn);
        }).catch((err) => {
            const errorMessage = this.props.login? 'logging you in' : 'signing you up';
            toast.error(`Sorry,there was an issue while ${errorMessage}.`); 
        })
    }
    responseErrorGoogle=(response)=>{
        console.log(response);
        console.log(response.profileObj);
    }
    render() {
        const googleText = this.props.login? 'Login with Google' : 'Sign-up with Google';
        if (this.props.loggedIn) {

            return <Navigate
            to={{
              pathname: "/dashboard",
            }}
          />

        } else {
            return (
                <div>
                    <GoogleLogin 
                    clientId="617015858222-1ddpao4ifrsv6i6e9430ljrjfe9mnfe0.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button className={"customGoogleButton" + (this.props.login? 'Login' : '')} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                          {googleText}
                          <img className="buttonIcons" src={GoogleIcon} />
                        </button>
                      )}
                    buttonText="Signup with Google"
                    onSuccess={this.responseSuccessGoogle}
                    onFailure={this.responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                    />
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
            )
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.loggedIn
});

const mapDispatchToProps = () => ({ 
    loginUserDetail(res) {
        return ( {
            type: "CHANGE_USER_ALL",
            user: {
            loggedIn: true,
            username: res.data.user.name,
            email: res.data.user.email,
            _id: res.data.user._id,
            bio: res.data.user.bio,
            avi: res.data.user.avi,
            privateChats: res.data.user.privateChats
            }
        });
    },
    updateToken(res) {
        return ({
            type: "CHANGE_TOKEN",
            token: res.data.token,
        });
    },
    updateLogin(loggedIn) {
        return ({
            type: "CHANGE_LOGGEDIN",
            loggedIn: !loggedIn,
        });
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(GoogleButton);