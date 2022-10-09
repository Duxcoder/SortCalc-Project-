import React from 'react';
import styled from 'styled-components';
import { ArrowRepeat } from 'react-bootstrap-icons';

const Button = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
height: 100%;
max-width: 240px;
height: 70px;
color: #fff;
background: #7DA48F;
font-family: 'Ubuntu';
font-style: normal;
font-weight: 700;
font-size: 18px;
border-radius: 8px;
border: solid 1px #ccc;
text-align: left;
padding: 20px 20px;
`
const DivZeroing = styled.div`

display: flex;
align-items: center;
justify-content: flex-start;
font-size:30px;
color:#fff;
margin-left:14px;
cursor: pointer;
transition: 0.3s;

&:hover{
transition: 0.3s;
transform: rotate(180deg);
}
&:active{
color:#B0CDBD;
}
`

const ButtonCalc = () => {

return (
    <>
        <Button>
            Вес: 22220 кг
            <DivZeroing><ArrowRepeat width="24" height="24"></ArrowRepeat></DivZeroing>
        </Button> 
        
    </>
)

}

export default ButtonCalc