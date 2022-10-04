import React, { Component } from "react";
import styled from "styled-components";
import Select from '../../components/select/select';
import ButtonCalc from '../button/button';

const DivBottomBlock = styled.div`
margin-top:20px;
width:100%;
height:auto;
`
const DivSelectBlock = styled.div`

`
const DivButtonBlock = styled.div`
margin: 0 10px;

`
export default class CalcBottomBlock extends Component {

constructor(props){
    super(props);
    this.state = {
        value: ''
    }
}

giveMeProps = (arr, option) => {
    const newArr = []
    arr.map((item, i) => {
        return newArr[i] = item[option]
    })
    return newArr
    }

selectGrades = () => {

}

choiceMaterial = () => {
    let arr = []
    for (let key in this.props.data) {
       this.props.data[key].map (item => {
       arr.push(item.material); 
       })
    }
    let newArray = arr.filter(function(item, pos) {
        return arr.indexOf(item) === pos;
    })
return newArray
}

iCheckIt = (item) => {
    this.setState({value : item});
    console.log(this.state)
}

render(){
    return (<>
        <DivBottomBlock className="d-flex justify-content-center" >
            <DivSelectBlock className="d-flex align-items-end flex-column">
              <Select label='Материал' dataValues={this.choiceMaterial()} whatYouCheck={this.iCheckIt}></Select>
              <Select label='Марка' dataValues={this.giveMeProps(this.props.data.steels, 'name')} whatYouCheck={this.iCheckIt}></Select>
            </DivSelectBlock>
            <DivButtonBlock className='d-flex align-items-center justify-content-start'>
              <ButtonCalc></ButtonCalc>
            </DivButtonBlock>
          </DivBottomBlock>
          </>
          )
    
}

}

 