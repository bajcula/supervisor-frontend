import React from "react";
import { TextField } from "@mui/material";

const PasswordChangeComp = () => {
    const theCurrentUser = JSON.parse(localStorage.getItem('user'))
    
    return (
        <div id='edit-pass-div'>
            <h1>Change password:</h1><br/>
            <div>
            Type your old password:<br/>
            <TextField type='password' name="oldPass"></TextField>
            </div>
            <div>
            Type your new password:<br/>
            <TextField type='password' name="newPass"></TextField>
            </div>
            <div>
            Confirm your new password:<br/>
            <TextField type='password' name="newPassConf"></TextField>
            </div>

        </div>

    )
}

export default PasswordChangeComp