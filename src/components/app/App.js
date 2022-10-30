import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import ButtonsList from '../buttonsList/buttonsList';
import Corner from '../pages/corner/corner';
import Sheet from '../pages/sheet/sheet';
import Pipe from '../pages/pipe/pipe'
import Circle from '../pages/circle/circle'
import CalcBottomBlock from '../calcBottomBlock/calcBottomBlock';
import {ReactComponent as DesignElement} from './img/designElement.svg'
import {IconCorner, IconSheet, IconPipe, IconCircle, IconChannel, IconBeam, IconSquare, IconProfilePipe} from '../icons/Icons';
import Database from '../database';
import {FileText} from 'react-bootstrap-icons'


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
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: auto;
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
    gostOn: false,
    btnReload: false,
    weightOn: true,
    number: 0,
    data: {},
    res: 0,
    density: 0,
    volume: 0,
  }
}

btnList = (defColorIcon = '#888', activeColorIcon = '#000') => {
  let btnsNavigation = [
    {name: 'УГОЛОК',id:0, icon: <IconCorner fill={this.state.number === 0 ? activeColorIcon : defColorIcon} width="100%" height="100%"></IconCorner>},
    {name: 'ЛИСТ', icon: <IconSheet stroke={this.state.number === 1 ? activeColorIcon : defColorIcon} width="100%" height="100%"></IconSheet>},
    {name: 'ТРУБА', icon: <IconPipe fill={this.state.number === 2 ? activeColorIcon : defColorIcon} width="100%" height="100%"></IconPipe>},
    {name: 'КРУГ', icon: <IconCircle stroke={this.state.number === 3 ? activeColorIcon : defColorIcon} width="100%" height="100%"></IconCircle>},
    {name: 'ШВЕЛЛЕР', icon: <IconChannel stroke={this.state.number === 4 ? activeColorIcon : defColorIcon} width="100%" height="100%"></IconChannel>},
    {name: 'БАЛКА/ДВУТАВР', icon: <IconBeam stroke={this.state.number === 5 ? activeColorIcon : defColorIcon} width="100%" height="100%"></IconBeam>},
    {name: 'КВАДРАТ', icon: <IconSquare stroke={this.state.number === 6 ? activeColorIcon : defColorIcon} width="100%" height="100%"></IconSquare>},
    {name: 'ТРУБА ПРОФИЛЬНАЯ', icon: <IconProfilePipe fill={this.state.number === 7 ? activeColorIcon : defColorIcon} width="100%" height="100%"></IconProfilePipe>},
  ]
  btnsNavigation.map(item => {
    return item
  })
  return btnsNavigation
  // ['УГОЛОК', 'ЛИСТ', 'ТРУБА', 'КРУГ', 'ШВЕЛЛЕР', 'БАЛКА/ДВУТАВР', 'КВАДРАТ', 'ТРУБА ПРОФИЛЬНАЯ']
}
sendPageName = (arrPagesNames) => {
  return this.state.number < this.btnList().length ? arrPagesNames()[this.state.number].name : 'Reload'
}
numberBtnActive =(id) => {
return this.setState({number: +id})
}
returnDensity = (returnValue) => {
  this.setState({density: returnValue})
}
returnMaterial = (material) => {
  this.setState({material: material})
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
  if (this.state.weightOn) {
      res = (this.isInfinity(den * resInPage)).toFixed(weightToFix)
    return res > 10e+6 ? `более 10 тыс т.` : `${res} ${weightUoM}`
  } else {
      res = (this.isInfinity((resInPage / den)).toFixed(resToFix)) 
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

gostOn = (value, gostName) => {
  this.setState({gostOn: value})
  this.setState({gostName: gostName})

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
              gostOn = {this.gostOn}
              result = {this.postResult(density, volume, 'кг', 'м', 2, 2)}
              material = {this.state.material}
              density = {this.state.density}
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
        returnMaterial = {this.returnMaterial}
        >
        </CalcBottomBlock>
      </>
      )
    case 1 : 
      return (
        <>
        <Sheet weightOn = {this.state.weightOn} 
               returnVolume={this.returnVolume}
               gostOn = {this.gostOn} 
              activeReloadBtn={this.activeReloadBtn}
              result = {this.postResult(density, volume, 'кг', 'мм', 2, 0)}
              material = {this.state.material}
              density = {this.state.density}
              >
        </Sheet>
        <CalcBottomBlock 
          activeReloadBtn = {this.state.btnReload}
          clearInputs = {this.clearInputs}
          data ={Database.grades} 
          returnDensity={this.returnDensity} 
          defaultGraid = {Database.grades.steels[0]} 
          result = {this.postResult(density, volume, 'кг', 'мм', 2, 0)}
          labelForResult = {this.state.weightOn ? 'Вес: ' : 'Длина: '}
          weightOn = {this.weightOn}
          returnMaterial = {this.returnMaterial}
        >
        </CalcBottomBlock>
        </>
      )
      
    case 2:
      return (
      <>
      <Pipe weightOn = {this.state.weightOn} 
            returnVolume = {this.returnVolume} 
            activeReloadBtn = {this.activeReloadBtn}
            gostOn = {this.gostOn}
            result = {this.postResult(density, volume, 'кг', 'м', 2, 2)}
            material = {this.state.material}
            density = {this.state.density}
              >
      </Pipe>
      <CalcBottomBlock 
        activeReloadBtn = {this.state.btnReload}
        clearInputs = {this.clearInputs}
        data = {Database.grades} 
        returnDensity = {this.returnDensity} 
        defaultGraid = {Database.grades.steels[0]} 
        result = {this.postResult(density, volume, 'кг', 'м', 2, 2)}
        labelForResult = {this.state.weightOn ? 'Вес: ' : 'Длина: '}
        weightOn = {this.weightOn}
        returnMaterial = {this.returnMaterial}
        >
        </CalcBottomBlock>
      </>)

    case 3 : 
    return (
      <>
      <Circle weightOn = {this.state.weightOn} 
              returnVolume = {this.returnVolume} 
              activeReloadBtn = {this.activeReloadBtn}
              gostOn = {this.gostOn}
              result = {this.postResult(density, volume, 'кг', 'м', 2, 2)}
              material = {this.state.material}
              density = {this.state.density}
              >
      </Circle>
      <CalcBottomBlock 
        activeReloadBtn = {this.state.btnReload}
        clearInputs = {this.clearInputs}
        data = {Database.grades} 
        returnDensity = {this.returnDensity} 
        defaultGraid = {Database.grades.steels[0]} 
        result = {this.postResult(density, volume, 'кг', 'м', 2, 2)}
        labelForResult = {this.state.weightOn ? 'Вес: ' : 'Длина: '}
        weightOn = {this.weightOn}
        returnMaterial = {this.returnMaterial}
        >
        </CalcBottomBlock>
      </>)

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

GostBlock = () => {
  if (this.state.gostOn){
    return <span className='gostOn'><FileText></FileText> {this.state.gostName}</span>
  } else {
    return ''
  }
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
         <Container>
         {/* <h1 className='header'>КАЛЬКУЛЯТОР МЕТАЛЛОПРОКАТА</h1> */}
          <Row className="justify-content-md-center">
            <Col xl={{ span: 3 }} className='d-flex align-items-start flex-column'>
                <ButtonsList numb = {this.numberBtnActive} valueBtns={this.btnList('#888', '#000')}></ButtonsList>
            </Col> 
            <Col xl={{ span: 8 }} className="main position-relative">
              <HeaderTitleBlock>
                <span className='pageName'>ТИП ПРОКАТА: {this.sendPageName(this.btnList)}</span>
                <this.GostBlock ></this.GostBlock>
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

