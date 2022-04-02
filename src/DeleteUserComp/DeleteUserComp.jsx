import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './DeleteUser.css'

const DeleteUserComp = (props) => {
    const theCurrentUser = JSON.parse(localStorage.getItem('user'))
    return (
        <div id='delete-page'>
            <h5>Are you sure you want to delete your profile? All of your workers data will be deleted too!?</h5>
            <div id='buttons-container'>
                <Link className='link' to='/home'><Button id='cancel-btn' variant='outlined'>CANCEL</Button></Link>
                <Button color='warning' id='delete-btn' variant="contained" onClick={()=>props.deleteUser(theCurrentUser._id, theCurrentUser)} type="submit">DELETE PROFILE</Button>
            </div>
        </div>
    )
}

export default DeleteUserComp