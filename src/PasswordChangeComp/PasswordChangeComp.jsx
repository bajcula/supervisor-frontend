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
        if (passwordsContainer.newPass === passwordsContainer.newPassConf) {
            if (props.passwordCheck(passwordsContainer.newPass)) {
                props.changePassword(theCurrentUser._id, passwordsContainer.oldPass, passwordsContainer.newPass)
            } else {
                props.setServerError("Your new password needs to contain at least one lowercase, one uppercase and one number.")
                setTimeout(()=>{
                    props.setServerError("")
                }, 8000)
            }
        } else {
            props.setServerError("Your new password fields do not match.")
            setTimeout(()=>{
                props.setServerError("")
            }, 8000)
        }
    } 

    return (
        <div id='edit-pass-div'>
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
            <div className="requirements">
                <h6>PASSWORD REQUIREMENTS:</h6>
                <p>For your own security, your new password must contain one lowercase, one uppercase and one number.</p>
            </div>
        </div>

    )
}

export default PasswordChangeComp