import React from 'react';
import { Button } from '@mui/material';


const DeleteUserComp = (props) => {
    const theCurrentUser = JSON.parse(localStorage.getItem('user'))
    return (
        <Button id='delete-btn' variant="contained" onClick={()=>props.deleteUser(theCurrentUser._id, theCurrentUser)} type="submit">DELETE PROFILE</Button>
    )
}

export default DeleteUserComp