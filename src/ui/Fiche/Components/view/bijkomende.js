// react imports
import React, { Component } from 'react';

const itemStyle = {margin:'15px 0px 6px 0px'};
const textStyle = {whiteSpace: 'pre-line'};
export default class BijkomendeView extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      fiche: []
    };
  }
  componentDidMount = () => {
    return fetch('/fiches/component/bijkomende/'+this.props.ficheId, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWT'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({fiche: responseJson});
    })
    .catch((error) =>{
      console.error(error);
      
    });   
  }
  render() {
    const { fiche } = this.state;
    return (
      <div>
        <div style={itemStyle}>Bijkomende Details Vaststellingen - Acties - Uitvoering - ...:</div>
        <div style={textStyle}><strong>{fiche.text}</strong></div>
      </div>
    );
  }
}
