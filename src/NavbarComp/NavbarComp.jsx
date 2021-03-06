import React from "react";
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NavbarComp = (props) => {
    const navigate = useNavigate()
    // let theCurrentUserObj
    // if (localStorage.getItem('user')) {
    //     theCurrentUserObj = JSON.parse(localStorage.getItem('user'))
    // }
    // let theCurrentUserObj = JSON.parse(localStorage.getItem('user'))
    // console.log(theCurrentUserObj)
    const logOut = () => {
        localStorage.clear()
        navigate('/home')
    }

    return (
        <div id='navbar'>
            <h1 id='title'><b>SUPERVISOR</b></h1>
            <h2 id='subtitle'>A place for keeping track of your employees.</h2>
            {localStorage.getItem("user")?
            <>
            {/* <h5>Welcome {theCurrentUserObj.firstName}!</h5> */}
            <section id='nav-buttons'>
                <Link to='/home'><Button className="button" variant="contained">HOME</Button></Link>
                <Link to='/edit'><Button  variant="contained">EDIT PROFILE</Button></Link>
                <Link to='/home'><Button className="button" variant="contained" onClick={logOut}>SIGN OUT</Button></Link>
            </section>
            </>
            :   
            <section id="nav-buttons-unlog">
            <Link to='/signup'><Button className="button" variant="contained">SIGN UP</Button></Link>
            <Link to='/signin'><Button className="button" variant="contained">SIGN IN</Button></Link>
            </section>
            }
            <p id="err-msg">{props.serverError}</p>
        </div>
    )
}

export default NavbarComp