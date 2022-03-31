import React from 'react';
import WorkersContainerComp from '../WorkersContainerComp/WorkersContainerComp';
import FetchQuoteComp from '../FetchQuoteComp/FetchQuoteComp';

const MainPageComp = (props) => {
    
    return (
        <div id='main-page'>
            <FetchQuoteComp author={props.author} quote={props.quote}></FetchQuoteComp>
            {localStorage.getItem('user')?
            <WorkersContainerComp />
            :
            <div id='not-logged-in-div'>
                <p id='not-logged-in-msg'>Please SIGN IN in order to use our app. Thank You.</p>
                <img src='/winding-road-sign.jpeg' alt='arrow pointing UP'></img>
            </div>
            }
            
        </div>
    )
}

export default MainPageComp