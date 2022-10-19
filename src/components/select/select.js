import React, {Component} from "react";
import styled from 'styled-components';


const DivSelect = styled.div`
display:block;
`

const SelectStyle = styled.select`
display:inline;
position:relative;
width: ${props => props.width};
height: ${props => props.height};
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




export default class Select extends Component {
    constructor(props) {
      super(props);
      this.state = {value: props.defaultSelected};
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
    this.setState({value: event.target.value});
    this.props.whatYouCheck(event.target.value);
    }
  
    Options = ({data}) => {
        const arr = data.map((item, i) => {
           return <option key={i} value={item}>{item}</option>
        })
        return arr
    }
    render() {
      return (
        
        <DivSelect>
            <label>
                <span>{this.props.label}</span>
                <SelectStyle 
                size={this.props.size}
                width={this.props.width ? this.props.width : 'auto'} 
                height={this.props.height ? this.props.height : 'auto'} 
                value= {this.state.value} onChange={this.handleChange}>
                    <this.Options data={this.props.dataValues}></this.Options>
                </SelectStyle>
            </label>
        </DivSelect>
       
      );
    }
  }


