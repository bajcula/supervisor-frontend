import React, {useState} from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";

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
            <p>Please sign in bellow: </p>
                EMAIL:<br/> <TextField onChange={handleLoginInput} name="email" id="email-login-field"></TextField>
                PASSWORD:<br/> <TextField onChange={handleLoginInput}  name='password' id='password-login-field'></TextField>
            <br/><Link to='/home'><Button variant="contained" onClick={logInReq}>SIGN IN</Button> <br/></Link>
        </div>
    )
}

export default LoginComp