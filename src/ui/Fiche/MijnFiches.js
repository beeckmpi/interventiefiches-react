// react imports
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import FicheRow from './Components/FicheRow';
import ViewFiche from './View';
import EditFiche from './Bewerken';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
  button: {
    margin: '8px 8px 14px 8px'
  },
});
const paperStyle = {position:"relative",  padding:"35px 15px", width: "95%", margin: '0 0', minWidth:'550px', display: 'flex'};
class MijnFiches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiches: [],
      activeId: 1,
      activeClassFiches: 'containerFiches',
      activeClassView: 'containerView',
      mode: 'view',
      emptyFiches: true
    };
  }
 
  componentDidMount = () => {
    return fetch('/fiches/mine', {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWT'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (Array.isArray(responseJson)){
        this.setState({fiches: responseJson, activeId: responseJson[0]['id'], emptyFiches:false});
      } 
      
    })
    .catch((error) =>{
      console.error(error);
      
    });   
    
  }
  goBack = () => {
    this.setState({ activeClassView: 'containerView', activeClassFiches: 'containerFiches'});
  }
  goToFiche = (id) => {    
    this.setState({ activeId:id, activeClassView: 'containerView active', activeClassFiches: 'containerFiches active', mode:'view'});    
  }
  goToEditFiche = (id) => {
    this.setState({mode:'edit'});    
  }
  renderFiches = () => {
    return this.state.fiches.map((fiche) => (
      <FicheRow key={fiche.id} fiche={fiche} onHeaderClick={this.goToFiche.bind(this, fiche.id)} active={this.state.activeId} />
    ));
  }
  renderFiche = () => {
    return <ViewFiche ficheId={this.state.activeId} onEditClick={this.goToEditFiche.bind(this, this.state.activeId)} />
  }
  renderEditFiche = () => {
    return <EditFiche ficheId={this.state.activeId} />
  }
  render() {    
    const { classes } = this.props;
    return (
<<<<<<< HEAD
      <section className={'gridContainer'}>
        <div className={this.state.activeClassFiches}>        
          {this.renderFiches()}
=======
      <section>
        <div className={this.state.activeClassFiches}>      
          {(!this.state.emptyFiches) ? this.renderFiches() : <Paper style={paperStyle}>Er zijn geen fiches beschikbaar</Paper>}          
>>>>>>> f3ac44cee1e8b904cf545a970acef1c2a502b18b
        </div>
        {(!this.state.emptyFiches) ?
        <div className={this.state.activeClassView}>  
<<<<<<< HEAD
        <IconButton className={'arrowBack ' + classes.button} aria-label="Terug"><KeyboardBackIcon onClick={this.goBack} /></IconButton>
          {(this.state.mode === 'view') ? this.renderFiche() : this.renderEditFiche() }
=======
        <IconButton className='arrowBack' className={classes.button} aria-label="Terug"><KeyboardBackIcon onClick={this.goBack} /></IconButton>
         {(this.state.mode === 'view') ? this.renderFiche() : this.renderEditFiche() }
>>>>>>> f3ac44cee1e8b904cf545a970acef1c2a502b18b
        </div>
        : '' }
      </section>
    );
  }
}
MijnFiches.propTypes = {
};

export default  withStyles(styles)(MijnFiches);



