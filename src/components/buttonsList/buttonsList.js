import React, { Component } from "react";
import styled from "styled-components";

const Icon = styled.span`
width: 26px;
height: 26px;
margin-right: 10px;
`
export default class ButtonsList extends Component{
constructor(props){
    super(props);
    this.state = {
        numActiveBtn: 0,
    }
    this.clickOnButton = this.clickOnButton.bind(this);
    this.firstBtnRun = this.firstBtnRun.bind(this)
}
firstBtnRun(id){
    this.setState({numActiveBtn: id})
    const arr = document.querySelectorAll('button');
    this.activeBtn(arr[id])
    this.props.numb(id);
}
activeBtn(btn){
    btn.classList.add('button-active')
}

componentDidMount = () => {
this.firstBtnRun(this.state.numActiveBtn)
}

clickOnButton(event){
        const arr = document.querySelectorAll('button');
        const removeActiveBtns = (clazz) => {
            arr.forEach(item => {
                item.classList.remove(clazz)
            })
        }
        arr.forEach(item => {
            const target = event.currentTarget
            if (item === target){
                this.setState({numActiveBtn: target.id});
                removeActiveBtns('button-active')
                this.activeBtn(target)
                this.props.numb(target.id);
            }
        })
    }

renderBtns = () => {
    let newArrBtns = this.props.valueBtns.map((item, i) => {
    return <button onClick={this.clickOnButton} className='button' key={i} id={i}>{item.name}<Icon>{item.icon}</Icon></button>
    })
    
    // this.setState({arrBtns: newArrBtns})
    return newArrBtns
}


render(){
    return(
        <>
      <this.renderBtns></this.renderBtns>
        </>)
}


}