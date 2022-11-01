import React, { Component } from "react";
import { ReactComponent as YourSvg } from './channel.svg';
import styles from './style.module.css';
import BlockInput from "../../input/BlockInput";
import Database from "../../database";
import GostBlock from "../../gostBlock/gostBlock";
export default class Corner extends Component {
    constructor(props){
        super(props);
        this.state = {
            gostBlockView: true,
            gostOn: false,
            weightOn: true,
            names: {height: 'Высота, мм',
                    widthTop: 'Ширина А, мм',
                    widthBottom: 'Ширина B, мм',
                    length: 'Длина, м',
                    thicknessWall: 'Толщина стенки, мм',
                    thicknessShelf: 'Толщина полки, мм',
                    weight: 'Вес, кг'
            },
            values: {
                    widthTop: 0,
                    widthBottom: 0,
                    length: 0,
                    thicknessWall: 0,
                    thicknessShelf: 0,
                    height: 0,
                    weight: 0,
                    r: 0,
                    R: 0
            },
            clickOnGost: false
        }
    }

    componentDidUpdate = (prevProps) => {
        const {weightOn} = this.props
        if (weightOn !== prevProps.weightOn){
            this.setState({weightOn: weightOn}); // Переключатель вес/длина сохраняется при переключении страниц
            this.choiceCalculator('channel', 'Сталь')
        }
        if (prevProps.material !== this.props.material){
            this.choiceCalculator('channel', 'Сталь')

        }
    }
    
    choiceCalculator(databasePage, checkedMaterial) {
        const checkedItemGost = this.findGostValues(databasePage) 
        this.setState({gostBlockView: true})
        if (this.props.material === checkedMaterial) {
          if (checkedItemGost) {this.returnGostValue(checkedItemGost)}
          else {
            this.calcSquare(1.01);
            }
        }
        else {
            this.setState({gostBlockView: false})
            this.calcSquare(1);
        }
    }

    findGostValues = (page) => {
        const {height, widthTop, widthBottom, thicknessWall, thicknessShelf} = this.state.values;
        let arr = [];
        for (let key in Database.gosts[page]){
            Database.gosts[page][key].map(item => {
                if (item.height === height && 
                    item.widthTop === widthTop && 
                    item.widthBottom === widthBottom && 
                    item.thicknessWall === thicknessWall &&
                    item.thicknessShelf === thicknessShelf
                    ) {
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
            height: valuesGostObj.height, 
            widthTop: valuesGostObj.widthTop,
            widthBottom: valuesGostObj.widthBottom, 
            thicknessWall: valuesGostObj.thicknessWall,
            thicknessShelf: valuesGostObj.thicknessShelf,
            R: valuesGostObj.R,
            r: valuesGostObj.r}
        }, () => {fn()})
    }

    pushGostName = (value, gostName) => {
        let name = gostName.length > 25 ? gostName.slice(-0, 25) + '...': gostName
        this.setState({gostOn:true}, () => {this.props.gostOn(true, value.name + ' ' + name)})
    }
   
    calcSquare = (coefficient) => {
        const {gostOn, weightOn, returnVolume} = this.props
        const {values: {widthTop, widthBottom, length, thicknessWall, thicknessShelf, height, weight}} = this.state
        this.setState({gostOn:false}, () => {gostOn(false, '')}) //отключение ГОСТ, расчёт по формуле
        if (weightOn) {
            returnVolume(((coefficient * (thicknessShelf * (widthBottom + widthTop - (2 * thicknessWall))) + (thicknessWall * height)) / 1000000) * length)// расчёт объема (для веса)
        } else {
            returnVolume(weight/((coefficient + (thicknessWall * (widthBottom + widthTop - (2 * thicknessShelf)) + (thicknessShelf * height))) / 1000000)); // расчёт значения для длины
        }
    }

    calcSquareGost= (R, r) => {
        const {weightOn, returnVolume} = this.props
        const {values: {widthTop, widthBottom, length, thicknessWall, thicknessShelf, height, weight}} = this.state
        if (weightOn) {
            returnVolume((((0.429 * ((R ** 2) - (r ** 2))) + (thicknessShelf * (widthBottom + widthTop - (2 * thicknessWall))) + (thicknessWall * height)) / 1000000) * length)}
        else {
            returnVolume(weight/(((0.429 * ((R ** 2) - (r ** 2))) + (thicknessShelf * (widthBottom + widthTop - (2 * thicknessWall))) + (thicknessWall * height)) / 1000000))
        }
    }

    getValue = (id) => {
        this.setState({values: { ...this.state.values, ...id}}, () => {
         this.choiceCalculator('channel', 'Сталь');
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

render(){
    const {names:{widthTop, widthBottom, thicknessShelf, thicknessWall, height}, values} = this.state;
    let gostBlockRender;
    if (this.state.gostBlockView) {
        gostBlockRender =  <GostBlock page="channel" 
                                      gostNames = {['gost8240']}
                                      checked = {Database.gosts.namesGosts.gost8240} 
                                      clickOnGost={this.clickOnGost} 
                                      returnGostValue={this.returnGostValue}></GostBlock>
    }
    return (
    <>
        {gostBlockRender}
        <div className="d-flex justify-content-center align-items-center transition" >
            <this.RenderInput weightOn={this.props.weightOn}></this.RenderInput>
            <BlockInput id ={'widthTop'} 
                        value = {values.widthTop} 
                        name={widthTop} 
                        className={styles.inputWidthTop} 
                        valueNum={this.getValue} 
                        placeholder={'0 мм'}
            ></BlockInput>
            <BlockInput id ={'widthBottom'} 
                        value = {values.widthBottom} 
                        name={widthBottom} 
                        className={styles.inputWidthBottom} 
                        valueNum={this.getValue} 
                        placeholder={'0 мм'}
            ></BlockInput>
            <BlockInput id ={'thicknessShelf'} 
                        value = {values.thicknessShelf} 
                        name={thicknessShelf} 
                        className={styles.inputThicknessShelf} 
                        valueNum={this.getValue} 
                        placeholder={'0 мм'}
            ></BlockInput>
            <BlockInput id ={'thicknessWall'} 
                        value = {values.thicknessWall} 
                        name={thicknessWall} 
                        className={styles.inputThicknessWall} 
                        valueNum={this.getValue} 
                        placeholder={'0 мм'}
            ></BlockInput>
            <BlockInput id ={'height'} 
                        value = {values.height} 
                        name={height} 
                        className={styles.inputHeight} 
                        valueNum={this.getValue} 
                        placeholder={'0 мм'}
            ></BlockInput>
            <YourSvg className={styles.svg}></YourSvg>
        </div>
    </>
    )
}  
}
