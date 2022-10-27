import React, { Component } from "react";
import styled from "styled-components";
import Select from '../../components/select/select';
import ButtonCalc from '../button/button';
import Switcher from "../switcher/Switcher";

const DivBottomBlock = styled.div`
margin: 30px 0;
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
        valueMat: this.props.defaultGraid.material,
        valueGraid: this.props.defaultGraid.name,
        valueGraidArr: [],
        valueDensity: this.props.defaultGraid.density
    }
}
createArr = (property) => {
    let arr = []
    for (let key in this.props.data) {
        if ( this.props.data[key].includes(this.props.defaultGraid) ){
            this.props.data[key].map (item => {
                arr.push(item[property]); 
                })
        }
    }
return arr
}

componentDidMount( ){
    this.setState({
        valueGraidArr: this.createArr('name')
    })
    this.props.returnDensity(this.state.valueDensity)
    this.props.returnMaterial(this.state.valueMat)

}

createArrProps= (arr, option) => {
    const newArr = []
    arr.map((item, i) => {
        return newArr[i] = item[option]
    })
    return newArr
    }

createArrMaterials = () => {
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

iCheckIt = (valueSelect) => {
    const {data} = this.props;
    let objGradesMaterial;
    const findDensity = (inThis) => {
        let val;
        for (let key in this.props.data) {
                this.props.data[key].map (item => {
                  if (item.name === inThis) {
                    this.setState({valueDensity: item.density})
                    val = item.density;
                  }
                })
            }
            return val
            
    }

    if (this.createArrMaterials().includes(valueSelect)) {
        this.setState({valueMat : valueSelect}, () => {this.props.returnMaterial(valueSelect)});

        for (let key in data){
            if (data[key][0].material === valueSelect){ // поиск материла в базе со стейтом материала
                objGradesMaterial = data[key] //объект с марками материала в стейте
            }
        }
        const arrGraides = objGradesMaterial.map(item => { //объект в массив марок материала стейта
            return item.name
        })
        this.setState({valueGraidArr : arrGraides})
        this.setState({valueGraid : arrGraides[0]})
        this.props.returnDensity(findDensity(arrGraides[0]))

    } else {
        this.setState({valueGraid : valueSelect})
        this.props.returnDensity(findDensity(valueSelect))
        
    }

}


render(){
    return (<>
        <DivBottomBlock className="d-flex justify-content-center" >
            <DivSelectBlock className="d-flex align-items-end flex-column">
              <Select width="240px" height="30px" label='Материал:' defaultSelected={this.state.valueMat} dataValues={this.createArrMaterials()} whatYouCheck={this.iCheckIt}></Select>
              <Select width="240px" height="30px" label='Марка:' defaultSelected={this.state.valueGraid} dataValues={this.state.valueGraidArr} whatYouCheck={this.iCheckIt}></Select>
            </DivSelectBlock>
            <DivButtonBlock className='d-flex align-items-center justify-content-start'>
              <ButtonCalc label={this.props.labelForResult} result ={this.props.result} clearInputs={this.props.clearInputs} btnVisible={this.props.activeReloadBtn}></ButtonCalc>
            <Switcher weightOn={this.props.weightOn}></Switcher>
            </DivButtonBlock>
          </DivBottomBlock>
          </>
          )
    
}
}

