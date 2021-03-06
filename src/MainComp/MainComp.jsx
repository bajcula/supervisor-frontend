import React from "react";
import { Outlet } from "react-router-dom";
import FooterComp from "../FooterComp/FooterComp";
import NavbarComp from "../NavbarComp/NavbarComp";


const MainComp = (props) => {
    
    

    return (
        <div className="App">
            <NavbarComp serverError={props.serverError} ></NavbarComp>
            <Outlet></Outlet>
            <FooterComp></FooterComp> 
      </div>
    )
}

export default MainComp