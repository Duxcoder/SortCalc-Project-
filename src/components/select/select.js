import React from "react";
import styled from 'styled-components';


const DivSelect = styled.div`
display:block;
`

const SelectStyle = styled.select`
display:inline;
position:relative;
width: 240px;
height:30px;
border-radius: 8px;
border: solid 1px #ccc;
text-align:left;
outline:none;
background-color: #fafafa;
color: #707070;
font-family: 'Ubuntu';
font-style: normal;
font-weight: 500;
font-size: 16px;
padding: 0 10px;
margin: 6px 8px;

`

const Select = ({label, dataValues}) => {
   

const createArr = (nameStell, densityStell) => {
    
    }
// const data = {
//     steels: [
//         { name: 'Сталь 3', density: 20 },
//         { name: 'Сталь 45', density: 41 }
//     ]
// }
let defaultValue = 2;

const Options = ({data}) => {
    console.log(data)
    const arr = data.map((item, i) => {
       return <option key ={i} value={item.i}>{item}</option>
    })
    console.log(arr)
return arr
    }
return ( <>
<DivSelect>
    <label>
    <span>{label}:</span>
      <SelectStyle defaultValue={defaultValue}>
        <Options data={dataValues}></Options>
        <option value={defaultValue}>Коктейль</option>
      </SelectStyle>
    </label>
</DivSelect>
    </>
)
}

export default Select;