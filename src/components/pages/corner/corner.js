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
                    weight: 0,
                    r: 0,
                    R: 0
            },
            clickOnGost: false
        }
    }

    componentDidUpdate = (prevProps) => {
        const {gostOn} = this.state
        const {weightOn, material} = this.props
        if (weightOn !== prevProps.weightOn){
            this.setState({weightOn: weightOn}); // Переключатель вес/длина сохраняется при переключении страниц
            // gostOn ? this.findGostValues('corner') : this.calcSquare();
        }
       if (prevProps.material !== this.props.material){
        this.choiceCalculator()
        }
    }
    componentWillUnmount = () => {
        this.props.returnVolume(0);
        this.props.activeReloadBtn(false);
        this.props.gostOn(false, '');
    }
    

      visibleBtn = () => {
        let sum = 0;
        for (let key in this.state.values){
         sum += this.state.values[key]
        }
        (sum > 0) ? this.props.activeReloadBtn(true) : this.props.activeReloadBtn(false)
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
        
    getValue = (id) => {
        this.setState({values: { ...this.state.values, ...id}}, () => {
         this.choiceCalculator();
         this.visibleBtn()
        });
     }

    pushGostName = (value, gostName) => {
        let name = gostName.length > 25 ? gostName.slice(-0, 25) + '...': gostName
        this.setState({gostOn:true}, () => {this.props.gostOn(true, value.name + ' ' + name)})
    }
    returnGostValue = ([value, gostName]) => {
        this.setGostValue(value);
        this.pushGostName(value, gostName);
        this.calcSquareGost(value.R, value.r);      
    }
   

    findGostValues = (page) => {
        const {height, width, thickness} = this.state.values;
        let arr = false;
        for (let key in Database.gosts[page]){
            Database.gosts[page][key].map(item => {
                console.log(this.state.values, this.state)
                if (item.height === height && item.width === width && item.thickness === thickness) {
                    const nameGost = Database.gosts.namesGosts[key]
                   arr = [item, nameGost]
                } 
            })
        }
        return arr
    }
    setGostValue = (valuesGostObj) => {
        this.setState({
            values: {...this.state.values, 
                    height: valuesGostObj.height, 
                    width: valuesGostObj.width, 
                    thickness: valuesGostObj.thickness,
                    weightGost: valuesGostObj.weight,
                    R: valuesGostObj.R,
                    r: valuesGostObj.r}
        })
    }
    calcSquare = (coefficient) => {
        const {gostOn, weightOn, returnVolume} = this.props
        const {values: {width, length, thickness, height, weight}} = this.state

        this.setState({gostOn:false}, () => {gostOn(false, '')}) //отключение ГОСТ, расчёт по формуле
        if (weightOn) {
            returnVolume((((thickness*width) + ((height-thickness)*thickness)) * (coefficient/1000000)) * length); // расчёт объема (для веса)
        } else {
            returnVolume(weight/(((thickness*width) + ((height-thickness)*thickness)) * (coefficient/1000000))); // расчёт значения для длины
        }
      }

      calcSquareGost= (R, r) => {
        const {weightOn, returnVolume} = this.props
        const {values: {width, length, thickness, height, weight}} = this.state
        if (weightOn) {
            console.log(this.state.values)
            returnVolume(((thickness * (width + height - thickness)) + (0.2146 * (R ** 2 - 2 * r ** 2))) * length / 1000000)}
        else {
            returnVolume(weight/((thickness * (width + height - thickness) + 0.2146 * (R**2 - 2*r**2)) * length / 1000000))
        }
      }
      

    //   calcSquareSimple = (weightGost) => {
    //     const {length, weight} = this.state.values;
    //     const {weightOn, returnVolume} = this.props

    //     if (weightOn) {
    //         returnVolume(weightGost * length);
    //     } else {
    //         returnVolume(weight / weightGost);
    //     }
    //   }
    choiceCalculator() {
        if (this.props.material === 'Сталь') {
        const checkedItemGost = this.findGostValues('corner') 
          if (checkedItemGost) {
                this.returnGostValue(checkedItemGost);}
          else {
            this.calcSquare(1.01);
            }
        }
        else {
            this.calcSquare(1)
        }
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
