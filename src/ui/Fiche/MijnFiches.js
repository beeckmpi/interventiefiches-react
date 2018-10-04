// react imports
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import FicheRow from './Components/FicheRow';
import ViewFiche from './View';
import EditFiche from './Bewerken';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackIcon from '@material-ui/icons/ArrowBack';
const styles = theme => ({
  button: {
    margin: '8px 8px 14px 8px'
  },
});
class MijnFiches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiches: [],
      activeId: 1,
      activeClassFiches: 'containerFiches',
      activeClassView: 'containerView',
      mode: 'view'
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
      this.setState({fiches: responseJson, activeId: responseJson[0]['id']});
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
      <section className={'gridContainer'}>
        <div className={this.state.activeClassFiches}>        
          {this.renderFiches()}
        </div>
        <div className={this.state.activeClassView}>  
        <IconButton className={'arrowBack ' + classes.button} aria-label="Terug"><KeyboardBackIcon onClick={this.goBack} /></IconButton>
          {(this.state.mode === 'view') ? this.renderFiche() : this.renderEditFiche() }
        </div>
      </section>
    );
  }
}
MijnFiches.propTypes = {
};

export default  withStyles(styles)(MijnFiches);



