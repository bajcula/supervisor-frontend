import React from 'react';
import WorkersContainerComp from '../WorkersContainerComp/WorkersContainerComp';
import FetchQuoteComp from '../FetchQuoteComp/FetchQuoteComp';
import './MainPage.css'

const MainPageComp = (props) => {
    
    return (
        <div id='main-page'>
            <FetchQuoteComp author={props.author} quote={props.quote}></FetchQuoteComp>
            {localStorage.getItem('user')?
            <WorkersContainerComp serverError={props.serverError} setServerError={props.setServerError}/>
            :
            <div id='not-logged-in-div'>
                <p id='not-logged-in-msg'>Please SIGN IN in order to use our app. Thank You.</p>
                <p>Feeling lazy? Use these credentials!</p>
                <p>email: <b>stevieG@mail.com</b>    |    password: <b>123</b></p>
                <img src='/winding-road-sign.jpeg' alt='arrow pointing UP'></img>
            </div>
            }
            
        </div>
    )
}

export default MainPageComp