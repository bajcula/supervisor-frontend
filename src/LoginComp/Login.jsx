import React, {useState} from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

const LoginComp = (props) => {
    const [possibleUser, setPossibleUser] = useState({
        email: "",
        password: ""
    })
    const handleLoginInput = (e) => {
        setPossibleUser({
            ...possibleUser,
            [e.target.name]: e.target.value
        })
    } 

    const logInReq = () => {
        props.tryToLogin(possibleUser)
    }

    return (
        <div id='signin'>
            <p>This is where people log in: </p>
                EMAIL:<br/> <TextField onChange={handleLoginInput} name="email" id="email-login-field"></TextField>
                PASSWORD:<br/> <TextField onChange={handleLoginInput}  name='password' id='password-login-field'></TextField>
            <Link to='/home'><button onClick={logInReq}>SIGN IN</button> <br/></Link>
        </div>
    )
}

export default LoginComp