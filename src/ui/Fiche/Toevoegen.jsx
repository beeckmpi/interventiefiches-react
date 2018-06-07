

// react imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// material-ui imports
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import AutoComplete from 'material-ui/AutoComplete';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//styles
const arrowDownStyles = {height:"40px", position:"absolute", "right": "5px", "top": "18px", width:"40px", color:'#AAA'};
const paperStyle = {position:"relative", padding:"5px 15px", marginBottom:'15px', width: "95%", color:'#AAA'}

const floatingLabelColor = {
  color: "#757575"
}

//locales
let DateTimeFormat;
const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});
export default class Toevoegen extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      andereMeldingShow: "hidden",
      andereOproepShow: "hidden",
      bijkomendeInformatie: "",
      district: "",
      doorgegevenAan: "",
      GSM: "",
      melding: "",
      opDatum: null,
      opmerkingBereikbaarheid: '',
      oproep: null,
      provinciaalCoordinator: "",
      richting: "",
      height: '300px',
    };
  }
  
  handleUpdateInput = (searchText, dataSource, params) => {this.setState({doorgegevenAan: searchText,}); };
  handleNewRequest = (chosenRequest, index) => {this.setState({doorgegevenAan: chosenRequest.naam, GSM: chosenRequest.GSM});};
  handleChangeDate = (event, date) => this.setState({"opDatum": date});
  handleChangeTime = (event, date) => this.setState({"oproep": date});
  handleChange = (event) => this.setState({[event.target.name]: event.target.value});
  handleChangeSelect = (id, event, index, value) => {
    this.setState({[id]: value});
    if (id==="oproepDoor" || id==="melding" ){
      if (value === "Andere"){
        if(id==="oproepDoor"){
          this.setState({"andereOproepShow": "show"});
        } else if (id==="melding") {
          this.setState({"andereMeldingShow": "show"});
        }
      } else {
        if(id==="oproepDoor"){
          this.setState({"andereOproepShow": "hidden"});
        } else if (id==="melding") {
          this.setState({"andereMeldingShow": "hidden"});
        }
      }
    }
  }
  submitForm = (event) => {
    event.preventDefault();
    const {data, state} = this;
    let dataInputs = {};
    for (var key in data) {
      if("input" in data[key]){
        dataInputs[data[key]["input"]["name"]] = data[key]["input"]["value"];
      }
    };
    console.log(dataInputs);
    const dataC = Object.assign({}, dataInputs, state);
    return fetch('http://localhost:3333/fiche/store', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWT'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(dataC)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) =>{
      console.error(error);
      
    });   
  }
  render() {
    const { classes } = this.props;
    const {
      andereMeldingShow,
      andereOproepShow,
      bijkomendeInformatie,
      district,
      doorgegevenAan,
      melding,
      opDatum,
      opmerkingBereikbaarheid,
      oproep,
      oproepDoor,
      provinciaalCoordinator,
      richting,
      height
    } = this.state;
    const dataSourceConfig = {
      text: 'naam',
      value: 'GSM',
    };
    return (
      <div className="container" style={{margin:"0px 0px 40px 0px", padding:"0px 8px 15px 8px"}}>
        <h3 style={{color:"#000", marginLeft:"10px"}}>Fiche Toevoegen</h3>
        <Paper id="content" style={{padding:"1px 15px 15px 15px",marginBottom: '15px',position: "relative"}}>
          <h3>Gegeven Provinciaal Coördinator</h3>
          <div style={{display:"inline-block"}}>
             <DatePicker floatingLabelStyle={floatingLabelColor} hintText="Op datum" locale="nl" floatingLabelText="Op (Datum)" value={opDatum} name="opDatum" onChange={this.handleChangeDate}  mode="landscape" />
           </div>
           <div style={{display:"inline-block"}}>
             <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Oproep" name="oproep" floatingLabelText="Oproep"  onChange={this.handleChangeTime} />
           </div>
          <div>
            <TextField
              hintText="Bijkomende Informatie"
              floatingLabelText="Bijkomende Informatie"
              multiLine={true}
              rows={2}
              name="bijkomendeInformatie"
              onChange={this.handleChange}
              style={{minWidth:"512px", maxWidth:"80%"}}
              floatingLabelStyle={floatingLabelColor}
            />
          </div>
          <div>
            <SelectField
              floatingLabelText="District"
              floatingLabelStyle={floatingLabelColor}
              name="district"
              id="district"
              value={district}
              onChange={(event, index, value) => this.handleChangeSelect("district", event, index, value)}
            >
              <MenuItem value={121} primaryText="Antwerpen d'Herbouvillekaai (121)" />
              <MenuItem value={123} primaryText="Brecht (123)" />
              <MenuItem value={100} primaryText="Directie (100)" />
              <MenuItem value={114} primaryText="Geel (114)" />
              <MenuItem value={112} primaryText="Puurs (112)" />
              <MenuItem value={125} primaryText="Vosselaar (125)" />
            </SelectField>
          </div>
          <div>
            <TextField
              hintText="Hoofdcoördinator Wegen"
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Oproep ontvangen door"
              name="provinciaalCoordinator"
              onChange={this.handleChange}
              style={{minWidth: "512px"}}
            />
          </div>
          <div style={{display:"flex"}}>
           
            <TextField
              hintText="GSM"
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="GSM"
              name="GSM"
              value={this.state.GSM}
            />
          </div>
          <div style={{display:"flex", flexWrap:'wrap'}}>
            <div>
              <SelectField
                floatingLabelText="Oproep door"
                floatingLabelStyle={floatingLabelColor}
                name="oproepDoor"
                id="oproepDoor"
                value={oproepDoor}
                onChange={(event, index, value) => this.handleChangeSelect("oproepDoor", event, index, value)}
              >
                <MenuItem value={"Politie"} primaryText="Politie" />
                <MenuItem value={"VTC"} primaryText="VTC" />
                <MenuItem value={"Andere"} primaryText="Andere" />
              </SelectField>
            </div>
            <div className={andereOproepShow}>
              <TextField
                hintText="Andere"
                floatingLabelStyle={floatingLabelColor}
                floatingLabelText="Andere"
                name="andereOproep"
                ref={input => this.data.andereOproep = input}
              />
            </div>
          </div>
          <div style={{display:"flex", flexWrap:'wrap'}}>
            <div>
              <SelectField
                floatingLabelText="Melding"
                floatingLabelStyle={floatingLabelColor}
                name="melding"
                id="melding"
                value={melding}
                onChange={(event, index, value) => this.handleChangeSelect("melding", event, index, value)}
              >
                <MenuItem value={"Bodemverontreiniging"} primaryText="Bodemverontreiniging" />
                <MenuItem value={"Ladingverlies"} primaryText="Ladingverlies" />
                <MenuItem value={"Ongeval"} primaryText="Ongeval" />
                <MenuItem value={"Wateroverlast"} primaryText="Wateroverlast" />
                <MenuItem value={"Weginfrastructuur"} primaryText="Weginfrastructuur" />
                <MenuItem value={"Andere"} primaryText="Andere" />
              </SelectField>
            </div>
            <div className={andereMeldingShow}>
              <TextField
                hintText="Andere"
                floatingLabelText="Andere"
                name="andereMelding"
                ref={input => this.data.andereMelding = input}
              />
            </div>
          </div>
          <div style={{display:"flex", flexWrap:'wrap'}}>
            <div>
              <TextField
                hintText="Weg"
                floatingLabelText="Weg"
                floatingLabelStyle={floatingLabelColor}
                ref={input => this.data.weg = input}
                name="weg"
              />
            </div>
            <div>
              <TextField
                hintText="Gemeente of Postcode"
                floatingLabelText="Grondgebied"
                floatingLabelStyle={floatingLabelColor}
                name="grondgebied"
                ref={input => this.data.grondgebied = input}
              />
            </div>
            <div>
              <TextField
                hintText="Rijrichting"
                floatingLabelText="Rijrichting"
                floatingLabelStyle={floatingLabelColor}
                name="rijrichting"
                ref={input => this.data.rijrichting = input}
              />
            </div>
          </div>
          <div  style={{display:"flex", flexWrap:'wrap'}}>
            <div>
              <TextField
                hintText="Gewestweg"
                floatingLabelText="Gewestweg"
                floatingLabelStyle={floatingLabelColor}
                name="gewestweg"
                ref={input => this.data.gewestweg = input}
              />
            </div>
            <div>
              <SelectField
                floatingLabelText="Richting"
                floatingLabelStyle={floatingLabelColor}
                name="richting"
                id="richting"
                value={richting}
                onChange={(event, index, value) => this.handleChangeSelect("richting", event, index, value)}
              >
                <MenuItem value={"Aflopend"} primaryText="Aflopend" />
                <MenuItem value={"Oplopend"} primaryText="Oplopend" />
              </SelectField>
            </div>
          </div>
          <div style={{display:"flex", flexWrap:'wrap'}}>
            <div>
              <TextField
                hintText="km punt van"
                floatingLabelText="Km punt van"
                floatingLabelStyle={floatingLabelColor}
                name="kmPuntVan"
                type="number"
                ref={input => this.data.number = input}
              />
            </div>
            <div>
              <TextField
                hintText="km punt tot"
                floatingLabelText="Km punt tot"
                floatingLabelStyle={floatingLabelColor}
                name="kmPuntTot"
                type="number"
                ref={input => this.data.number = input}
              />
            </div>
          </div>
          <div style={{display:"flex", flexWrap:'wrap'}}>
            <div>
              <TextField
                hintText="straat"
                floatingLabelText="Straat"
                floatingLabelStyle={floatingLabelColor}
                name="straat"
                ref={input => this.data.straat = input}
              />
            </div>
            <div>
              <TextField
                hintText="huisnummer"
                floatingLabelText="Huisnummer"
                floatingLabelStyle={floatingLabelColor}
                name="huisnummer"
                ref={input => this.data.huisnummer = input}
              />
            </div>
          </div>
          <div>
            <TextField
              hintText="Opmerking bereikbaarheid"
              floatingLabelText="Opmerking bereikbaarheid"
              floatingLabelStyle={floatingLabelColor}
              multiLine={true}
              rows={2}
              name="opmerkingBereikbaarheid"
              style={{minWidth: "512px"}}
              onChange={this.handleChange}
            />
          </div>
          <div style={{marginBottom:"25pt"}}>
            <RaisedButton
              label="Doorsturen"
              primary={true}
              onClick={this.submitForm}
            />
          </div>
        </Paper>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography><h3>Vaststelling</h3></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
           
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Paper style={paperStyle}>
          <KeyboardArrowDown style={arrowDownStyles} />
          <h3>Vaststelling</h3>
        </Paper>
        <Paper style={paperStyle}>
          <KeyboardArrowDown style={arrowDownStyles} />
          <h3>Beslissing oproep bijstand</h3>
        </Paper>
        <Paper style={paperStyle}>
          <KeyboardArrowDown style={arrowDownStyles} />
          <h3>Tijdstippen + Middelen uitvoering</h3>
        </Paper>
        <Paper style={paperStyle}>
          <KeyboardArrowDown style={arrowDownStyles} />
          <h3>Bijkomende details vaststellingen</h3>
        </Paper>
        <Paper style={paperStyle}>
          <KeyboardArrowDown style={arrowDownStyles} />
          <h3>Bijlagen</h3>
        </Paper>
        <Paper style={paperStyle}>
          <KeyboardArrowDown style={arrowDownStyles} />
          <h3>Afmelding</h3>
        </Paper>
      </div>
    );
  }
}
Toevoegen.propTypes = {
  classes: PropTypes.object.isRequired,
};