import React, { useEffect } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";


const NavbarComp = (props) => {
    const logOut = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div id='navbar'>
            <h1 id='title'><b>SUPERVISOR</b></h1>
            <h2 id='subtitle'>A place for keeping track<br/> of your employees.</h2>
            {localStorage.getItem("user")?
            <Link to='/'><button onClick={logOut}>SIGN OUT</button></Link>
            :   
            <>
            <Link to='/signup'><button>SIGN UP</button></Link>
            <Link to='/signin'><button>SIGN IN</button></Link>
            </>
            }
        </div>
    )
}

export default NavbarComp