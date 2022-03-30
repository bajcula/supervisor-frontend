import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";


const NavbarComp = () => {
    return (
        <div id='navbar'>
            <h1 id='title'><b>SUPERVISOR</b></h1>
            <h2 id='subtitle'>A place for keeping track<br/> of your employees.</h2>
            <Link to='/login'><button>SIGN IN</button></Link>
            <Link to='/'><button>SIGN OUT</button></Link>
            <Link to='/register'><button>SIGN UP</button></Link>
        </div>
    )
}

export default NavbarComp