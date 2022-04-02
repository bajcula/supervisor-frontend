import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import './Login.css'

const LoginComp = (props) => {
    const navigate = useNavigate()
    if (localStorage.getItem('user')) {
        navigate('/home')
    }
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
                EMAIL <TextField onChange={handleLoginInput} name="email" id="email-login-field"></TextField>
                PASSWORD <TextField onChange={handleLoginInput} type='password'  name='password' id='password-login-field'></TextField>
            <br/><Button variant="contained" onClick={logInReq}>SIGN IN</Button>
        </div>
    )
}

export default LoginComp