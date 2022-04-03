import React from "react";
import './Quote.css'

const FetchQuoteComp = (props) => {

    return(
      <>
      {props.quote &&
        <div id='quote-div'>
            <>
            <h6>Quote of the day:</h6>
            <p>{props.quote}</p>
            {props.author === ""?
            <i>Unknown Author</i>
            :
            <i>{props.author}</i>
            }
            </>
        </div>
      }
      </>
    )
}
export default FetchQuoteComp