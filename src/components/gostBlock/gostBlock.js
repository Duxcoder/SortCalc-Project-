import React, { Component } from "react";
import styles from './gostBlock.module.css';
import Select from "../select/select";
import Database from "../database";
import {Files} from 'react-bootstrap-icons'


export default class GostBlock extends Component {

constructor(props){
    super(props);
    this.state = {
        clickOnGost: false,
        checked: '',
        checkModel:''
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
        if (checked === object[prop]){
            return res = createArr(objectValues[prop])
        } else {
            res = ['0']
        }}
    return res
}
componentDidMount(){
    this.setState({checked: Database.gosts.namesGosts.gost8509})
        document.addEventListener('mousedown', (e) => {
            console.log(e.target)
            this.closeWindowGost(e)
        });
      
}
iCheckIt = (value) => {
    this.setState({checked: value}, () => {console.log(this.state)})
}
iCheckModel = (value) => {
    this.setState({checkModel: value}, () => {
        for (let key in Database.gosts.namesGosts) {
            if (Database.gosts.namesGosts[key] === this.state.checked) { 
                    Database.gosts.corner[key].map( item =>{
                        item.name === value ? this.props.returnGostValue([item, Database.gosts.namesGosts[key]]) : console.log()
                    })
            }
        }
    })
}
closeWindowGost = (event) => {
    if (this.state.clickOnGost && (event.target.classList.contains(styles.close) 
    || event.target.parentElement.classList.contains(styles.close) )) {
        this.setState({clickOnGost: false})
    } else {
        console.log('ok')
    }
}

render(){
    return (<>
     
        <div className={styles.divGostBlock}>
            <div className={styles.btnGost} onClick={this.clickOnGost}>
                <Files className={styles.icon}></Files> 
                <span className={styles.textBtn} >СПРАВОЧНИК</span>
            </div>
            <div className={this.state.clickOnGost ? styles.bgElemActive : styles.bgElem} onClick={this.closeWindowGost}>
                <div className={`${this.state.clickOnGost ? styles.visibleFlex : styles.hidden} flex-column align-items-center align-content-center `}> 
                    <div className={styles.closeBlock}><span className={styles.close}>✖</span></div>
                    <span className={styles.documentName}>Документ:</span> 
                    <Select
                        width='230px'
                        defaultSelected={Database.gosts.namesGosts.gost8509} 
                        whatYouCheck={this.iCheckIt}
                        dataValues={this.transformToArr(Database.gosts.namesGosts)}
                    ></Select>
                    <Select 
                        whatYouCheck={this.iCheckModel}
                        size='10' 
                        height='200px' 
                        width='230px'
                        dataValues={this.giveArrDependingChoice(this.state.checked, Database.gosts.namesGosts, Database.gosts.corner)}
                    ></Select>
                    
                </div>
            </div>
     </div>
  

     </>
    )
}

}