import React, { Component } from "react";
import { ReactComponent as YourSvg } from './sheet.svg';
import styled from 'styled-components';
import styles from './style.module.css';
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

class BlockInput extends Component {
   
    clickChange = (event) => {
        const arr = {};
        arr[event.target.name] = +event.target.value;
        this.props.valueNum(arr)
    }


render(){
    const {name, id, className} = this.props;
    return (
    <DivInput className={className}>
        <SpanText>{name}</SpanText>
        <Input type="number" onInput={this.clickChange} name={id} min="0" autoСomplete="off" placeholder={this.props.placeholder}></Input>
    </DivInput>)
}}


export default class Sheet extends Component {
    constructor(props){
        super(props);
        this.state = {
            weightOn: true,
            names: { width: 'Ширина, мм',
                    length: 'Длина, мм',
                    thickness: 'Толщина, мм',
                    weight: 'Вес, кг'
            },
            values: {
                    width: 0,
                    length: 0,
                    thickness: 0,
                    weight: 0
            }
        }
    }
    componentDidUpdate(prevProps){
        if (this.props.weightOn !== prevProps.weightOn){
        
      this.setState({weightOn: this.props.weightOn}, () => {console.log(this.state)});
      this.setState({values: {...this.state.values, weight: this.state.values.length}}, () => {this.calcSquare()});
      this.calcSquare()}

    }

    calcSquare = () => {
        const {width, length, thickness, weight} = this.state.values;
        let res;
        if (this.props.weightOn) {
            res = width * length * thickness * 10e-10;
        } else {
            res = weight/(width * thickness * 10e-10); // m/s
            if (isNaN(res)) {res = 0 } 
        }
        this.props.returnVolume(res);
      }
    getValue = (id) => {
       this.setState({values: { ...this.state.values, ...id}}, () => {this.calcSquare()})
       
       
    }
    RenderInput = (props) => {
        const isWeightOn = props.weightOn;
        if (isWeightOn) {
          return  <BlockInput id ={'length'} name={this.state.names.length} className={styles.inputLength} valueNum={this.getValue} placeholder={'0 мм'}></BlockInput>
        } else {
          return  <BlockInput id ={'weight'} name={this.state.names.weight} className={styles.inputLength} valueNum={this.getValue} placeholder={'0 кг'}></BlockInput> 
        }

    }
render(){
    const {width, thickness} = this.state.names;
    return (
    <>
        <div className="d-flex justify-content-center align-items-center" >
            <this.RenderInput weightOn={this.state.weightOn}></this.RenderInput>
            <BlockInput id ={'thickness'} name={thickness} className={styles.inputThickness} valueNum={this.getValue} placeholder={'0 мм'}></BlockInput>
            <BlockInput id ={'width'} name={width} className={styles.inputWidth} valueNum={this.getValue} placeholder={'0 мм'}></BlockInput>
            <YourSvg className={styles.svg}></YourSvg>
        </div>
    </>
    )
}  
}


