// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-es6';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
// imports
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import PDF from 'material-ui/svg-icons/image/picture-as-pdf';
import Edit from 'material-ui/svg-icons/image/edit';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//styles

import Provinciaal from './Components/view/Provinciaal';
import Vaststelling from './Components/view/vaststelling';
import Beslissing from './Components/view/beslissing';
import Tijdstippen from './Components/view/tijdstippen';
import Bijkomende from './Components/view/bijkomende';
import Bijlages from './Components/view/bijlages';
//styles
const itemStyle = {fontSize:"smaller", margin:'15px 0px 6px 0px'};
const arrowDownStyles = {height:"50px", position:"absolute", "right": "5px", "top": "8px", width:"40px"};
const paperStyle = {position:"relative", transition: "max-height 0.6s ease-in-out", padding:"5px 15px", width: "95%", margin: '20px auto'};
const closedStyle = {height: "25pt"}
const openStyle = {height: "auto"}

export default class ViewFiche extends React.Component {
  constructor(props) {
    super(props);
    const data = {};
    this.state = {
      changeAll: false
    };
  }
  changeAll = () => {
    
  }
  render() {
    
    const { loading, fiche, imageFiles, match, ficheId} = this.props;
  
    if(!this.props.loading && !this.props.personeelLoading){
      const { provinciaal_, provinciaalC, vaststelling_, vaststellingC, beslissingC, beslissing_, tijdstippenC, tijdstippen_, bijkomendeC, bijkomende_, bijlagesC, bijlages_, afmeldingC, afmelding_ }= this.state;
      const edit_link = "/fiches/edit/"+ ficheId;
      
      return (
          
        <Paper id="content" style={{padding:"1px 15px 15px 15px"}} >
          <div style={{position: "absolute", right: "37px", top:"15px", display:"flex"}}>
            <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} primary={true} label="PDF" icon={<PDF />} />
            {this.state.changeAll ? <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} secondary={true} label="Alles dichtschuiven" onClick={this.changeAll} icon={<ArrowUpward />} /> : <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} secondary={true} label="Alles openschuiven" onClick={this.changeAll} icon={<ArrowDownward />} /> }
            <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} containerElement={<Link to={edit_link} />} primary={true} label="Bewerken" icon={<Edit />} />
          </div>
          <h3 style={{color:"#fff", marginLeft:"30px"}}>Fiche {loading ? fiche.data.fichenummer : ' ' }</h3>
           
            <ExpansionPanel defaultExpanded="true">
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3><Typography>Gegeven Provinciaal Coördinator</Typography></h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Provinciaal className={provinciaal_} ficheId={ficheId} key={'provinciale_'+ficheId} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3><Typography>Vaststelling</Typography></h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Vaststelling classNameProp={vaststelling_}  ficheId={ficheId} key={'vaststelling_'+ficheId} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3><Typography>Beslissing oproep bijstand</Typography></h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Beslissing  classNameProp={beslissing_}  ficheId={ficheId} key={'beslissing_'+ficheId} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3><Typography>Tijdstippen + Middelen uitvoering</Typography></h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
               <Tijdstippen classNameProp={tijdstippen_}  ficheId={ficheId} key={'tijdstippen_'+ficheId} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3><Typography>Bijkomende details vaststellingen</Typography></h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
               <Bijkomende classNameProp={bijkomende_}  ficheId={ficheId} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Paper>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}

