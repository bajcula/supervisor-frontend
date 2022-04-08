import React, {useState} from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Register.css'


const RegisterComp = (props) => {
    const navigate = useNavigate()
    if (localStorage.getItem('user')) {
        navigate('/home')
    }
    const resetValidStatus = () => {
        setTimeout(()=>{
            props.setUserIsValid("")
        }, 8000)
    }
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    })
    const handleNewUserInputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const submissionNewUser = (e) => {
        e.preventDefault()
        let validSubmission = true
        if (newUser.firstName.length < 2) {
            props.setUserIsValid({
                valid:false,
                message: "Your first name can't be a single character."
            })
            validSubmission = false
        }
        if (newUser.lastName.length < 2) {
            props.setUserIsValid({
                valid:false,
                message: "Your last name can't be a single character."
            })
            validSubmission = false
        }
        if (!newUser.email.includes("@")) {
            props.setUserIsValid({
                valid:false,
                message: "Email must include '@' symbol."
            })
            validSubmission = false
        }
        if (newUser.password.length < 8) {
            props.setUserIsValid({
                valid:false,
                message: "Your password must be at least 8 characters long."
            })
            validSubmission = false
        }
        // password validation
        if (!props.passwordCheck(newUser.password)) {
            props.setUserIsValid({
                valid:false,
                message: "Your password must contain at least one lowercase letter, uppercase letter, and number."
            })
            validSubmission = false
        }
        if (newUser.lastName.length < 2) {
            props.setUserIsValid({
                valid:false,
                message: "Your last name can't be a single character."
            })
            validSubmission = false
        }
        if (validSubmission===true) {
            props.addNewUser(newUser)
            setNewUser({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            })
            props.setUserIsValid({
                valid:true,
                message:""
            })
        }
        resetValidStatus()
        validSubmission = true
    }

    return (
        <div id='register-container'>
            <h3 className="page-title">Sign Up</h3>
            <section className="form-container">
                <form className="new-user-form-container" >
                    { props.userIsValid.valid ? null : <p className="err-msg">{props.userIsValid.message}</p> } 
                    <div className="form-row-container">
                        <label htmlFor="firstName">First Name:</label>
                        <input onChange={handleNewUserInputChange} type="text" name="firstName" required/>
                    </div>

                    <div className="form-row-container">
                        <label htmlFor="lastName">Last Name:</label>
                        <input onChange={handleNewUserInputChange}  type="text" name="lastName" required/>
                    </div>

                    <div className="form-row-container">
                        <label htmlFor="email">Email:</label>
                        <input onChange={handleNewUserInputChange}  type="text" name="email" required/>
                    </div>

                    <div className="form-row-container">
                        <label htmlFor="password">Password:</label>
                        <input onChange={handleNewUserInputChange}  type="password" name="password" required/>
                    </div>

                    <div className="form-row-container">
                        <label htmlFor="img">Image link:</label>
                        <input onChange={handleNewUserInputChange}  type="text" name="img"/>
                    </div>
                    

                    <Button variant="contained" onClick={submissionNewUser} className="button-treat-main form-button" type="submit">Register</Button>

                </form>
            </section>
            <div className="requirements">
                <p>REQUIREMENTS:<br/> Your first and last name need to be at least 2 characters long. For your own security, your password must include at least one lowercase, one uppercase and one number.</p>
            </div>
        </div>
    )
}

export default RegisterComp