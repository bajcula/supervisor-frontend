import React, {useState} from "react";
import { Link } from "react-router-dom";

const RegisterComp = (props) => {
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
                message: "Sorry, your first name can't be a single character."
            })
            validSubmission = false
        }
        if (newUser.lastName.length < 2) {
            props.setUserIsValid({
                valid:false,
                message: "Sorry, your last name can't be a single character."
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
        validSubmission = true
    }

    return (
        <div id='register-container'>
            <h3 className="page-title">Sign Up</h3>
            <section className="form-container">
                <form className="new-user-form-container" action="/users" method="POST" encType="multipart/form-data">

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
                    

                    <Link to='/signin'><button onClick={submissionNewUser} className="button-treat-main form-button" type="submit">Register</button></Link>

                </form>
            </section>

        </div>
    )
}

export default RegisterComp