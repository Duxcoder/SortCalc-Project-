import React, { Component } from "react";
import { ReactComponent as YourSvg } from './square.svg';
import BlockInput from "../../input/BlockInput";
import styles from './style.module.css';
import Database from "../../database";
import GostBlock from "../../gostBlock/gostBlock";
export default class Square extends Component {
    constructor(props){
        super(props);
        this.state = {
            gostBlockView: false,
            gostOn: false,
            weightOn: true,
            names: {length: 'Длина, мм',
                    height: 'Высота, мм',
                    weight: 'Вес, кг'
            },
            values: {length: 0,
                     height: 0,
                     weight: 0
            },
            clickOnGost: false
        }
    }
    componentDidUpdate(prevProps){
        const {weightOn} = this.props
        if (weightOn !== prevProps.weightOn){
            this.setState({weightOn: weightOn}); // Переключатель вес/длина сохраняется при переключении страниц
            this.choiceCalculator('square', 'Сталь')
        }
        if (prevProps.material !== this.props.material){
            this.choiceCalculator('square', 'Сталь')

        }
    }

    choiceCalculator(databasePage) {
        const checkedItemGost = this.findGostValues(databasePage) 
        this.setState({gostBlockView: false})
        if (checkedItemGost) {this.returnGostValue(checkedItemGost)}
        else {
            this.calcSquare();
        }
    }

    findGostValues = (page) => {
        const {height} = this.state.values;
        let arr = [];
        for (let key in Database.gosts[page]){
            Database.gosts[page][key].map(item => {
                if (item.height === height) {
                    const nameGost = Database.gosts.namesGosts[key]
                    arr.push(item, nameGost)
                } 
            })
        }
        return arr == "" ? false : arr   
    }

    returnGostValue = ([value, gostName]) => {
        this.setGostValue(value, () => {this.calcSquareGost(value.R, value.r)});
        this.pushGostName(value, gostName);
    }

    setGostValue = (valuesGostObj, fn) => {
        this.setState({ values:{
            ...this.state.values, 
            height: valuesGostObj.height}
        }, () => {fn()})
    }

    pushGostName = (value, gostName) => {
        let name = gostName.length > 25 ? gostName.slice(-0, 25) + '...': gostName
        this.setState({gostOn:true}, () => {this.props.gostOn(true, value.name + ' ' + name)})
    }
   
    calcSquare = () => {
        const {gostOn, weightOn, returnVolume} = this.props
        const {values: {width, length, height, weight}} = this.state
        this.setState({gostOn:false}, () => {gostOn(false, '')}) //отключение ГОСТ, расчёт по формуле

        if (weightOn) {
            returnVolume( length * (height ** 2) * 10e-10);
        } else {
            returnVolume( weight/((height ** 2) * 10e-10)); // m/s
        }
      }

    calcSquareGost= () => {
        const {weightOn, returnVolume} = this.props
        const {values: {length, height, weight}} = this.state
        if (weightOn) {
            returnVolume( length * (height ** 2) * 10e-10);}
        else {
            returnVolume( weight/((height ** 2) * 10e-10)); // m/s

        }
    }

    getValue = (id) => {
        this.setState({values: { ...this.state.values, ...id}}, () => {
        this.choiceCalculator('square', 'Сталь');
        this.visibleBtn()
        });
     }

    visibleBtn = () => {
        let sum = 0;
        for (let key in this.state.values){
         sum += this.state.values[key]
        }
        (sum > 0) ? this.props.activeReloadBtn(true) : this.props.activeReloadBtn(false)
     }

    clickOnGost = () => {
    }
  
    componentWillUnmount = () => {
        this.props.returnVolume(0);
        this.props.activeReloadBtn(false);
        this.props.gostOn(false, '');

    }

    RenderInput = (props) => {
        const {values, names} = this.state
        const isWeightOn = props.weightOn;
        if (isWeightOn) {
          return  <BlockInput 
                    id ={'length'} 
                    value = {values.length} 
                    name={names.length} 
                    className={styles.inputLength} 
                    valueNum={this.getValue} 
                    placeholder={'0 мм'}></BlockInput>
        } else {
          return  <>
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
                    placeholder={'0 кг'}></BlockInput> 
                    </>
        }
    }

render(){
    const {names:{height}, values} = this.state;
    let gostBlockRender;
    if (this.state.gostBlockView) {
        gostBlockRender =  <GostBlock clickOnGost={this.clickOnGost} returnGostValue={this.returnGostValue}></GostBlock>
    }
    return (
    <>
        {gostBlockRender}
        <div className="d-flex justify-content-center align-items-center" >
            <this.RenderInput weightOn={this.props.weightOn}></this.RenderInput>
            <BlockInput 
                id ={'height'} 
                value = {values.height} 
                name={height} 
                className={styles.inputHeight} 
                valueNum={this.getValue} 
                placeholder={'0 мм'}></BlockInput>
            <YourSvg className={styles.svg}></YourSvg>
        </div>
    </>
    )
}  
}


