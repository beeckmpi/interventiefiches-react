// react imports
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment-es6';
import PropTypes from 'prop-types';

import {areIntlLocalesSupported, intl} from 'intl-locales-supported';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';

const itemStyle = {fontSize:"smaller", margin:'15px 0px 6px 0px'};
const floatingLabelColor = { color: "#757575"}
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '170pt',
    marginBottom: '8pt'
  },
};
//locales
export default class Provinciaal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, 
      fiche: []
    };
  }
  
  componentDidMount = () => {
    return fetch('http://localhost:3333/fiche/'+this.props.ficheId, {
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
  render() {
    const { fiche } = this.state;
    
    return (
      <section id="provinciaal" className={this.props.className}>
        <div style={{display:"inline-block"}}>
          De oproep kwam binnen op <strong>{moment(fiche.opDatum).format('DD-MM-YYYY')} {moment(fiche.oproep).format('HH:MM')}</strong> en werd ontvangen door <strong>{fiche.provinciaalCoordinator}</strong>.
        </div>
        <div>
          <div style={itemStyle}>Bijkomende informatie:</div>
          {fiche.bijkomendeInformatie}
        </div>
        <div>
          <div style={itemStyle}>District:</div>
          <strong> {fiche.district}</strong>
        </div>
        <div>
          <div style={itemStyle}>Doorgegeven aan:</div>
          <strong>{fiche.doorgegevenAan}</strong>
        </div>
        <div>
          <div style={itemStyle}>Oproep door:</div>
          {fiche.oproepDoor=="Andere" &&
            <div><strong>{fiche.andereOproep}</strong></div>
          }
          {fiche.oproepDoor!="Andere" &&
            <div><strong>{fiche.oproepDoor}</strong></div>
          }
        </div>
        <div>
          <div style={itemStyle}>Melding:</div>
          {fiche.melding=="Andere" &&
            <div><strong>{fiche.andereMelding}</strong></div>
          }
          {fiche.melding!="Andere" &&
            <div><strong>{fiche.melding}</strong></div>
          }
        </div>
        <div>
          <div style={itemStyle}>Locatie:</div>
          {fiche.weg!="" &&
            <div>Op de <strong>{fiche.weg}</strong> in <strong>{fiche.grondgebied}</strong> richting <strong>{fiche.rijrichting}</strong></div>
          }
          {fiche.gewestweg!="" &&
            <div>Op de <strong>{fiche.gewestweg}</strong>  richting <strong>{fiche.richting}</strong></div>
          }
          {fiche.kmPuntVan!="" &&
            <div>Van kilometerpunt <strong>{fiche.kmPuntVan}</strong> tot kilometerpunt <strong>{fiche.kmPuntTot}</strong></div>
          }
          {fiche.straat!="" &&
            <div>In de <strong>{fiche.straat}</strong>, nummer <strong>{fiche.huisnummer}</strong></div>
          }
        </div>
        {fiche.opmerkingBereikbaarheid!="" &&
          <div>
            <div style={itemStyle}>Opmerking bereikbaarheid:</div>
            <div>{fiche.opmerkingBereikbaarheid}</div>
          </div>
        }
      </section>
    );
  }
}
