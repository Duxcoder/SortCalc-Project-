import React, {Component} from "react";
import styled from "styled-components";

const Input = styled.input`
    display:inline;
    position:relative;
    width: 160px;
    height:30px;
    border-radius: 8px;
    border: solid 1px #ccc;
    text-align:center;
    outline:none;
    background-color: #fafafa;
    color: #707070;
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    padding-left: 24px;
    padding-right: 24px;
&::placeholder{
    font-weight: 400;
}
&:focus::-webkit-input-placeholder {
    color: transparent;
}
&:focus{
    outline: solid 3px #E1DFDF;
    background-color: #fff;
}
`
const DivInput = styled.div`
    position:absolute;
    display:block;
    text-align: center;
    width:300px;
    height:auto;
`
const SpanText = styled.span`
    display:inline-block;
    padding-bottom: 4px;
    width: 100%;
    color: #747474;
`

export default class BlockInput extends Component {
   
    clickChange = (event) => {
        const arr = {};
        arr[event.target.name] = +event.target.value;
        this.props.valueNum(arr)

    }

    scrollOff = (event) => {
        event.target.blur()
    }   
    clearPlusAndMinus = (event) => {
        if (event.key === 'ArrowUp' || 
            event.key === 'ArrowDown' ||
            event.key === 'e' ||
            event.key === '-' ||
            event.key === '+'){
                event.preventDefault() 
            }
    }
    ViewInput = () => {
        const { id, readOnly, result, classNameForLocked, value} = this.props;
        if (!readOnly) {

            if (value) {
                return <Input 
                            type="number" 
                            value={value} 
                            onKeyDown= {this.clearPlusAndMinus} 
                            onInput={this.clickChange} 
                            onWheel = {this.scrollOff} 
                            name={id} 
                            autoСomplete="off" 
                            min="0" 
                            placeholder={this.props.placeholder}
                        ></Input>
            }
            else {
                return <Input 
                            type="number"  
                            onKeyDown= {this.clearPlusAndMinus} 
                            onInput={this.clickChange} 
                            onWheel = {this.scrollOff} 
                            name={id} 
                            autoСomplete="off" 
                            min="0" 
                            placeholder={this.props.placeholder}
                        ></Input>
            }

        } else {
            return  <Input 
                        readOnly={readOnly} 
                        className={classNameForLocked} 
                        value = {result} 
                        type="text" 
                        name={id} 
                        autoСomplete="off" 
                        placeholder={this.props.placeholder}
                    ></Input>

        }
    }
render(){

    const {name, className} = this.props;
    return (
    <DivInput className={className}>
        <SpanText>{name}</SpanText>
        <this.ViewInput></this.ViewInput>
       
        
    </DivInput>)
}}
