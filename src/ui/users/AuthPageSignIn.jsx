// react imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

const paperTableStyle = {
  minWidth: '70%',
  marginBottom: '20px',
  padding: '0px 10px',
}

export default class AuthPageSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '', 
      redirect: false,
      isLoading: false,
      loginData: {}
    };
  }
  handleChange(event) {
    const id = event.target.id;
    this.setState({[id]: event.target.value});
  }
  signInUser = (event) => {
    this.setState({error: false, errorMessage: ""});
    const {email, password} = this.state;
    return fetch('http://localhost:3333/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson[0]!==undefined){
        if(responseJson[0]['field']==="password"){
          this.setState({error: true, errorMessage: "Het wachtwoord is niet correct"});
        } else if (responseJson[0]['field']==="email"){
          this.setState({error: true, errorMessage: "Het mailadres zit niet in de databank"});
        } 
      } else {
        sessionStorage.setItem('JWT', responseJson.token);
        sessionStorage.setItem('RefreshToken', responseJson.refreshToken);
        this.setState({
          isLoading: false,
          loginData: responseJson,
          redirect: true
        });
      }

    })
    .catch((error) =>{
      console.error(error);
      alert(error)
    });   
   
  }
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/fiches/Toevoegen'/>;
    }
    return (
      <div id="table" className="login" style={paperTableStyle} zDepth={3}>
        <div style={{display:'inline-block'}}>
          <div className="formInput input-field">
            <TextField floatingLabelText="Email addres" type="email" id="email" floatingLabelFixed={true} style={{minWidth: '200px', fontSize:'smaller'}} value={this.state.email} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Wachtwoord" type="Password" id="password" floatingLabelFixed={true} style={{width: '100%'}} value={this.state.password} onChange={this.handleChange.bind(this)} />
          </div>
          {this.state.error && <div className="error">
            {this.state.errorMessage} 
          </div>}
          <div className="formInput">
            <Button variant="contained" color="primary" onClick={this.signInUser}>Aanmelden</Button>
          </div>
        </div>
        <div style={{width:'20%', display:'inline-block'}}>

        </div>
      </div>
    );
  }
}
