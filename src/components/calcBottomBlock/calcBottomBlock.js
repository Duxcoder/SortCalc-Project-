import React from "react";
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
const CalcBottomBlock = ({data}) => {

const giveMeProps = (arr, option) => {
    const newArr = []
    arr.map((item, i) => {
        return newArr[i] = item[option]
    })
    return newArr
    }

const selectGrades = () => {

}

return (
    <DivBottomBlock className="d-flex justify-content-center" >
        <DivSelectBlock className="d-flex align-items-end flex-column">
          <Select label='Материал' dataValues={giveMeProps(data.steels, 'material')}></Select>
          <Select label='Марка' dataValues={giveMeProps(data.steels, 'name')}></Select>
        </DivSelectBlock>
        <DivButtonBlock className='d-flex align-items-center justify-content-start'>
          <ButtonCalc></ButtonCalc>
        </DivButtonBlock>
      </DivBottomBlock>
      )


}

export default CalcBottomBlock