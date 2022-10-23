import React, { Component } from "react";
import { ReactComponent as YourSvg } from './corner.svg';
import styles from './corner.module.css';
import BlockInput from "../../input/BlockInput";
import { Container } from "react-bootstrap";
import Select from "../../select/select";
import Database from "../../database";
import GostBlock from "../../gostBlock/gostBlock";
export default class Corner extends Component {
    constructor(props){
        super(props);
        this.state = {
            gostOn: false,
            weightOn: true,
            names: { width: 'Ширина, мм',
                    length: 'Длина, м',
                    thickness: 'Толщина, мм',
                    height: 'Высота, мм',
                    weight: 'Вес, кг'
            },
            values: {
                    width: 0,
                    length: 0,
                    thickness: 0,
                    height: 0,
                    weight: 0
            },
            clickOnGost: false
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.weightOn !== prevProps.weightOn){
      this.setState({weightOn: this.props.weightOn}, () => {console.log(this.state)});
      this.setState({values: {...this.state.values, weight: this.state.values.weight, length: this.state.values.length}}, () => {this.calcSquare()});
      this.calcSquare()}

    }
    componentWillUnmount = () => {
        this.props.returnVolume(0);
        this.props.activeReloadBtn(false)
    }
    calcSquare = () => {
        this.setState({gostOn:false}, () => {this.props.gostOn(false, '')})
        const {width, length, thickness, height, weight} = this.state.values;
        let res;
        if (this.props.weightOn) {
            res = (((thickness*width) + ((height-thickness)*thickness)) * (1/1000000) * 1.01 ) * length;
        } else {
            res = weight/(((thickness*width) + ((height-thickness)*thickness)) * (1/1000000) * 1.01);
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
       this.setState({values: { ...this.state.values, ...id}}, () => {this.calcSquare(); this.findGostValues(); this.visibleBtn()});
    }
    findGostValues = () => {
        const {height, width, thickness} = this.state.values;
       
        for (let key in Database.gosts.corner){
            Database.gosts.corner[key].map(item => {
                if (item.height == height && item.width == width && item.thickness == thickness) {
                    const nameGost = Database.gosts.namesGosts[key]
                    let name = nameGost.length > 25 ? nameGost.slice(-0, 25) + '...': nameGost
                    this.setState({gostOn:true}, () => {this.props.gostOn(true, item.name + ' ' + name)})
                    this.setState({
                        values: {...this.state.values, 
                                height: item.height, 
                                width: item.width, 
                                thickness: item.thickness,
                                weightGost:item.weight}
                    }, () => {
                         this.calcSquareGost(item.weight)
                    })  
                } 
            })
        }
    }
    RenderInput = (props) => {
        const isWeightOn = props.weightOn;
        if (isWeightOn) {
          return  <BlockInput id ={'length'} value = {this.state.values.length} name={this.state.names.length} className={styles.inputLength} valueNum={this.getValue} placeholder={'0 м'}></BlockInput>
        } else {

          return ( <>
          <BlockInput readOnly classNameForLocked={styles.inputLock} id ={'length'} name={this.state.names.length} className={styles.inputLength} result={this.props.result} placeholder={''}></BlockInput> 
          <BlockInput value = {this.state.values.weight} id ={'weight'} name={this.state.names.weight} className={styles.inputWeight} valueNum={this.getValue} placeholder={'0 кг'}></BlockInput> 
          </>
          )
        }
    }

    clickOnGost = () => {
       console.log('clickOnGost Work')
    }
    returnGostValue = (value, gostName) => {
        let name = gostName.length > 25 ? gostName.slice(-0, 25) + '...': gostName
        this.setState({gostOn:true}, () => {this.props.gostOn(true, value.name + ' ' + name)})
        console.log(value)
        this.setState({
            values: {...this.state.values, 
                    height: value.height, 
                    width: value.width, 
                    thickness: value.thickness,
                    weightGost:value.weight}
        }, () => {
            this.calcSquareGost(value.weight)
        })
        console.log(gostName)
    }
    
    calcSquareGost = (weightGost) => {
        const {width, length, thickness, height, weight} = this.state.values;
        let res;
        if (this.props.weightOn) {
            res = weightGost * length;
        } else {
            res = weight/weightGost;
            if (isNaN(res)) {res = 0 } 
        }
        this.props.returnVolume(res);
      }

render(){
    const {width, thickness, height} = this.state.names;
    return (
    <>
    
    <GostBlock clickOnGost={this.clickOnGost} returnGostValue={this.returnGostValue}></GostBlock>
        <div className="d-flex justify-content-center align-items-center transition" >
           
            <this.RenderInput weightOn={this.props.weightOn}></this.RenderInput>
            <BlockInput id ={'width'} value = {this.state.values.width} name={width} className={styles.inputWidth} valueNum={this.getValue} placeholder={'0 мм'}></BlockInput>
            <BlockInput id ={'thickness'} value = {this.state.values.thickness} name={thickness} className={styles.inputThickness} valueNum={this.getValue} placeholder={'0 мм'}></BlockInput>
            <BlockInput id ={'height'} value = {this.state.values.height} name={height} className={styles.inputHeight} valueNum={this.getValue} placeholder={'0 мм'}></BlockInput>
            <YourSvg className={styles.svg}></YourSvg>
        </div>
    </>
    )
}  
}

