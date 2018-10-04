// react imports
import React, { Component } from 'react';
import moment from 'moment-es6';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import VaststellingView from '../view/vaststelling';
import FetchC from '../../../../methods/fetch';

const floatingLabelColor = {
  color: "#757575"
}
const styles = theme => ({
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '170pt', marginBottom: '8pt', transition: 'all 0s ease-in-out'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});
class Vaststelling extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      andereAanwezig: {},
      andereAanwezigOpen: false,
      andereAanwezigTekst: "",
      andereIncident: {},
      andereIncidentOpen: false,
      andereIncidentTekst: "",
      andereOngeval: false,
      bermTalut: false,
      betStootb: false,
      bijstandBrand: false,
      bodemverontreiniging: false,
      boomStruikIncident: false,
      boomStruikOngeval: false,
      brandweer: false,
      civieleBescherming: false,
      electrischeInstallatie: false,
      fast: false,
      federalePolitie: false,
      kunstwerk: false,
      kunstwerkOngeval: false,
      ladingverlies: false,
      metStootb: false,
      mode: 'edit',
      ongeval: false,
      opmerkingen: '',
      open: false,
      opstuiking: false,
      put: false,
      redirect: false,
      signalisatie: false,
      signalisatie2: false,
      stormschade: false,
      uurEinde: null,
      uurTerplaatse: null,
      verzakking: false,
      vangrail: false,
      wateroverlast: false,
      wegdek: false,
      fiche: []
    };
  }
  async componentDidMount ()  {
    await FetchC.getComponent('vaststelling', this.props.ficheId).then((data) => {this.setState(data[0])});
  }
  AndereOptieToevoegen = (id) => {
   this.setState({[id]: true});
   
  };

  handleAdd = (event) => {
    console.log(this.state.andereAanwezigTekst);
    let id = '';
      if (this.state.andereAanwezigTekst!==""){
        id = "andereAanwezig";
      } else if (this.state.andereIncidentTekst!==""){
        id= "andereIncident";
      }
      let idTekst = id + "Tekst";
      let idOpen = id + "Open";
      this.setState({[idOpen]: false, [id]: {...this.state[id], [this.state[idTekst]]: true}, [idTekst]: ""});
      FetchC.storeAndere(this.props.ficheId, {ficheId: this.props.ficheId, tekst: this.state.andereAanwezigTekst, type: 'Oproep_andere'})
  };

  renderKennisgaveAnderItems(id){
    return Object.keys(this.state[id]).map((key, bool) => (
      <FormControlLabel
        control={<Checkbox key={key}  checked={this.state[id][key]} onChange={(event, checked) => this.handleChbxChangeAndere(id, key, event, checked)} value={this.state[id][key]} /> }
        label={this.state[id][key]}
      />
    ));
  }
  handleClose = (id) => {
   this.setState({andereIncidentOpen: false, andereAanwezigOpen: false});
   this.saveThis();
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
  handleChbxChangeAndere = (id, key, event, checked) => {
    this.setState({[id]: {[key]: checked}}, () => {
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
    FetchC.storeComponents('vaststelling', this.props.ficheId, dataC)
  }
  setAsView = () => {
    this.setState({mode: 'edit'});
  }

  render() {
    const { classes, ExpansionPanelOpen } = this.props;
    const {fiche} = this.state;
    return (
      <div>
        <section id="vaststellingen" className={(this.state.mode==='edit')? 'show': 'hidden'}>
        { (ExpansionPanelOpen) ?
          <div style={{position: 'absolute', top:'11px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.saveThis}>
              Resultaat
            </Button>
          </div>
          : ""
        }
          <div style={{display:"inline-block"}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurTerplaatse} format="24hr" onChange={(event, date) => this.handleChangeTime("uurTerplaatse", event, date)} hintText="Uur ter plaatse" name="terPlaatse" floatingLabelText="Uur ter plaatse"   />
          </div>
          <div style={{display:"inline-block"}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurEinde} format="24hr" onChange={(event, date) => this.handleChangeTime("uurEinde", event, date)} hintText="Uur einde" name="uurEinde" floatingLabelText="Uur einde" />
          </div>
          <h5>Aanwezig ter plaatse</h5>
          <div>
            <div style={{fontSize: "0.83em", fontWeight: "bold"}}>Oproep aan</div>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={this.state.federalePolitie} onChange={(event, checked) => this.handleChbxChange("federalePolitie", event, checked)} value="federalePolitie" /> }
                label="Federale Politie"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.brandweer} onChange={(event, checked) => this.handleChbxChange("brandweer", event, checked)} value="brandweer" /> }
                label="Brandweer"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.fast} onChange={(event, checked) => this.handleChbxChange("fast", event, checked)} value="fast" /> }
                label="FAST / Takeldienst"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.civieleBescherming} onChange={(event, checked) => this.handleChbxChange("civieleBescherming", event, checked)} value="civieleBescherming" /> }
                label="Civiele Bescherming"
              />
              {this.renderKennisgaveAnderItems("andereAanwezig")}
              <Button variant="outlined" className={classes.button} color="secondary" onClick={() => this.AndereOptieToevoegen('andereAanwezigOpen')}>
                Andere Toevoegen
              </Button>
            </FormGroup>
             
            </div>
            <Dialog
              open={this.state.andereAanwezigOpen}
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
                  name="andereAanwezigTekst"
                  value={this.state.andereAanwezigTekst}
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
          <div>
            <TextField
              floatingLabelText="Opmerkingen"
              multiLine={true}
              rows={3}
              name="opmerkingen"
              style={{minWidth:"512px", maxWidth:"80%", whiteSpace: 'pre-line'}}
              floatingLabelStyle={floatingLabelColor}
              value={this.state.opmerkingen}
              onChange={this.handleChange}
            />
          </div>
          <h5>Incident / Schade</h5>
          <div>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={this.state.put} onChange={(event, checked) => this.handleChbxChange("put", event, checked)} value="put" /> }
                label="Put in rijbaan"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.signalisatie} onChange={(event, checked) => this.handleChbxChange("signalisatie", event, checked)} value="signalisatie" /> }
                label="Signalisatie"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.boomStruikIncident} onChange={(event, checked) => this.handleChbxChange("boomStruikIncident", event, checked)} value="boomStruikIncident" /> }
                label="Boom/Struik"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.kunstwerk} onChange={(event, checked) => this.handleChbxChange("kunstwerk", event, checked)} value="kunstwerk" /> }
                label="Kunstwerk"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.verzakking} onChange={(event, checked) => this.handleChbxChange("verzakking", event, checked)} value="verzakking" /> }
                label="Verzakking"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.opstuiking} onChange={(event, checked) => this.handleChbxChange("opstuiking", event, checked)} value="opstuiking" /> }
                label="Opstuikingk"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.vangrail} onChange={(event, checked) => this.handleChbxChange("vangrail", event, checked)} value="vangrail" /> }
                label="Met. vangrail"
              />
              {this.renderKennisgaveAnderItems("andereIncident")}
              <Button variant="outlined" className={classes.button} color="secondary" onClick={() => this.AndereOptieToevoegen('andereIncidentOpen')}>
                Andere Toevoegen
              </Button>
            </FormGroup>
            <Dialog
              open={this.state.andereIncidentOpen}
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
                  name="andereIncidentTekst"
                  value={this.state.andereIncidentTekst}
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
          </div>
          <div>
          <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={this.state.wateroverlast} onChange={(event, checked) => this.handleChbxChange("wateroverlast", event, checked)} value="wateroverlast" /> }
                label="Wateroverlast"
              />
            
            {this.state.wateroverlast ? <TextField
              floatingLabelStyle={floatingLabelColor}
              style={{marginTop: '-28px'}}
              floatingLabelText="Omschrijving wateroverlast"
              name="wateroverlastTekst"
              onChange={this.handleChange}
              value={this.state.wateroverlastTekst}
              
            /> : <div></div>}
          </FormGroup>
          <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={this.state.stormschade} onChange={(event, checked) => this.handleChbxChange("stormschade", event, checked)} value="stormschade" /> }
                label="Stormschade"
              />
            
            {this.state.stormschade ? <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Omschrijving Stormschade"
              style={{marginTop: '-28px'}}
              name="stormschadeTekst"
              onChange={this.handleChange}
              value={this.state.stormschadeTekst }
            /> : <div></div>}
          </FormGroup>
          <div style={{display:'flex', align:'flex-start'}}>
            <FormGroup >
              <FormControlLabel
                control={<Checkbox checked={this.state.ongeval} onChange={(event, checked) => this.handleChbxChange("ongeval", event, checked)} value="ongeval" /> }
                label="Ongeval"
              />
            </FormGroup>
            <FormGroup row className={!this.state.ongeval ? "ongeval hidden": "flex"}>
              <FormControlLabel
                control={<Checkbox checked={this.state.metStootb}  color="primary" onChange={(event, checked) => this.handleChbxChange("metStootb", event, checked)} value="metStootb" /> }
                label="Met. stootb."
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.betStootb} color="primary"  onChange={(event, checked) => this.handleChbxChange("betStootb", event, checked)} value="betStootb" /> }
                label="Bet. stootb"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.signalisatie2}  color="primary" onChange={(event, checked) => this.handleChbxChange("signalisatie2", event, checked)} value="signalisatie2" /> }
                label="Signalisatie"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.electrischeInstallatie} color="primary" onChange={(event, checked) => this.handleChbxChange("electrischeInstallatie", event, checked)} value="electrischeInstallatie" /> }
                label="Elektrische Installatie"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.boomStruikOngeval} color="primary" onChange={(event, checked) => this.handleChbxChange("boomStruikOngeval", event, checked)} value="boomStruikOngeval" /> }
                label="Boom/Struik"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.kunstwerkOngeval} color="primary" onChange={(event, checked) => this.handleChbxChange("kunstwerkOngeval", event, checked)} value="kunstwerkOngeval" /> }
                label="Kunstwerk."
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.bermTalut} color="primary" onChange={(event, checked) => this.handleChbxChange("bermTalut", event, checked)} value="bermTalut" /> }
                label="Berm/talut"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.wegdek}  color="primary" onChange={(event, checked) => this.handleChbxChange("wegdek", event, checked)} value="wegdek" /> }
                label="Wegdek"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.bijstandBrand} color="primary" onChange={(event, checked) => this.handleChbxChange("bijstandBrand", event, checked)} value="bijstandBrand" /> }
                label="Bijstand brand"
              />
            </FormGroup>
          </div>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={this.state.ladingverlies} onChange={(event, checked) => this.handleChbxChange("ladingverlies", event, checked)} value="ladingverlies" /> }
              label="Ladingverlies"
            />
            {this.state.ladingverlies ? <TextField
              floatingLabelStyle={floatingLabelColor}
              style={{marginTop: '-28px'}}
              floatingLabelText="Omschrijving Ladingverlies"
              name="ladingverliesTekst"
              onChange={this.handleChange}
              value={this.state.ladingverliesTekst}
            /> : <div></div>}
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={this.state.bodemverontreiniging} onChange={(event, checked) => this.handleChbxChange("bodemverontreiniging", event, checked)} value="bodemverontreiniging" /> }
              label="Bodemverontreiniging"
            />
            {this.state.bodemverontreiniging ? <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Omschrijving Bodemverontreiniging"
              name="bodemverontreinigingTekst"
              style={{marginTop: '-28px'}}
              onChange={this.handleChange}
              value={this.state.bodemverontreinigingTekst}
            /> : <div></div>}
          </FormGroup>
        </div>
        </section>
        <section id="vaststellingen_view" className={(this.state.mode==='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
        { (ExpansionPanelOpen) ?
          <div style={{position: 'absolute', top:'11px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.setAsView}>
              Resultaat
            </Button>
          </div> : "" }
          <VaststellingView  ficheId={this.props.ficheId} key={'vaststelling_'+this.props.ficheId}/>
        </section>
      </div>
    );
  }
}
Vaststelling.propTypes = {
};

export default  withStyles(styles)(Vaststelling);