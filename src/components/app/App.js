import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import ButtonsList from '../buttonsList/buttonsList';
import Corner from '../pages/corner/corner';
import Sheet from '../pages/sheet/sheet';
import CalcBottomBlock from '../calcBottomBlock/calcBottomBlock';
import {ReactComponent as DesignElement} from './img/designElement.svg'
import Database from '../database';

const Line = styled.div`
display: block;
min-width: 100px;
max-width: 500px;
height: 1px;
width:100%;
margin: 0 50px;
background-color:black;
`
const Logo = styled.div`
width:auto;
font-family: 'Michroma';
font-style: normal;
font-weight: 400;
font-size: 28px;
line-height: 28px;
color: #000000;`

const HeaderTitleBlock = styled.div`
width: 100%;
height: auto;
display:block;
margin: 0px 0px 20px 0px;
padding: 18px 20px;
background-color: #224952;
border-radius: 4px;

`
const DivButtons = styled.div`

`
const Footer = styled.div`
display:block;
width:100%;
height:auto;
padding: 4px;
background-color: #241414;
text-align: center;
`
export default class App extends Component {
constructor(props){
  super(props)
  this.state = {
    btnReload: false,
    weightOn: true,
    number: 0,
    data: {},
    res: 0,
    density: 0,
    volume: 0,
    
  }
}

btnList(){
  const btnLists = ['УГОЛОК', 'ЛИСТ', 'ТРУБА', 'КРУГ', 'ШВЕЛЛЕР', 'БАЛКА/ДВУТАВР', 'КВАДРАТ', 'ТРУБА ПРОФИЛЬНАЯ']
  return btnLists
}
numberBtnActive =(id) => {
return this.setState({number: +id})
}
returnDensity = (returnValue) => {
  this.setState({density: returnValue})
}
returnVolume = (returnVolume) => {
  this.setState({volume: returnVolume})
}
isInfinity (item){ // вывод 0 вместо infinity и минусовых значений
  if (!isFinite(item) || item < 0) {
    return item = 0
  } else {
    return item
  }
}
postResult = (den, resInPage, weightUoM, resUoM, weightToFix, resToFix) => {
  let res;
  console.log(resInPage)
  if (this.state.weightOn) {
    res = (this.isInfinity(den * resInPage)).toFixed(weightToFix)
    return res > 10e+6 ? `более 10 тыс т.` : `${res} ${weightUoM}`
  } else {
    res = `${this.isInfinity((resInPage / den)).toFixed(resToFix)}`
    return res > 10e+5 ? `более 1000 км` : `${res} ${resUoM}`
  }
  
}
clearInputs = (boolean) => {
  if (boolean) {
    const numberNow = this.state.number
    this.setState({number: 100}, () => {this.setState({number: numberNow})})
    this.setState({weightOn: true})
  }
}
activeReloadBtn = (boolean) => {
  this.setState({btnReload: boolean})
}
ViewContent = () => {
  const {number, volume, density } = this.state;
   switch (number){
    case 0 : 
      return (
      <>
      <Corner weightOn = {this.state.weightOn} 
              returnVolume = {this.returnVolume} 
              activeReloadBtn = {this.activeReloadBtn}
              result = {this.postResult(density, volume, 'кг', 'м', 2, 2)}
              >
      </Corner>
      <CalcBottomBlock 
        activeReloadBtn = {this.state.btnReload}
        clearInputs = {this.clearInputs}
        data = {Database.grades} 
        returnDensity = {this.returnDensity} 
        defaultGraid = {Database.grades.steels[0]} 
        result = {this.postResult(density, volume, 'кг', 'м', 2, 2)}
        labelForResult = {this.state.weightOn ? 'Вес: ' : 'Длина: '}
        weightOn = {this.weightOn}
        >
        </CalcBottomBlock>
      </>
      )
    case 1 : 
      return (
        <>
        <Sheet weightOn = {this.state.weightOn} returnVolume={this.returnVolume} activeReloadBtn={this.activeReloadBtn}></Sheet>
        <CalcBottomBlock 
        activeReloadBtn = {this.state.btnReload}
        clearInputs = {this.clearInputs}
        data ={Database.grades} 
        returnDensity={this.returnDensity} 
        defaultGraid = {Database.grades.steels[0]} 
        result = {this.postResult(density, volume, 'кг', 'мм', 2, 0)}
        labelForResult = {this.state.weightOn ? 'Вес: ' : 'Длина: '}
        weightOn = {this.weightOn}
        >
        </CalcBottomBlock>
        </>
      )
      
    case 2:
      return <p>This is 2</p>

    case 3 : 
      return <p>This is 3</p>

    case 4 : 
      return <p>This is 4</p>
    
    case 5:
      return <p>This is 5</p>
      
    case 6 : 
      return <p>This is 6</p>
    
    case 7 :
      return <p>This is 7</p>
    
    case 100 :
      return console.log('Reload')
    
    default: 
      return console.log('Error loaded page')
  }
}
weightOn = (value) => {
  this.setState({weightOn: value})
}
  render(){
    return (
      <>
      
        <div className='d-flex align-items-center flex-column length container-fluid'>
          <Row className="head container-fluid ">
            <Col lg={12} className="d-flex justify-content-center align-items-center">
              <Line/><Logo>SORT/CALC</Logo><Line/>
              <span className='title'>КАЛЬКУЛЯТОР МЕТАЛЛОПРОКАТА</span>
           </Col>
          </Row>
          <Row className="container-fluid ">
      <DesignElement className='designElement'  />
      <h1 className='header'>КОНСТРУКТОР МЕТАЛЛОПРОКАТА</h1>

</Row>
         <Container>
          <Row className="justify-content-md-center">
            <Col xl={{ span: 3 }} className='d-flex align-items-start flex-column'>
                <ButtonsList numb = {this.numberBtnActive} valueBtns={this.btnList()}></ButtonsList>
            </Col> 
            <Col xl={{ span: 8 }} className="main position-relative">
              <HeaderTitleBlock>
                <span className='pageName'>ТИП ПРОКАТА: {this.btnList()[this.state.number]}</span>
              </HeaderTitleBlock> 
              <this.ViewContent></this.ViewContent>
            </Col>
          </Row>
          </Container>
        </div>
        <div className='mt-auto w-100 container-fluid'>
            <Footer><span className='footerText'>ⓒ 2022 Developed with React by <a target="_blank" href='https://github.com/Duxcoder'>Duxcoder</a></span></Footer>
          </div>

       
      
      </>
    );
  }
 
}


