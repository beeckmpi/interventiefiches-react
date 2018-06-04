// react imports
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {grey50, grey400, grey800} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px',
  marginLeft: '310px',
  minHeight: '600px',
  padding: '40px 40px',
  marginTop: '15px'
}
export default class AuthPageJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      firstname: '',
      email: '',
      password: ''
    };
  }
  handleChange(event) {
    const id = event.target.id;
    this.setState({[id]: event.target.value});
  }
  addUser = (event) => {
    event.preventDefault();
    const {email, password, firstname, lastname} = this.state;
    var userObject = {
      email,
      password,
      profile: {
        firstname,
        lastname
      }
    };

   
  }
  render() {
    return (
      <Paper id="table" style={paperTableStyle} zDepth={3}>
        <div style={{width:'80%', display:'inline-block'}}>
          <div className="formInput input-field">
            <TextField floatingLabelText="Voornaam" hintText="Voornaam" type="text" id="firstname" style={{width: '50%', display: 'inline-block'}} value={this.state.firstname} onChange={this.handleChange.bind(this)} />
            <TextField floatingLabelText="Naam" hintText="Naam" type="text" id="name" style={{width: '50%', display: 'inline-block'}} value={this.state.lastname} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Email adres" hintText="Email adres" type="email" id="email" style={{width: '100%'}} value={this.state.email} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Wachtwoord" hintText="Wachtwoord" type="password" type="Password" id="password" style={{width: '100%'}} value={this.state.password} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput">
            <RaisedButton primary={true} label="Registreren" onClick={this.addUser} />
          </div>
        </div>
        <div style={{width:'20%', display:'inline-block'}}>

        </div>
      </Paper>
    );
  }
}
