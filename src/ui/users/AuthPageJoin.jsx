// react imports
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px',
  marginLeft: '50',
  minHeight: '600px',
  padding: '70px 40px',
  marginTop: '15px'
}
export default class AuthPageJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      last_name: '',
      first_name: '',
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
    const {username, email, password, first_name, last_name} = this.state;
    return fetch('/register/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });   
  }
 
     
  render() {
    return (
      <Paper id="table" style={paperTableStyle} zDepth={3}>
        <div style={{ display:'inline-block'}}>
        <div className="formInput input-field">
            <TextField floatingLabelText="Gebruikersnaam" hintText="Gebruikersnaam" type="text" id="username" style={{width: '100%'}} value={this.state.username} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Voornaam" hintText="Voornaam" type="text" id="first_name" style={{width: '50%', display: 'inline-block'}} value={this.state.first_name} onChange={this.handleChange.bind(this)} />
            <TextField floatingLabelText="Naam" hintText="Naam" type="text" id="last_name" style={{width: '50%', display: 'inline-block'}} value={this.state.last_name} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Email adres" hintText="Email adres" type="email" id="email" style={{width: '100%'}} value={this.state.email} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Wachtwoord" hintText="Wachtwoord" type="password" id="password" style={{width: '100%'}} value={this.state.password} onChange={this.handleChange.bind(this)} />
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
