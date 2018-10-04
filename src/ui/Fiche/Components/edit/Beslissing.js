import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import BeslissingView from '../view/beslissing';

const floatingLabelColor = {
  color: "#757575"
}
const styles = theme => ({
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '70pw',
    marginBottom: '8pt'
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
class Beslissing extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      aannemer: false,
      bodemdeskundige: false,
      BotsersBestek: false,
      brandweer: false,
      civieleBescherming: false,
      fast: false,
      kennisgaveAndere: {},
      kennisgaveAndereTekst: "",
      kennisgavePolitie: false,
      naamAannemer:'',
      naamBodemdeskundig:'',
      mode: "edit",
      open:false,
      politie: false,
      redirect: false,
      regie: false,
      eigen_personeel: false,
      signalisatie: false,
      signalisatieAannemer: false,
      uurOproepAannemer: null,
      uurOproepBodemdeskundige: null,
      uurOproepRegie: null,
      uurOproepSignalisatie: null,
      VVC: false,
      VTC: false,
      fiche: []
    };
  }
  componentDidMount = () => {
    return fetch('/fiches/component/beslissing/'+this.props.ficheId, {
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
  KennisgaveAndereOptieToevoegen = () => {
   this.setState({open: true});
  };

  handleAdd = (event) => {
    this.setState({open: false, kennisgaveAndere: {...this.state.kennisgaveAndere, [this.state.kennisgaveAndereTekst]: true}, kennisgaveAndereTekst: ""});
  };

  renderKennisgaveAnderItems(){
    return Object.keys(this.state.kennisgaveAndere).map((key, bool) => (
      <FormControlLabel
        control={<Checkbox key={key}  checked={this.state.kennisgaveAndere[key]} onChange={(event, checked) => this.handleChbxChangeAndere(key, event, checked)} value={this.state.kennisgaveAndere[key]} /> }
        label={key}
      />
      
    ));
  }
  handleClose = () => {
    this.setState({open: false}, () => {
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
  handleChbxChangeAndere = (id, event, checked) => {
    this.setState({kennisgaveAndere: {[id]:this.state.kennisgaveAndere}}, () => {
      this.saveThis();
    });
  }
  setToView = () => {
    this.setState({mode: 'view'}, () => {
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
    console.log(dataC)
    return fetch('/fiches/component/beslissing/'+this.props.ficheId, {
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
        this.setState({fiche: responseJson[0]});
    })
    .catch((error) =>{
      console.error(error);
    }); 
  }
  setAsView = () => {
    this.setState({mode: 'edit'});
  }

  render() {
    const {fiche, classes } = this.props;
    const {naamAannemer, naamBodemdeskundig} = this.state;
    
    return (
      <div>
        <section id="beslissing"  className={(this.state.mode==='edit')? 'show': 'hidden'}>
        <div style={{position: 'absolute', top:'10px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.setAsView}>
              Resultaat
            </Button>
          </div>
          <div style={{fontSize: "0.83em", fontWeight: "bold"}}>Oproep aan</div>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={this.state.regie} onChange={(event, checked) => this.handleChbxChange("regie", event, checked)} value="Regie" /> }
              label="Regie"
            />
            <div className={!this.state.regie ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <FormControlLabel
                control={<Checkbox checked={this.state.eigen_personeel} color="primary" onChange={(event, checked) => this.handleChbxChange("eigen_personeel", event, checked)} value="Eigen_persooneel" /> }
                label="Eigen personeel"
              />            
              <TimePicker floatingLabelStyle={floatingLabelColor} style={{marginTop: '-28px'}} value={this.state.uurOproepRegie} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepRegie", event, date)} hintText="Uur oproep" name="uurOproepRegie" floatingLabelText="Uur oproep" />             
            </div>
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={this.state.aannemer} onChange={(event, checked) => this.handleChbxChange("aannemer", event, checked)} value="aannemer" /> }
              label="Aannemer"
            />
            <div className={!this.state.aannemer ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
                <TimePicker floatingLabelStyle={floatingLabelColor} style={{marginTop: '-28px'}}  value={this.state.uurOproepAannemer} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepAannemer", event, date)} hintText="Uur oproep" name="uurOproepAannemer" floatingLabelText="Uur oproep" />
                <TextField
                  floatingLabelStyle={floatingLabelColor}
                  floatingLabelText="Naam aannemer"
                  name="naamAannemer"
                  onChange={this.handleChange}
                  value={this.state.naamAannemer}
                  style={{marginTop: '-28px'}} 
                />
            </div>
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={this.state.signalisatie} onChange={(event, checked) => this.handleChbxChange("signalisatie", event, checked)} value="Signalisatie" /> }
              label="Signalisatie"
            />
            <div className={!this.state.signalisatie ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <TimePicker floatingLabelStyle={floatingLabelColor} style={{marginTop: '-28px'}}  value={this.state.uurOproepSignalisatie} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepSignalisatie", event, date)} hintText="Uur oproep" name="uurOproepSignalisatie" floatingLabelText="Uur oproep" />
              <FormControlLabel
                control={<Checkbox checked={this.state.BotsersBestek} color="primary" onChange={(event, checked) => this.handleChbxChange("BotsersBestek", event, checked)} value="BotsersBestek" /> }
                label="Botsers Bestek"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.signalisatieAannemer} color="primary" onChange={(event, checked) => this.handleChbxChange("signalisatieAannemer", event, checked)} value="signalisatieAannemer" /> }
                label="Aannemer"
              />              
            </div>
          </FormGroup>
          <FormGroup row>
          <FormControlLabel
              control={<Checkbox checked={this.state.bodemdeskundige} onChange={(event, checked) => this.handleChbxChange("bodemdeskundige", event, checked)} value="bodemdeskundige" /> }
              label="Bodemdeskundige"
            />
            <div className={!this.state.bodemdeskundige ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <TimePicker floatingLabelStyle={floatingLabelColor} style={{marginTop: '-28px'}} value={this.state.uurOproepBodemdeskundige} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepBodemdeskundige", event, date)} hintText="Uur oproep" name="uurOproepBodemdeskundige" floatingLabelText="Uur oproep" />
              <TextField
                floatingLabelStyle={floatingLabelColor}
                floatingLabelText="Naam Bodemdeskundige"
                name="naamBodemdeskundig"
                ref={input => this.data.naamBodemdeskundig = input}
                value={naamBodemdeskundig}
                style={{marginTop: '-28px'}}
              />
            </div>
           </FormGroup>
           <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={this.state.politie} onChange={(event, checked) => this.handleChbxChange("politie", event, checked)} value="politie" /> }
              label="Politie"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.brandweer} onChange={(event, checked) => this.handleChbxChange("brandweer", event, checked)} value="brandweer" /> }
              label="Brandweer"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.civieleBescherming} onChange={(event, checked) => this.handleChbxChange("civieleBescherming", event, checked)} value="civieleBescherming" /> }
              label="Civiele Bescherming"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.fast} onChange={(event, checked) => this.handleChbxChange("fast", event, checked)} value="fast" /> }
              label="FAST/Takeldiensten"
            />
          </FormGroup>
          <h5>Kennisgave Aan</h5>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={this.state.VVC} onChange={(event, checked) => this.handleChbxChange("VVC", event, checked)} value="VVC" /> }
              label="VVC"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.VTC} onChange={(event, checked) => this.handleChbxChange("VTC", event, checked)} value="VTC" /> }
              label="VTC"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.kennisgavePolitie} onChange={(event, checked) => this.handleChbxChange("kennisgavePolitie", event, checked)} value="kennisgavePolitie" /> }
              label="Politie"
            />
            {this.renderKennisgaveAnderItems()}
            <Button variant="outlined" className={classes.button} color="secondary" onClick={this.KennisgaveAndereOptieToevoegen}>
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
                  name="kennisgaveAndereTekst"
                  value={this.state.kennisgaveAndereTekst}
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
            
        </section>
        <section id="beslissingen_view" className={(this.state.mode==='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
          <div style={{position: 'absolute', top:'10px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.setAsView}>
              Resultaat
            </Button>
          </div>
          <BeslissingView ficheId={this.props.ficheId} key={'beslissing_'+this.props.ficheId} />
        </section>
      </div>
    );
  }
}
Beslissing.propTypes = {
};

export default  withStyles(styles)(Beslissing);