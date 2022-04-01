import React from 'react';
import { Button } from '@mui/material';


const DeleteUserComp = (props) => {
    const theCurrentUser = JSON.parse(localStorage.getItem('user'))
    return (
        <div id='delete-page'>
            <h4>Are you sure you want to delete your profile? All of your workers data will be deleted too!</h4>
            <Button id='delete-btn' variant="contained" onClick={()=>props.deleteUser(theCurrentUser._id, theCurrentUser)} type="submit">DELETE PROFILE</Button>
        </div>
    )
}

export default DeleteUserComp