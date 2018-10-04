// react imports
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
const paperTableStyle = {
  minWidth: '50%',
  padding: '40px 20px',
}
export default class AuthPageJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      last_name: '',
      first_name: '',
      gsm: '',
      email: '',
      password: '',
      rpassword: '', 
      role: '', 
      open: false
    };
  }
 
  handleChange = event => {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  addUser = (event) => {
    event.preventDefault();
    const {username, email, password, rpassword, first_name, last_name, role, GSM} = this.state;
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
        last_name: last_name,
        rpassword: rpassword, 
        role: role,
        GSM: GSM
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
      <Paper id="table" style={paperTableStyle} zDepth={1}>
        <div style={{ display:'inline-block'}}>
        <div className="formInput input-field">
            <TextField floatingLabelText="Gebruikersnaam" hintText="Gebruikersnaam" type="text" id="username" name="username" style={{width: '100%'}} value={this.state.username} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Voornaam" hintText="Voornaam" type="text" name="first_name" id="first_name" style={{width: '50%', display: 'inline-block'}} value={this.state.first_name} onChange={this.handleChange.bind(this)} />
            <TextField floatingLabelText="Naam" hintText="Naam" type="text" name="last_name" id="last_name" style={{width: '50%', display: 'inline-block'}} value={this.state.last_name} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Email adres" hintText="Email adres" name="email" type="email" id="email" style={{width: '50%', display: 'inline-block'}} value={this.state.email} onChange={this.handleChange.bind(this)} />
            <TextField floatingLabelText="GSM" hintText="GSM nummer" type="input" name="GSM"  id="GSM" style={{width: '50%', display: 'inline-block'}} value={this.state.GSM} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <FormControl>
              <InputLabel htmlFor="role">Rol</InputLabel>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.role}
                input={<Input id="role" />}
                onChange={this.handleChange}
                style={{width: '150pt', display: 'inline-block'}}
                inputProps={{
                  name: 'role',
                  id: 'role',
                }}
              >
                <MenuItem value={""}><em>None</em></MenuItem>
                <MenuItem value={"Administrator"}>Administrator</MenuItem>
                <MenuItem value={"Coordinatoren"}>Coordinatoren</MenuItem>
                <MenuItem value={"Overzicht"}>Overzicht</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Wachtwoord" hintText="Wachtwoord" type="password" name="password" id="password" style={{width: '100%'}} value={this.state.password} onChange={this.handleChange.bind(this)} />
            <TextField floatingLabelText="Herhaal Wachtwoord" hintText="Wachtwoord" type="password" name="rpassword" id="rpassword" style={{width: '100%'}} value={this.state.rpassword} onChange={this.handleChange.bind(this)} />
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
