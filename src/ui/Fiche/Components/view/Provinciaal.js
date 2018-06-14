// react imports
import React, { Component } from 'react';
import moment from 'moment-es6';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
const itemStyle = {fontSize:"smaller", margin:'15px 0px 6px 0px'};
//locales
export default class Provinciaal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, 
      fiche: [],
      lidwoord: '',
      loading: 'hidden',
      contentP: 'visible'
    };
  }
  
  componentDidMount = () => {
    this.setState({loading: 'visible', contentP: 'hidden'})
    return fetch('/fiche/'+this.props.ficheId, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWT'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let lidwoord = ''
      if (responseJson.oproepDoor === 'Politie'){
        lidwoord = 'de '
      } else if (responseJson.oproepDoor === 'VTC') {
        lidwoord = 'het '
      }
      const self = this;
      setTimeout(function() {
        self.setState({fiche: responseJson, lidwoord: lidwoord, loading: 'hidden', contentP: 'visible'});
    }, 250);
      
    })
    .catch((error) =>{
      console.error(error);
      
    });   
  }
  render() {
    const { fiche, lidwoord, loading, contentP } = this.state;
    
    return (
      <section id="provinciaal" className={this.props.className}>
        <div id="loading" className={loading}><CircularProgress /></div>
        <div id="contentP" className={contentP}>
          <div style={{display:"inline-block"}}>
          <Typography> De oproep van<strong>&nbsp;{lidwoord}
            {fiche.oproepDoor==="Andere" &&
              <span>{fiche.andereOproep}</span>
            }
            {fiche.oproepDoor!=="Andere" &&
              <span>{fiche.oproepDoor}</span>
            }
            </strong> kwam binnen op <strong>{moment(fiche.opDatum).format('DD-MM-YYYY')} {moment(fiche.oproep).format('HH:MM')}</strong> en werd ontvangen door <strong>{fiche.provinciaalCoordinator}</strong>.</Typography>
          </div>
          <div>
            <Typography>De 
            {fiche.melding==="Andere" &&
              <strong> {fiche.andereMelding} </strong>
            }
            {fiche.melding!=="Andere" &&
              <strong> {fiche.melding} </strong>
            }
            vind plaats in het district <strong> {fiche.district}</strong>, de informatie werd doorgegeven aan <strong>{fiche.doorgegevenAan}</strong>({fiche.GSM}). Met deze bijkomstige informatie:</Typography>
          </div>
          <div>
            <br/>
            <Typography><i>{fiche.bijkomendeInformatie}</i></Typography>
          </div>
          <div>
            <Typography><div style={itemStyle}>Locatie:</div>
            {fiche.weg!=="" &&
              <div>Op de <strong>{fiche.weg}</strong> in <strong>{fiche.grondgebied}</strong> richting <strong>{fiche.rijrichting}</strong></div>
            }
            {fiche.gewestweg!=="" &&
              <div>Op de <strong>{fiche.gewestweg}</strong>  richting <strong>{fiche.richting}</strong></div>
            }
            {fiche.kmPuntVan!=="" &&
              <div>Van kilometerpunt <strong>{fiche.kmPuntVan}</strong> tot kilometerpunt <strong>{fiche.kmPuntTot}</strong></div>
            }
            {fiche.straat!=="" &&
              <div>In de <strong>{fiche.straat}</strong>, nummer <strong>{fiche.huisnummer}</strong></div>
            }
            </Typography></div>
          {fiche.opmerkingBereikbaarheid!=="" &&
            <div><br />
            <Typography><i>{fiche.opmerkingBereikbaarheid}</i></Typography>
            </div>
          }
        </div>
      </section>
    );
  }
}
