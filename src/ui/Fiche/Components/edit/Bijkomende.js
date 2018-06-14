// react imports
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';

const floatingLabelColor = {
  color: "#757575"
}
const styles = theme => ({
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
const itemStyle = {margin:'15px 0px 6px 0px', whiteSpace: 'pre-line'};
const textStyle = {whiteSpace: 'pre-line'};
class Bijkomende extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      bijkomende: '',
      mode: 'edit',
      fiche: []
    };
  }
  componentDidMount = () => {
    return fetch('/fiches/component/bijkomende/'+this.props.ficheId, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWT'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({fiche: responseJson});
    })
    .catch((error) =>{
      console.error(error);
      
    });   
  }
  componentWillMount  = () => {
    if(this.state.fiche.mode === 'view'){
      this.setState({'bijkomendeView': 'show', 'bijkomendeEdit':'hidden'});
    } else {
      this.setState({'bijkomendeView': 'hidden', 'bijkomendeEdit':'show'});
    }
  }
  handleChange = (event) => this.setState({"bijkomende": event.target.value});
  saveThis = () => {
    this.setState({'mode': 'view'})
    console.log(this.state.bijkomende);

  }
  setAsView = () => {
    this.setState({mode: 'edit'});
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <section id="Bijkomende" className={(this.state.mode==='edit')? 'show': 'hidden'}>
          <div style={{position: 'absolute', top:'9px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.saveThis}>
              Resultaat
            </Button>
          </div>
          <TextField
            floatingLabelText="Bijkomende Details Vaststellingen - Acties - Uitvoering - ..."
            multiLine={true}
            rows={3}
            name="Opmerkingen"
            style={{minWidth:"512px", maxWidth:"80%"}}
            value={this.state.bijkomende}
            onChange={this.handleChange}
            floatingLabelStyle={floatingLabelColor}
          />
        </section>
        <section id="Bijkomende_view" className={(this.state.mode==='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
          <div style={{position: 'absolute', top:'10px', right:"60px", zIndex:"1005"}} className={this.props.classNameProp}>
            <Button color="secondary" size="small" className={classes.button} onClick={this.setAsView}>
              Resultaat
            </Button>
          </div>
          <div style={itemStyle}>Bijkomende Details Vaststellingen - Acties - Uitvoering - ...</div>
          <div style={textStyle}><strong>{this.state.bijkomende}</strong></div>
        </section>
      </div>
    );
  }
}
Bijkomende.propTypes = {
};

export default  withStyles(styles)(Bijkomende);