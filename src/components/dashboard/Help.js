import React from 'react';
import Icon from '../Icon';



let Help = ({display, content, exit}) => {

  let noBubbleExit = (event) => {
    if(event.currentTarget == event.target) exit();
  }

  return display ? (
    <div className="help" onClick={(event) => {
        if(event.currentTarget == event.target) exit();
    }}>
      <div className="help--display card">
        <div className="help--header">
          <Icon symbol={Icon.SYMBOLS.X} className="help--exit" onClick={exit}/>
        </div>
        <div className="card--content">
          {content || ""}
        </div>
      </div>
    </div>
  ) : null;
}

export default Help;
