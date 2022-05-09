import React from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const email = "user2@gmail.com";
export const mainSocket = io("http://localhost:5000")//, {transports: ['websocket'], upgrade: false});
export const SocketContext = React.createContext();
