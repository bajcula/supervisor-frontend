import React from "react";
import { Outlet } from "react-router-dom";
import FooterComp from "../FooterComp/FooterComp";
import NavbarComp from "../NavbarComp/NavbarComp";

const MainComp = () => {
    return (
        <div className="App">
            <NavbarComp ></NavbarComp>
            <Outlet></Outlet> 
            <FooterComp></FooterComp> 
      </div>
    )
}

export default MainComp