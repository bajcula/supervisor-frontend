import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const NavbarComp = (props) => {
    const theCurrentUser = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div id='navbar'>
            <h1 id='title'><b>SUPERVISOR</b></h1>
            <h2 id='subtitle'>A place for keeping track<br/> of your employees.</h2>
            {localStorage.getItem("user")?
            <>
            

            <h5>Welcome {theCurrentUser.firstName}!</h5>
            <section id='nav-buttons'>
                <Link to='/home'><Button  variant="contained">HOME</Button></Link>
                <Link to='/'><Button  variant="contained" onClick={logOut}>SIGN OUT</Button></Link>
            </section>
            <Link to='/edit'><Button  variant="contained">EDIT PROFILE</Button></Link>
            </>
            :   
            <section id="nav-buttons-unlog">
            <Link to='/signup'><Button variant="contained">SIGN UP</Button></Link>
            <Link to='/signin'><Button  variant="contained">SIGN IN</Button></Link>
            </section>
            }
        </div>
    )
}

export default NavbarComp