// react imports
// react imports
import React, { Component } from 'react';
import moment from 'moment-es6';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TijdstippenView from '../view/tijdstippen';


import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import IndividualFile from '../individualFile.js';
import BijlagesView from '../view/bijlages';

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
export default class Bijlages extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
 render() {
   if (!this.props.docsReadyYet) {
     'use strict';

     return (
       <div>
         <Dropzone 
            id="dropZone"
            style={{
              width: "400px", 
              height: "100px", 
              border: "2px dashed #000", 
              fontSize: "larger", 
              fontWeigh: "bold", 
              padding: "45px 25px 0px 25px"
            }}

          >
          Klik hier om bestanden toe te voegen of sleep bestanden binnen dit vierkant om ze te uploaden.
          </Dropzone>
       </div>
     );
   }
   else return <div></div>
 }
}
