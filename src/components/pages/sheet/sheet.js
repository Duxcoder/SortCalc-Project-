import React, { Component } from "react";
import { ReactComponent as YourSvg } from './sheet.svg';
import BlockInput from "../../input/BlockInput";
import styles from './style.module.css';

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
      this.setState({values: {...this.state.values, weight: this.state.values.length, length: this.state.values.weight}}, () => {this.calcSquare()});
      this.calcSquare()}

    }
    componentWillUnmount = () => {
        this.props.returnVolume(0);
        this.props.activeReloadBtn(false)

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
      visibleBtn = () => {
        let sum = 0;
        for (let key in this.state.values){
         sum += this.state.values[key]
        }
        (sum > 0) ? this.props.activeReloadBtn(true) : this.props.activeReloadBtn(false)
     }
    getValue = (id) => {
       this.setState({values: { ...this.state.values, ...id}}, () => {this.calcSquare(); this.visibleBtn()})
       
       
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
            <this.RenderInput weightOn={this.props.weightOn}></this.RenderInput>
            <BlockInput id ={'thickness'} name={thickness} className={styles.inputThickness} valueNum={this.getValue} placeholder={'0 мм'}></BlockInput>
            <BlockInput id ={'width'} name={width} className={styles.inputWidth} valueNum={this.getValue} placeholder={'0 мм'}></BlockInput>
            <YourSvg className={styles.svg}></YourSvg>
        </div>
    </>
    )
}  
}


