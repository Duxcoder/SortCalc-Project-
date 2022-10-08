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
        valueMat: 'Сталь',
        valueGraid: 'Сталь 45',
        valueGraidArr: ['Сталь 45', 'Сталь Ст3', '8ХЛ']
    }
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
componentWillUnmount (){
    console.log(this.state)
}
iCheckIt = (valueSelect) => {
    const {data} = this.props;
    let objGradesMaterial;
    
    if (this.createArrMaterials().includes(valueSelect)) {
        this.setState({valueMat : valueSelect});

        for (let key in data){
            if (data[key][0].material === valueSelect){ // поиск материла в базе со стейтом материала
                objGradesMaterial = data[key] //объект с марками материала в стейте
                console.log(objGradesMaterial)
            }
        }
        const arrGraides = objGradesMaterial.map(item => { //объект в массив марок материала стейта
            return item.name
        })
        this.setState({valueGraidArr : arrGraides})

        this.setState({valueGraid : arrGraides[0]})
        console.log('change materials', this.state)
    } else {
        this.setState({valueGraid : valueSelect})
        console.log('change grades')
    }
}

// getGrades = (property) => {
// const {data} = this.props;
// let arr = []
//     for (let key in data){
//         if (data[key][0].material === this.state.value){
//             console.log(data[key][0].material, this.state.value, data[key])
//             arr = data[key]  
//         } 
        
//     }
//     return this.createArrProps(arr, property)

// }
render(){
    return (<>
        <DivBottomBlock className="d-flex justify-content-center" >
            <DivSelectBlock className="d-flex align-items-end flex-column">
              <Select label='Материал' defaultSelected={this.state.valueMat} dataValues={this.createArrMaterials()} whatYouCheck={this.iCheckIt}></Select>
              <Select label='Марка' defaultSelected={this.state.valueGraid} dataValues={this.state.valueGraidArr} whatYouCheck={this.iCheckIt}></Select>
            </DivSelectBlock>
            <DivButtonBlock className='d-flex align-items-center justify-content-start'>
              <ButtonCalc></ButtonCalc>
            </DivButtonBlock>
          </DivBottomBlock>
          </>
          )
    
}

}

 