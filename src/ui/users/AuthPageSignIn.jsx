// react imports
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { GoogleLogin } from 'react-google-login';

const paperTableStyle = {
  minWidth: '70%',
  marginBottom: '20px',
  padding: '70px 30px',
}

const responseGoogle = (response) => {
  console.log(response);
}

export default class AuthPageSignIn extends Component {
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
  signInUser = (event) => {
    event.preventDefault();
    /*var userObject = {
      email: this.state.email,
      password: this.state.password,
    };*/
   
  }
  render() {
    return (
      <Paper id="table" style={paperTableStyle} zDepth={3}>
        <div style={{width:'80%', display:'inline-block'}}>
          <div className="formInput input-field">
            <TextField floatingLabelText="Email addres" hintText="Email Adres" type="email" id="email" style={{width: '100%'}} value={this.state.email} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Wachtwoord" hintText="wachtwoord" type="Password" id="password" style={{width: '100%'}} value={this.state.password} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput">
            <RaisedButton primary={true} label="Aanmelden" onClick={this.signInUser} />
          </div>
        </div>
        <GoogleLogin
          clientId="851162706229-v8qt3v0d2qck0lpah9am2st32bqatti7.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <div style={{width:'20%', display:'inline-block'}}>

        </div>
      </Paper>
    );
  }
}
