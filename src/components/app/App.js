import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import ButtonsList from '../buttonsList/buttonsList';
import Corner from '../pages/corner/corner';
import Select from '../../components/select/select';
import ButtonCalc from '../button/button';

const Logo = styled.div`
width: 127px;
height: 44px;
margin-top: 20px;
font-family: 'Kelly Slab';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 44px;
color: #000000;`
const DivBottomBlock = styled.div`
margin-top:20px;
width:100%;
height:auto;
`
const DivButtonBlock = styled.div`
margin: 0 10px;

`
const DivSelectBlock = styled.div`

`

const HeaderTitleBlock = styled.div`
width: 100%;
height: auto;
display:block;
margin: 0px 0px 20px 0px;
padding: 12px 20px;
background-color: #755F5F;
border-radius: 10px 10px 0 0;
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
    number: 0,
    data: {},
    res: 0,
    grades: {
      steels: [
        { name: 'Сталь Ст3', density: 7850, material: 'Сталь'},
        { name: 'Сталь 45', density: 7826, material: 'Сталь' },
        { name: '08Х18Н10Т', density: 7900, material: 'Сталь' },
      ],
    },
  }
}
btnList(){
  const btnLists = ['Уголок', 'Лист', 'Труба', 'Круг', 'Швеллер', 'Балка/Двутавр', 'Квадрат', 'Труба профильная']
  return btnLists
}
numberBtnActive =(id) => {
return this.setState({number: +id})
}

ViewContent = () => {
   switch (this.state.number){
    case 0 : 
      return (
      <>
      <Corner></Corner>
      <DivBottomBlock className="d-flex justify-content-center" >
        <DivSelectBlock className="d-flex align-items-end flex-column">
          <Select label='Материал' data={this.state.grades}></Select>
          <Select label='Марка'></Select>
        </DivSelectBlock>
        <DivButtonBlock className='d-flex align-items-center justify-content-start'>
          <ButtonCalc></ButtonCalc>
        </DivButtonBlock>
      </DivBottomBlock>
      <span>{this.state.res}</span>
      </>
      )

    case 1 : 
      return <p>This is 1</p>
      
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
    
    default:
      console.log('error')
  }
}
  render(){
 
    return (
      <>
      <div className='bg-white container-fluid'></div>
        <Container className='d-flex align-items-center flex-column length'>
          <Row className="head container-fluid">
            <Col lg={2}><Logo>SortCalc</Logo></Col>
            <Col lg={{ span: 8, offset: 2 }}></Col>
          </Row>
          <Row>
            <Col className='d-flex align-items-start flex-column'>
              <DivButtons >
                <ButtonsList numb = {this.numberBtnActive} valueBtns={this.btnList()}></ButtonsList>
              </DivButtons>
            </Col> 
            <Col lg={{ span: 9 }} className="main">
              <HeaderTitleBlock>
                <h1>Калькулятор металлопроката</h1>
                <span className='pageName'>{this.btnList()[this.state.number]}</span>
              </HeaderTitleBlock> 
              <this.ViewContent></this.ViewContent>
            </Col>
          </Row>
        </Container>
        <div className='mt-auto w-100 container-fluid'>
            <Footer><span className='footerText'>ⓒ 2022 Developed with React by <a target="_blank" href='https://github.com/Duxcoder'>Duxcoder</a></span></Footer>
          </div>

       
      
      </>
    );
  }
 
}


