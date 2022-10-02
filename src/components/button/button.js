import React from 'react';
import styled from 'styled-components';


const Button = styled.button`
width: 232px;
height: 70px;
color: #fff;
background: #7DA48F;
font-family: 'Ubuntu';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 28px;
border-radius: 8px;
border: solid 1px #ccc;
transition: 0.15s;


&:hover {
background-color: #6C947E;
transition: 0.15s;
}
&:active {
background-color: #6A937D;
border: solid 4px #eee;
}
`
const ButtonCalc = () => {

return (
    <>
          <Button>Расчёт</Button> 
    </>
)

}

export default ButtonCalc