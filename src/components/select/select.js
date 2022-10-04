import React, {Component} from "react";
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




export default class Select extends Component {
    constructor(props) {
      super(props);
      this.state = {value: this.props.dataValues[0]};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    this.props.whatYouCheck(this.state.value);

    }
  
    Options = ({data}) => {
        const arr = data.map((item, i) => {
           return <option key={i} value={item.i}>{item}</option>
        })
        return arr
    }
    render() {
      return (
        <form >
        <DivSelect>
            <label>
                <span>{this.props.label}:</span>
                <SelectStyle value= {this.state.value} onChange={this.handleChange}>
                    <this.Options data={this.props.dataValues}></this.Options>
                </SelectStyle>
            </label>
        </DivSelect>
        </form>
      );
    }
  }