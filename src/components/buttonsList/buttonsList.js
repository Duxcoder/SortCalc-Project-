import React, { Component } from "react";

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
        this.setState({numActiveBtn: event.target.id});

        const cUpdate =() => {
            const arr = document.querySelectorAll('button');
            arr.forEach(item => {
                item.classList.remove('button-active')
            })
        }
        cUpdate()
        this.props.numb(event.target.id);
        this.activeBtn(event.target)
    }

renderBtns = () => {
    let newArrBtns = this.props.valueBtns.map((item, i) => {
    return <button onClick={this.clickOnButton} className='button' key={i} id={i}>{item}</button>
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