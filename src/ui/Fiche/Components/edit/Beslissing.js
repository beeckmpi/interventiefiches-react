// react imports
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';

import BeslissingView from '../view/beslissing';

const floatingLabelColor = {
  color: "#757575"
}
const styles = theme => ({
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '170pt',
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
    let d = new Date();
    let n = d.getTime();
    this.data = {};
    this.state = {
      aannemer: false,
      bodemdeskundige: false,
      BotsersBestek: false,
      brandweer: false,
      civieleBescherming: false,
      fast: false,
      kennisgaveAndere: false,
      kennisgaveAndereTekst: "",
      kennisgavePolitie: false,
      naamAannemer:'',
      naamBodemdeskundig:'',
      mode: "edit",
      open:false,
      politie: false,
      redirect: false,
      regie: false,
      signalisatie: false,
      signalisatieAannemer: false,
      uurOproepAannemer: n,
      uurOproepBodemdeskundige: n,
      uurOproepRegie: n,
      uurOproepSignalisatie: n,
      VVC: false,
      VTC: false,
    };
  }
  KennisgaveAndereOptieToevoegen = () => {
   this.setState({open: true});
  };

  handleAdd = (event) => {
    this.setState({open: false, kennisgaveAndere: {...this.state.kennisgaveAndere, [this.state.kennisgaveAndereTekst]: true}, kennisgaveAndereTekst: ""});
  };

  renderKennisgaveAnderItems(){
    return Object.keys(this.state.kennisgaveAndere).map((key, bool) => (
      <Checkbox key={key} label={key} checked={this.state.kennisgaveAndere[key]} onCheck={(event, checked) => this.handleChbxChangeAndere(key, event, checked)} style={styles.checkbox} />
    ));
  }
  handleClose = () => {
   this.setState({open: false});
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    this.saveThis();
  }
  handleChangeTime = (id, event, date) => {
    this.setState({[id]: date});
    this.saveThis();
  }
  handleChbxChange = (id, event, checked) => {
    this.setState({[id]: checked});
    this.saveThis();
  }
  handleChbxChangeAndere = (id, event, checked) => {
    this.setState({kennisgaveAndere: {[id]:this.state.kennisgaveAndere}});
    this.saveThis();
  }
  setToView = () => {
    this.setState({mode: 'view'});
    this.saveThis();
  }
  saveThis = () => {    
    const {data} = this;
    let dataInputs = {};
    for (var key in data) {
      if("input" in data[key]){
        dataInputs[data[key]["input"]["name"]] = data[key]["input"]["value"];
      }
    };
    console.log('test');
    console.log(this.props.ficheId);
    //const dataC = Object.assign({}, dataInputs, state);

  }
  setAsView = () => {
    this.setState({mode: 'edit'});
  }

  render() {
    const {fiche, classes } = this.props;
    const {naamAannemer, naamBodemdeskundig} = this.state;
    const actions = [
      <FlatButton
        label="Annuleren"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Toevoegen"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAdd}
      />,
    ];
    return (
      <div>
        <section id="beslissing"  className={(this.state.mode==='edit')? 'show': 'hidden'}>
        <div style={{position: 'absolute', top:'10px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.setAsView}>
              Resultaat
            </Button>
          </div>
          <div style={{fontSize: "0.83em", fontWeight: "bold"}}>Oproep aan</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Eigen personeel" checked={this.state.regie} onCheck={(event, checked) => this.handleChbxChange("regie", event, checked)} style={styles.checkbox} />
            <div className={!this.state.regie ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurOproepRegie} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepRegie", event, date)} hintText="Uur oproep" name="uurOproepRegie" floatingLabelText="Uur oproep" />
             
            </div>
          </div>
          <div >
            <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
              <Checkbox label="Aannemer" checked={this.state.aannemer} onCheck={(event, checked) => this.handleChbxChange("aannemer", event, checked)} style={styles.checkbox} />
              <div className={!this.state.aannemer ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
                <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurOproepAannemer} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepAannemer", event, date)} hintText="Uur oproep" name="uurOproepAannemer" floatingLabelText="Uur oproep" />
                <TextField
                  floatingLabelStyle={floatingLabelColor}
                  floatingLabelText="Naam aannemer"
                  name="naamAannemer"
                  ref={input => this.data.naamAannemer = input}
                  value={naamAannemer}
                />
              </div>
            </div>
          </div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Signalisatie" checked={this.state.signalisatie} onCheck={(event, checked) => this.handleChbxChange("signalisatie", event, checked)} style={styles.checkbox} />
            <div className={!this.state.signalisatie ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurOproepSignalisatie} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepSignalisatie", event, date)} hintText="Uur oproep" name="uurOproepSignalisatie" floatingLabelText="Uur oproep" />
              <Checkbox label="Botsers Bestek" checked={this.state.BotsersBestek} onCheck={(event, checked) => this.handleChbxChange("BotsersBestek", event, checked)} style={styles.checkbox} />
              <Checkbox label="Aannemer" checked={this.state.signalisatieAannemer} onCheck={(event, checked) => this.handleChbxChange("signalisatieAannemer", event, checked)} style={styles.checkbox} />
            </div>
          </div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Bodemdeskundige" checked={this.state.bodemdeskundige} onCheck={(event, checked) => this.handleChbxChange("bodemdeskundige", event, checked)} style={styles.checkbox} />
            <div className={!this.state.bodemdeskundige ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurOproepBodemdeskundige} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepBodemdeskundige", event, date)} hintText="Uur oproep" name="uurOproepBodemdeskundige" floatingLabelText="Uur oproep" />
              <TextField
                floatingLabelStyle={floatingLabelColor}
                floatingLabelText="Naam Bodemdeskundige"
                name="naamBodemdeskundig"
                ref={input => this.data.naamBodemdeskundig = input}
                value={naamBodemdeskundig}
              />
            </div>
          </div>
          <div>
            <Checkbox label="Politie" checked={this.state.politie} onCheck={(event, checked) => this.handleChbxChange("politie", event, checked)} style={styles.checkbox} />
            <Checkbox label="Brandweer" checked={this.state.brandweer} onCheck={(event, checked) => this.handleChbxChange("brandweer", event, checked)} style={styles.checkbox} />
            <Checkbox label="Civiele Bescherming" checked={this.state.civieleBescherming} onCheck={(event, checked) => this.handleChbxChange("civieleBescherming", event, checked)} style={styles.checkbox} />
            <Checkbox label="FAST/Takeldiensten" checked={this.state.fast} onCheck={(event, checked) => this.handleChbxChange("fast", event, checked)} style={styles.checkbox} />
          </div>
          <h5>Kennisgave Aan</h5>
            <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
              <Checkbox label="VVC" checked={this.state.VVC} onCheck={(event, checked) => this.handleChbxChange("VVC", event, checked)} style={styles.checkbox} />
              <Checkbox label="VTC" checked={this.state.VTC} onCheck={(event, checked) => this.handleChbxChange("VTC", event, checked)} style={styles.checkbox} />
              <Checkbox label="Politie" checked={this.state.kennisgavePolitie} onCheck={(event, checked) => this.handleChbxChange("kennisgavePolitie", event, checked)} style={styles.checkbox} />
              {this.renderKennisgaveAnderItems()}
              <RaisedButton label="Andere toevoegen" className={this.props.classNameProp} primary={true} onClick={this.KennisgaveAndereOptieToevoegen} />
            </div>
            <Dialog
              title="Andere categorie toevoegen"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <TextField
                floatingLabelStyle={floatingLabelColor}
                floatingLabelText="Andere categorie"
                name="kennisgaveAndereTekst"
                value={this.state.kennisgaveAndereTekst}
                onChange={this.handleChange}
              />
            </Dialog>
        </section>
        <section id="beslissingen_view" className={(this.state.mode==='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
          <div style={{position: 'absolute', top:'10px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.setAsView}>
              Resultaat
            </Button>
          </div>
          <BeslissingView fiche={fiche} />
        </section>
      </div>
    );
  }
}
Beslissing.propTypes = {
};

export default  withStyles(styles)(Beslissing);