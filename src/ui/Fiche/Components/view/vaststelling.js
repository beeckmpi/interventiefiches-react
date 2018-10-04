// react imports
import React, { Component } from 'react';

import moment from 'moment-es6';
import FetchC from '../../../../methods/fetch';
const textStyle = {whiteSpace: 'pre-line'};

export default class VaststellingView extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      fiche: []
    };
  }
  async componentDidMount() {    
    FetchC.getComponent('vaststelling', this.props.ficheId).then((data) => {this.setState({fiche: data[0]})});
  }
  render() {
    const { fiche } = this.state;
    return (
      <div>
          <p>Aanwezig van <strong>{moment(fiche.uurTerplaatse).format('HH:MM')}</strong> tot <strong>{moment(fiche.uurEinde).format('HH:MM')}</strong></p>
          <p>De volgende diensten waren aanwezig:</p>
          <ul>
            {fiche.federalePolitie? <li><strong>Federale Politie</strong></li> : ""}
            {fiche.brandweer? <li><strong>Brandweer</strong></li> : ""}
            {fiche.fast? <li><strong>FAST / Takeldienst</strong></li> : ""}
            {fiche.civieleBescherming? <li><strong>Civiele Bescherming</strong></li> : ""}
            {fiche.andereAanwezig? <li><strong>{fiche.andereAanwezig}</strong></li> : ""}
          </ul>
          <p>Opmerkingen:</p>
          <p style={textStyle}><strong>{fiche.opmerkingen}</strong></p>
          <p>Er waren de volgende incidenten / schadegevallen:</p>
          <ul>
            {fiche.put? <li><strong>Put in rijbaan</strong></li> : ""}
            {fiche.signalisatie? <li><strong>Signalisatie</strong></li> : ""}
            {fiche.boomStruikIncident? <li><strong>Boom/Struik</strong></li> : ""}
            {fiche.kunstwerk? <li><strong>Kunstwerk</strong></li> : ""}
            {fiche.verzakking? <li><strong>Verzakking</strong></li> : ""}
            {fiche.opstuiking? <li><strong>Opstuikingk</strong></li> : ""}
            {fiche.vangrail? <li><strong>Met. vangrail</strong></li> : ""}
            {fiche.andereIncident? <li><strong>{fiche.andereIncident}</strong></li> : ""}
            {fiche.stormschade ? <li><strong>Stormschade: {fiche.stormschadeTekst}</strong></li> : ''}
            {fiche.wateroverlast ? <li><strong>Wateroverlast: {fiche.wateroverlastTekst}</strong></li> : ''}
          </ul>
          {fiche.ongeval ? <div><p>Er was een ongeval</p>
            <ul>
              {fiche.metStootb? <li><strong>Met. stootb.</strong></li> : ""}
              {fiche.betStootb? <li><strong>Bet. stootb.</strong></li> : ""}
              {fiche.signalisatie2? <li><strong>Signalisatie</strong></li> : ""}
              {fiche.electrischeInstallatie? <li><strong>Elektrische Installatie</strong></li> : ""}
              {fiche.boomStruikOngeval? <li><strong>Boom/struik</strong></li> : ""}
              {fiche.kunstwerkOngeval? <li><strong>Kunstwerk.</strong></li> : ""}
              {fiche.bermTalut? <li><strong>Berm/talut</strong></li> : ""}
              {fiche.wegdek? <li><strong>Wegdek</strong></li> : ""}
              {fiche.bijstandBrand ? <li><strong>Bijstand brand</strong></li> : ''}
              {fiche.andereOngeval? <li><strong>Andere: {fiche.andereOngevalTekst}</strong></li> : ""}
              {fiche.ladingverlies ? <li><strong>Ladingverlies: {fiche.ladingverliesTekst}</strong></li> : ''}
              {fiche.bodemverontreiniging ? <li><strong>Bodemverontreiniging: {fiche.bodemverontreinigingTekst}</strong></li> : ''}
            </ul>
          </div> : '' }
      </div>
    );
  }
}
