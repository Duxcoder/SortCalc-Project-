import React from "react";
import './switcher.css'


const Switcher = (props) => {

  const change = (event) => {
    event.target.id === 'toggle-weight' ? props.weightOn(true) : props.weightOn(false)
    }
    return (
        
              <div className="toggle-switch switch-vertical">
                <input id="toggle-weight" type="radio" name="switch" defaultChecked={true} onChange={change}/>
                <label htmlFor="toggle-weight">Вес</label>
                <input id="toggle-length" type="radio" name="switch" onChange={change}  />
                <label htmlFor="toggle-length">Длина</label>
                <span className="toggle-outside">
                <span className="toggle-inside"></span>
                </span>
            </div>
        
    )
    
    }
    
    export default Switcher