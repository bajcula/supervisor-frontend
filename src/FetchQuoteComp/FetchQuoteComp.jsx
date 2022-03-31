import React from "react";
import './Quote.css'

const FetchQuoteComp = (props) => {

    return(
        <div id='quote-div'>
          <h5>Quote of the day:</h5>
          <p>{props.quote}</p>
          {props.author === ""?
          <i>Unknown Author</i>
          :
          <i>{props.author}</i>
          }
        </div>
    )
}
export default FetchQuoteComp