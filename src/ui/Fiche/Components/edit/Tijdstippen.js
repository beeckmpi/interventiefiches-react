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

const floatingLabelColor ={
  color: "#757575"
}
const styles =  theme => ({
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '170pt',
    marginBottom: '8pt'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Tijdstippen extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      afgraving: false,
      andere: {},
      andereTekst: "",
      mode:'edit',
      ontstoppen: false,
      opmerkingen: '',
      reinigen: false,
      totAannemer: null,
      totDeskundige: null,
      totRegie: null,
      open:false,
      totSignalisatie: null,
      vanAannemer: null,
      vanDeskundige: null,
      vanRegie: null,
      vanSignalisatie: null,
      vaStootbanden: false,
      vullenPut: false,
    };
  }
  componentDidMount = () => {
    return fetch('/fiches/component/tijdstippen/'+this.props.ficheId, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWT'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState(responseJson[0]);
    })
    .catch((error) =>{
      console.error(error);
      
    });   
  }
  andereOptieToevoegen = () => {this.setState({open: true})};

  handleAdd = (event) => { this.setState({open: false, andere: {...this.state.andere, [this.state.andereTekst]: true}, andereTekst: ""})};

  renderAndereItems(){
    return Object.keys(this.state.andere).map((key, bool) => (
       <FormControlLabel
        control={<Checkbox key={key}  checked={this.state.andere[key]} onChange={(event, checked) => this.handleChbxChangeAndere(key, event, checked)} value={this.state.andere[key]} /> }
        label={key}
      />
      
    ));
  }

  handleChbxChangeAndere = (id, event, checked) => {
    this.setState({andere: {[id]: checked}});
  }
  handleClose = (id) => {
    this.setState({andereIncidentOpen: false, andereAanwezigOpen: false}, () => {
      this.saveThis();
    });
   };
   handleChange = (event) => {
     this.setState({[event.target.name]: event.target.value}, () => {
      this.saveThis();
    });
   }
   handleChangeTime = (id, event, date) => {
     this.setState({[id]: date}, () => {
      this.saveThis();
    });
   }
   handleChbxChange = (id, event, checked) => {
     this.setState({[id]: checked}, () => {
      this.saveThis();
    });
   }
   
  saveThis = () => {
    const {data, state} = this;
    let dataInputs = {};
    for (var key in data) {
      if("input" in data[key]){
        dataInputs[data[key]["input"]["name"]] = data[key]["input"]["value"];
      }
    };
    const dataC = Object.assign({}, dataInputs, state);
    return fetch('/fiches/component/tijdstippen/'+this.props.ficheId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWT')
      },
      body: JSON.stringify(dataC)
    })
    .then((response) => response.json())
    .then((responseJson) => {
        
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  setAsView = () => {
    this.setState({mode: 'edit'});
  }

  render() {
    const { classes } = this.props;
    const {data, state} = this;
    return (
      <div>
        <section id="tijdstippen"  className={(this.state.mode==='edit')? 'show': 'hidden'}>
          <div style={{position: 'absolute', top:'9px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.saveThis}>
              Resultaat
            </Button>
          </div>
          <div style={{fontSize: "0.83em", fontWeight: "bold"}}></div>
          <div style={{fontWeight: "bold"}}>Regie ter plaatse:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("vanRegie", event, date)} style={{maxWidth:'100px'}} value={moment(state.vanRegie).format()} defaultValue={moment(state.vanRegie).format()} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("totRegie", event, date)} style={{maxWidth:'100px'}} value={this.state.totRegie} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
            <TextField  floatingLabelStyle={floatingLabelColor} floatingLabelText="Regie arbeiders" ref={input => state.regieArbeider = input} value={state.regieArbeider} type="number" name="regieArbeider" />
          </div>
          <div style={{width: '200px', fontWeight: "bold"}}>Aannemer ter plaatse:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("vanAannemer", event, date)} style={{maxWidth:'100px'}} value={moment(state.vanAannemer)} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("totAannemer", event, date)} style={{maxWidth:'100px'}} value={state.totAannemer} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
            <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Ploegbaas Aannemer" ref={input => state.regieToezichter = input} defaultValue={state.regieToezichter} type="text" name="regieToezichter" />
          </div>
          <div style={{width: '200px', fontWeight: "bold"}}>Signalisatie ter plaatse:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("vanSignalisatie", event, date)} style={{maxWidth:'100px'}} value={state.vanSignalisatie} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("totSignalisatie", event, date)} style={{maxWidth:'100px'}} value={state.totSignalisatie} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
            <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Aantal Botsers" ref={input => state.aantalBotsers = input} defaultValue={state.aantalBotsers} type="number" name="aantalBotsers" />
          </div>
          <div style={{width: '200px', fontWeight: "bold"}}>Deskundige ter plaatse:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("vanDeskundige", event, date)} style={{maxWidth:'100px'}} value={state.vanDeskundige} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("totDeskundige", event, date)} style={{maxWidth:'100px'}} value={state.totDeskundige} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
            <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Deskundige" ref={input => state.naamDeskundige = input} defaultValue={state.naamDeskundige} type="text" name="naamDeskundige" />
          </div>
          <div style={{width: '200px', fontWeight: "bold", paddingBottom: '10px'}}>Ondernomen actie:</div>
          <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={this.state.afgraving} onChange={(event, checked) => this.handleChbxChange("afgraving", event, checked)} value="afgraving" /> }
                label="Afgraving"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.ontstoppen} onChange={(event, checked) => this.handleChbxChange("ontstoppen", event, checked)} value="ontstoppen" /> }
                label="Ontstoppen riolering"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.reinigen} onChange={(event, checked) => this.handleChbxChange("reinigen", event, checked)} value="reinigen" /> }
                label="Reinigen wegdek"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.vaStootbanden} onChange={(event, checked) => this.handleChbxChange("vaStootbanden", event, checked)} value="vaStootbanden" /> }
                label="Aanpassen stootbanden"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.vullenPut} onChange={(event, checked) => this.handleChbxChange("vullenPut", event, checked)} value="vullenPut" /> }
                label="Vullen put"
              />
              {this.renderAndereItems()}
              <Button variant="outlined" className={classes.button} color="secondary" onClick={this.andereOptieToevoegen}>
                Andere Toevoegen
              </Button>
          </FormGroup>
          <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Andere categorie toevoegen</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Voeg een andere mogelijkheid toe.
                </DialogContentText>
                <TextField
                  floatingLabelStyle={floatingLabelColor}
                  floatingLabelText="Andere categorie"
                  name="andereTekst"
                  value={state.andereTekst}
                  onChange={this.handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Annuleren
                </Button>
                <Button onClick={this.handleAdd} color="primary">
                  Toevoegen
                </Button>
              </DialogActions>
            </Dialog>
         
          <TextField
            floatingLabelText="Opmerkingen"
            multiLine={true}
            rows={3}
            name="opmerkingen"
            style={{minWidth:"512px", maxWidth:"80%", whiteSpace: 'pre-line'}}
            floatingLabelStyle={floatingLabelColor}
            value={state.opmerkingen}
            onChange={this.handleChange}
          />
        </section>
        <section id="tijdstippen_view" className={(this.state.mode==='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
           <Button color="secondary" size="small" className={classes.button} onClick={this.saveThis}>
              Resultaat
            </Button>
          <TijdstippenView  ficheId={this.props.ficheId} key={'Tijdstippen_'+this.props.ficheId} />
        </section>
      </div>
    );
  }
}
Tijdstippen.propTypes = {
};

export default  withStyles(styles)(Tijdstippen);