import React, { Component } from "react";
import styles from './gostBlock.module.css';
import {ReactComponent as ElemUp} from './elemUp.svg'
import {ReactComponent as ElemDown} from './elemDown.svg'
import Select from "../select/select";
import Database from "../database";

export default class GostBlock extends Component {

constructor(props){
    super(props);
    this.state = {
        clickOnGost: false,
        checked: ''
    }
}

clickOnGost = () => {
    this.state.clickOnGost ? 
        this.setState({clickOnGost: false}, () => {this.props.clickOnGost(false)}) : 
        this.setState({clickOnGost: true}, () => {this.props.clickOnGost(true)})
    
}
transformToArr = (object) => {
    let arr = []
        for (let key in object){
            arr.push(object[key])
        }
    return arr
}
giveArrDependingChoice = (checked, object, objectValues) => {
    let res;
    const createArr = (dataArr) => {
        let arr = []
        dataArr.map(item => {
            arr.push(item.name)
        })
        return arr
    }
    for (let prop in object){
        console.log(checked === object[prop])
        if (checked === object[prop]){
            return res = createArr(objectValues[prop])
        } else {
            res = ['0']
        }}
    return res
}
componentDidMount(){
    this.setState({checked: Database.gosts.namesGosts.gost8509})
}
iCheckIt = (value) => {
    this.setState({checked: value}, () => {console.log(this.state)})
}
render(){
    return (
        <div className={styles.divGostBlock}>
        <div className={styles.btnBlock}>
            <ElemUp className={styles.elemUp}></ElemUp>
            <div className={styles.btnGost} onClick={this.clickOnGost}>выбор из ГОСТ</div>
            <ElemDown className={styles.elemDown}></ElemDown>
        </div>
        <div className={this.state.clickOnGost ? styles.bgElemActive : styles.bgElem}>
            <div className={`${this.state.clickOnGost ? styles.visibleFlex : styles.hidden} flex-column align-items-center align-content-center `}> 
                <Select 
                    label='Документ' 
                    width='230px'
                    defaultSelected={Database.gosts.namesGosts.gost8509} 
                    whatYouCheck={this.iCheckIt}
                    dataValues={this.transformToArr(Database.gosts.namesGosts)}
                ></Select>
                <Select 
                    size='10' 
                    height='200px' 
                    width='230px'
                    dataValues={this.giveArrDependingChoice(this.state.checked, Database.gosts.namesGosts, Database.gosts.corner)}
                ></Select>
                
            </div>
            
       
        
        </div>
     </div>

    )
}

}