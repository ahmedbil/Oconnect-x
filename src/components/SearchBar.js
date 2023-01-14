import React, {useContext, useEffect, useState} from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ModalUserContainer from "./ModalUserContainer";


const SearchBar = () => {
    
    const [users, setUsers] = useState([]);

 useEffect(() => {
    axios.get("http://localhost:5000/users/userNames/")
    .then((res) => {
        setUsers(res.data);
        console.log(res);
    })
    .catch((err => {console.log(err)}));
}, []);

return (
    <div>
        <ModalUserContainer users={users}/>
    </div>
    
);
};

export default SearchBar;