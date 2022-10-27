import React, { Component } from "react";
import { ReactComponent as YourSvg } from './corner.svg';
import styles from './corner.module.css';
import BlockInput from "../../input/BlockInput";
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
        const {gostOn} = this.state
        const {weightOn} = this.props
        if (weightOn !== prevProps.weightOn){
            this.setState({weightOn: weightOn}); // Переключатель вес/длина сохраняется при переключении страниц
            gostOn ? this.findGostValues() : this.calcSquare();
        }
    }
    componentWillUnmount = () => {
        this.props.returnVolume(0);
        this.props.activeReloadBtn(false);
        this.props.gostOn(false, '');
    }
    calcSquare = () => {
        const {gostOn, weightOn, returnVolume} = this.props
        const {values: {width, length, thickness, height, weight}} = this.state

        this.setState({gostOn:false}, () => {gostOn(false, '')}) //отключение ГОСТ, расчёт по формуле
        if (weightOn) {
            returnVolume((((thickness*width) + ((height-thickness)*thickness)) * (1.01/1000000)) * length); // расчёт объема (для веса)
        } else {
            returnVolume(weight/(((thickness*width) + ((height-thickness)*thickness)) * (1.01/1000000))); // расчёт значения для длины
        }
      }
      calcSquareGost = (weightGost) => {
        const {length, weight} = this.state.values;
        const {weightOn, returnVolume} = this.props

        if (weightOn) {
            returnVolume(weightGost * length);
        } else {
            returnVolume(weight / weightGost);
        }
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
                    let name = nameGost.length > 25 ? nameGost.slice(-0, 25) + '...' : nameGost
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
        const {values, names} = this.state
        const isWeightOn = props.weightOn;
        if (isWeightOn) {
          return  (
          <BlockInput 
            id ={'length'} 
            value = {values.length} 
            name={names.length} 
            className={styles.inputLength} 
            valueNum={this.getValue} 
            placeholder={'0 м'}
          ></BlockInput>
          )
        } else {
          return ( <>
          <BlockInput 
            readOnly 
            classNameForLocked={styles.inputLock} 
            id ={'length'} 
            name={names.length} 
            className={styles.inputLength} 
            result={this.props.result} 
            placeholder={''}
          ></BlockInput> 
          <BlockInput 
            value = {values.weight} 
            id ={'weight'} 
            name={names.weight} 
            className={styles.inputWeight} 
            valueNum={this.getValue} 
            placeholder={'0 кг'}
          ></BlockInput> 
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
        this.setState({
            values: {...this.state.values, 
                    height: value.height, 
                    width: value.width, 
                    thickness: value.thickness,
                    weightGost:value.weight}
        }, () => {
            this.calcSquareGost(value.weight)
        })
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
