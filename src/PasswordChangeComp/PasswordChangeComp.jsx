import React, {useState} from "react";
import { TextField, Button } from "@mui/material";

const PasswordChangeComp = (props) => {
    const [passwordsContainer, setPasswordsContainer] = useState({
        oldPass: "",
        newPass: "",
        newPassConf: ""
    })
    const theCurrentUser = JSON.parse(localStorage.getItem('user'))
    const handlePasswordFieldChanges = (e) => {
        setPasswordsContainer({
            ...passwordsContainer,
            [e.target.name]:e.target.value
        })
    }
    const submissionChangePass = (e) => {
        e.preventDefault()
        console.log(passwordsContainer)
        console.log(passwordsContainer.newPass)
        if (passwordsContainer.newPass === passwordsContainer.newPassConf) {
            props.changePassword(theCurrentUser._id, passwordsContainer.oldPass, passwordsContainer.newPass)
        } else {
            props.setServerError("Your new password fields do not match.")
            props.resetStatus()
        }
    } 

    return (
        <div id='edit-pass-div'>
            <h3>Change password:</h3><br/>

            <form>
                <div>
                Type your old password:<br/>
                <TextField onChange={handlePasswordFieldChanges} type='password' name="oldPass"></TextField>
                </div>
                <div>
                Type your new password:<br/>
                <TextField onChange={handlePasswordFieldChanges} type='password' name="newPass"></TextField>
                </div>
                <div>
                Confirm your new password:<br/>
                <TextField onChange={handlePasswordFieldChanges} type='password' name="newPassConf"></TextField>
                </div>
                <Button id='submit-edit-btn' variant="contained" onClick={submissionChangePass} type="submit">Submit change</Button>
            </form>

        </div>

    )
}

export default PasswordChangeComp