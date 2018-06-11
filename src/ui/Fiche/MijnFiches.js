// react imports
import React, { Component } from 'react';

import FicheRow from './Components/FicheRow';
import ViewFiche from './View';
import KeyboardBackIcon from '@material-ui/icons/ArrowBack';

export default class MijnFiches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiches: [],
      activeId: 5,
      activeClassFiches: 'containerFiches',
      activeClassView: 'containerView'
    };
  }
 
  componentDidMount = () => {
    return fetch('http://localhost:3333/fiches/mine', {
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
    this.setState({ activeId:id, activeClassView: 'containerView active', activeClassFiches: 'containerFiches active'});
    this.renderFiche();
  }
  renderFiches = () => {
    console.log(this.state.fiches)
    return this.state.fiches.map((fiche) => (
      <FicheRow key={fiche.id} fiche={fiche} onHeaderClick={this.goToFiche.bind(this, fiche.id)} />
    ));
  }
  renderFiche = () => {
    return <ViewFiche ficheId={this.state.activeId} />
  }
  render() {    
    return (
      <section>
        <div className={this.state.activeClassFiches}>        
          {this.renderFiches()}
        </div>
        <div className={this.state.activeClassView}>  
          <div className='arrowBack'><KeyboardBackIcon onClick={this.goBack} /></div>
          {this.renderFiche()}
        </div>
      </section>
    );
  }
}



