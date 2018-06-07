// react imports
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment-es6';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import IndividualFile from '../individualFile.js';

const floatingLabelColor = {
  color: "#757575"
}
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '170pt',
    marginBottom: '8pt'
  },
  largeImage: {maxWidth: "60%", maxHeight: "100%", height: "auto"}
};
const customContentStyle = {
  width: '80%',
  height: '80%',
  maxWidth: 'none',
};
export default class BijlagesView extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {

    };
  }
  componentDidMount = () => {
    return fetch('http://localhost:3333/fiches/component/bijlage', {
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
  showUploadedFiles = () => {
    const { imageFiles } = this.props;
    if(imageFiles!=undefined) {
      return imageFiles.map((image, key) => (
        <IndividualFile key={key} image={image} />
      ));
    }
  }
  render() {
    const { data, fiche } = this.props;
    return (
      <div>
        <div style={{display: "flex",flexWrap: "wrap", marginLeft: "20pt"}}>
         
        </div>
      </div>
    );
  }
}
