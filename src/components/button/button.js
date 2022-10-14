import React from 'react';
import styled from 'styled-components';
import { ArrowRepeat } from 'react-bootstrap-icons';

const Button = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 300px;
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
font-size:30px;
color:#B0CDBD;
margin-left:14px;
cursor: pointer;
transition: 0.3s;
padding: 8px;
border-radius: 50%;
background-color:#709882;


&:hover{
transition: 0.3s;
background-color:#88B09B;
padding: 8px;
color:#fff;
border-radius: 50%;
}
&:active{
transition: 0.3s;
opacity: 0;
color:#B0CDBD;
transform: rotate(270deg);
}
`

const ButtonCalc = (props) => {

    const clickOnBtn = () => {
        props.clearInputs(true)
    }
    const BtnReload = () => {
        
        if (props.btnVisible){
            return <DivZeroing onClick={clickOnBtn}><ArrowRepeat width="24" height="24"></ArrowRepeat></DivZeroing>
        } else 
        { return <></>}
    }


return (
    <>
        <Button>
            {props.label} {props.result}
            <BtnReload></BtnReload>
        </Button> 
        
    </>
)

}

export default ButtonCalc

