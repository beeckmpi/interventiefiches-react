// react imports
import React, { Component } from 'react';
import moment from 'moment-es6';

const textStyle = {whiteSpace: 'pre-line'};
export default class TijdstippenView extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      fiche: []
    };
  }
  componentDidMount = () => {
    return fetch('http://localhost:3333/fiches/component/tijdstippen/'+this.props.ficheId, {
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
  renderAndereItems(){
    return Object.keys(this.state.fiche.andere).map((key, bool) => (
      this.props.fiche.andere[key] ? <li key={key}><strong>{key}</strong></li> : ''
    ));
  }
  render() {
    const { fiche } = this.state;
    return (
      <div>
        {fiche.vanRegie ?
            <div>
              De {(fiche.regieArbeider === 1) ? <strong>arbeider</strong> : <strong>{fiche.regieArbeider} arbeiders</strong>} van de regie waren ter plaatse van <strong>{moment(fiche.vanRegie).format('HH:MM')}</strong> tot <strong>{moment(fiche.totRegie).format('HH:MM')}</strong>.
            </div>
        : '' }
        {fiche.vanAannemer ?
            <div>
              De aannemer was ter plaatse van <strong>{moment(fiche.vanAannemer).format('HH:MM')}</strong> tot <strong>{moment(fiche.totAanemer).format('HH:MM')}</strong> onder toezicht van <strong>{fiche.regieToezichter}</strong>.
            </div>
        : '' }
        {fiche.vanSignalisatie ?
            <div>
              De signalisatie was ter plaatse van <strong>{moment(fiche.vanSignalisatie).format('HH:MM')}</strong> tot <strong>{moment(fiche.totSignalisatie).format('HH:MM')}</strong> er {(fiche.aantalBotsers === 1) ? <strong>was 1 botser</strong> : <strong> waren {fiche.aantalBotsers} botsers</strong>}.
            </div>
        : '' }
        {fiche.vanDeskundige ?
            <div>
              De deskundige <strong>({fiche.naamDeskundige})</strong> was ter plaatse van <strong>{moment(fiche.vanDeskundige).format('HH:MM')}</strong> tot <strong>{moment(fiche.totDeskundige).format('HH:MM')}</strong>.
            </div>
        : '' }
        <p>De volgende actie(s) werd(en) ondernomen:</p>
        <ul>
          {fiche.afgraving ? <li><strong>Afgraving</strong></li> : ''}
          {fiche.ontstoppen ? <li><strong>Ontstoppen riolering</strong></li> : ''}
          {fiche.reinigen ? <li><strong>Reinigen wegdek</strong></li> : ''}
          {fiche.vaStootbanden ? <li><strong>V. / A. stootbanden</strong></li> : ''}
          {fiche.vullenPut ? <li><strong>Vullen put</strong></li> : ''}
          {fiche.andereIncident ? <li><strong>{fiche.andereIncident}</strong></li> : ''}
        </ul>
        <div>Opmerkingen:</div>
        <div style={textStyle}><strong>{fiche.opmerkingen}</strong></div>
      </div>
    );
  }
}
