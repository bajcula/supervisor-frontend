import React from "react";
import SplitButton from "../WorkersContainerComp/SplitButtonComp/SplitButtonComp";
import { TextField } from "@mui/material";
import './Search.css'

const SearchComp = (props) => {
    return (
        <div id='search-div'>
            <TextField
            style={{background: "rgb(150, 150, 150)"}}
            onKeyUp={props.handleSearch}
            id="search-bar"
            label="search"
            variant="outlined"
            /> 
            <SplitButton
            setSearchByName={props.setSearchByName}
            >
            SPLIT
            </SplitButton>
    </div>
    )
}

export default SearchComp