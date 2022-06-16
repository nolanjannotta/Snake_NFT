import React from 'react'
import Supply from './Supply';
import Body from './Body';
import "./MainBody.css";


function MainBody(props) {
  return (
      <div className="main_body">

          <Supply snake={props.snake}></Supply>
            <Body snake={props.snake}></Body>
    </div>
  )
}

export default MainBody