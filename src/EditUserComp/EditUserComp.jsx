import React, {useState} from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import './EditUser.css'

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
            props.resetStatus()
            validSubmission = false
        }
        if (editedUser.lastName.length < 2) {
            props.setServerError("Sorry, your last name can't be a single character.")
            props.resetStatus()
            validSubmission = false
        }
        if (validSubmission===true) {
            props.updateUser(theCurrentUser._id, editedUser)
        }
        
        validSubmission = true
    }

    return (
        <div id='edit-container'>
            
        <h4 className="page-title">Update your information</h4>
        <img height='135px' width='135px' src={theCurrentUser.img} alt='user-foto'></img>
        <section className="form-container">
            <form className="edit-user-form-container" action="/users" method="POST" encType="multipart/form-data">

                <div className="form-row-container">
                    <label htmlFor="firstName">First Name:</label>
                    <input className='input' onChange={handleEditUserInputChange} type="text" name="firstName" required value={editedUser.firstName}/>
                </div>

                <div className="form-row-container">
                    <label htmlFor="lastName">Last Name:</label>
                    <input className='input' onChange={handleEditUserInputChange}  type="text" name="lastName" required value={editedUser.lastName}/>
                </div>

                <div className="form-row-container">
                    <label htmlFor="email">Email:</label>
                    <input className='input' onChange={handleEditUserInputChange}  type="text" name="email" required value={editedUser.email}/>
                </div>
                <div className="form-row-container">
                    <label htmlFor="img">Image link:</label>
                    <input className='input' onChange={handleEditUserInputChange}  type="text" name="img"/>
                </div>
                <Button id='submit-edit-btn' variant="contained" onClick={submissionEditedUser} type="submit">Submit</Button>
                
            </form>
            <div className="buttons-div-edit-user-page">
                    <Link className='link' to='/password'><Button id='change-pass-btn' color='warning' variant='outlined'>Change password</Button></Link>
                    <Link className='link' to='/delete'><Button id='delete-btn-view-edit' color="warning" variant="contained">DELETE PROFILE</Button></Link>
            </div>
            
        </section>
    </div>
    )
}

export default EditUserComp