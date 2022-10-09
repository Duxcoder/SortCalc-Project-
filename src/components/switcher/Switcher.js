import React from "react";
import './switcher.css'


const Switcher = () => {

    return (
        
              <div className="toggle-switch switch-vertical">
                <input id="toggle-a" type="radio" name="switch" defaultChecked={true}/>
                <label htmlFor="toggle-a">Вес</label>
                <input id="toggle-b" type="radio" name="switch" />
                <label htmlFor="toggle-b">Длина</label>
                <span className="toggle-outside">
                <span className="toggle-inside"></span>
                </span>
            </div>
        
    )
    
    }
    
    export default Switcher