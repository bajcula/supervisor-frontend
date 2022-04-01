import React, {useState} from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

const EditUserComp = (props) => {
    const theCurrentUser = JSON.parse(localStorage.getItem('user'))
    const [editedUser, setEditedUser] = useState(theCurrentUser)
    const handleEditUserInputChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value
        })
    }
    
    const submissionEditedUser = (e) => {
        e.preventDefault()
        let validSubmission = true
        if (editedUser.firstName.length < 2) {
            props.setServerError("Sorry, your first name can't be a single character.")
            validSubmission = false
        }
        if (editedUser.lastName.length < 2) {
            props.setServerError("Sorry, your last name can't be a single character.")
            validSubmission = false
        }
        if (validSubmission===true) {
            props.updateUser(theCurrentUser._id, editedUser)
            props.setServerError("You have succesfully updated your profile.")
        }
        validSubmission = true
    }

    return (
        <div id='register-container'>
            <img height='100px' width='100px' src={theCurrentUser.img} alt='user-face'></img>
        <h3 className="page-title">Update your information:</h3>
        <section className="form-container">
            <form className="new-user-form-container" action="/users" method="POST" encType="multipart/form-data">

                <div className="form-row-container">
                    <label htmlFor="firstName">First Name:</label>
                    <input onChange={handleEditUserInputChange} type="text" name="firstName" required value={editedUser.firstName}/>
                </div>

                <div className="form-row-container">
                    <label htmlFor="lastName">Last Name:</label>
                    <input onChange={handleEditUserInputChange}  type="text" name="lastName" required value={editedUser.lastName}/>
                </div>

                <div className="form-row-container">
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleEditUserInputChange}  type="text" name="email" required value={editedUser.email}/>
                </div>



                <div className="form-row-container">
                    <label htmlFor="img">Image link:</label>
                    <input onChange={handleEditUserInputChange}  type="text" name="img"/>
                </div>

                <div className="form-row-container">
                    Button for password change
                </div>
                

                <Button variant="contained" onClick={submissionEditedUser} type="submit">Submit</Button>
                
            </form>
            
        </section>
        <Link to='/delete'><Button id='delete-btn' color="warning" variant="contained">DELETE</Button></Link>
    </div>
    )
}

export default EditUserComp