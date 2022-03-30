import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

const LoginComp = () => {
    return (
        <div id='signin-signup'>
            <p>This is where people log in: </p>
                <p>EMAIL:<br/> <TextField id="email-login-field"></TextField></p>
               <p>PASSWORD:<br/> <TextField id='password-login-field'></TextField></p> 
            <Link to='../home'>HOME PAGE</Link>
        </div>
    )
}

export default LoginComp