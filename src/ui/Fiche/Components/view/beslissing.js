// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-es6';
import PropTypes from 'prop-types';

import {areIntlLocalesSupported, intl} from 'intl-locales-supported';
import VaststellingVIew from '../view/vaststelling';

const itemStyle = {margin:'15px 0px 6px 0px'};
export default class BeslissingView extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      fiche: []
    };
  }
  componentDidMount = () => {
    return fetch('http://localhost:3333/fiches/component/beslissing/'+this.props.ficheId, {
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
  renderKennisgaveAnderItems(){
    return Object.keys(this.state.fiche.kennisgaveAndere).map((key, bool) => (
      this.state.fiche.kennisgaveAndere[key] ? <li key={key}><strong>{key}</strong></li> : ''
    ));
  }
  render() {
    const { data } = this.props;
    const { fiche } = this.state;
    return (
      <div>
        {fiche.regie ?
            <p>De regie werd opgeroepen op <strong>{moment(fiche.uurOproepRegie).format('HH:MM')}</strong>.</p>
            : '' }
        {fiche.aannemer ?
          <p>De aannemer (<strong>{fiche.naamAannemer}</strong>)  werd opgeroepen op <strong>{moment(fiche.uurOproepAannemer).format('HH:MM')}</strong>.</p>
        : '' }
        {fiche.signalisatie ?
            <p>De signalisatie werd opgeroepen op <strong>{moment(fiche.uurOproepSignalisatie).format('HH:MM')}</strong>, de kost van de signalisatie zit bij <strong>{fiche.BotsersBestek ? 'het botsers bestek': ''} {fiche.signalisatieAannemer ? 'de aannemer': ''}</strong>.</p>
            : '' }
        {fiche.bodemdeskundige ?
          <p>De bodemdeskundige (<strong>{fiche.bodemdeskundige}</strong>)  werd opgeroepen op <strong>{moment(fiche.uurOproepAannemer).format('HH:MM')}</strong>.</p>
        : '' }
        <p>De volgende diensten werden opgeroepen:</p>
        <ul>
          {fiche.politie ? <li><strong>Politie</strong></li> : ''}
          {fiche.brandweer ? <li><strong>Brandweer</strong></li> : ''}
          {fiche.civieleBescherming ? <li><strong>Civiele Bescherming</strong></li> : ''}
          {fiche.fast ? <li><strong>FAST/Takeldiensten</strong></li> : ''}
        </ul>
        <p>De volgende diensten werden in kennis gesteld:</p>
        <ul>
          {fiche.VVC ? <li><strong>VVC</strong></li> : ''}
          {fiche.VTC ? <li><strong>VTC</strong></li> : ''}
          {fiche.kennisgavePolitie ? <li><strong>Politie</strong></li> : ''}
          {fiche.kennisgaveAndere ? <li><strong>{fiche.kennisgaveAndere}</strong></li> : ''}
          
        </ul>
      </div>
    );
  }
}
