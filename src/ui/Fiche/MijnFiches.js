// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FicheRow from './Components/FicheRow';
import ViewFiche from './View';

export default class MijnFiches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiches: [],
      activeId: 5
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
      this.setState({fiches: responseJson});
    })
    .catch((error) =>{
      console.error(error);
      
    });   
    
  }
  goToFiche = (id) => {    
    this.setState({ activeId:id});
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
        <div className="container" style={{minWidth: '35%', position:'absolute', left:'0px', top:'65px', bottom:'0px', overflowY:'auto'}}>        
          {this.renderFiches()}
        </div>
        <div className="container" style={{minWidth: '60%', position:'absolute', left:'40%', top:'65px', bottom:'0px', overflowY:'auto', borderLeft: '1px solid #DDD'}}>  
          {this.renderFiche()}
        </div>
      </section>
    );
  }
}



