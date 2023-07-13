import React from 'react';
import '../../styles/global/Snackbar.css';

const Snackbar = (props) => {
  return (

    <div className={`snackbar__container ${props.show ? 'show' : ''}`}>
      <div  className={'snackbar__message'}>{props.message}</div>
      <div  className="snackbar__dismiss" onClick={props.onClose}>
        &times;
      </div>
    </div>
  );
};

export default Snackbar;
