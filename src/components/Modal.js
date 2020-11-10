import React from 'react';
import ReactDOM from 'react-dom';


const Modal = props=>{

    //we put stop Propagation to prevent event bubbling from children to parent componnent
    //we want to go back to streamlist only if we click on baclground
    //but if there is no stop propagation and we click on any place of the modal
    //we will go back to streamlist since there is no event handling in modal
    //and event bubbling will take place event handler for background will be activated

    return ReactDOM.createPortal(
        <div 
        onClick={props.onDismiss}
        className="ui dimmer modals visible active"
        >
        
            <div onClick={(e)=>e.stopPropagation()} 
            className="ui standard modal visible active "
            >
            <div className="header">{props.title}</div>
                <div className="content">
                   {props.content}
                </div>
                <div className="action">
                   {props.actions}
                </div>
            </div>
        </div> ,
        document.querySelector('#modal')
    );
};

export default Modal;