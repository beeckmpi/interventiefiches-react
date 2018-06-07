// react imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment-es6';
import PropTypes from 'prop-types';
import classnames from 'classnames';


// material-ui imports
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';

const paperStyle = {position:"relative",  padding:"5px 15px", width: "95%", margin: '0 0', minWidth:'550px', display: 'flex'};
const avatar = {
    backgroundColor: red[500],
    marginTop: '5px'
};
export default class FicheRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    
  }
  goToFiche = () => {
    this.props.onHeaderClick(this.props.value);
  }
  render() {
    const { fiche, classes } = this.props;
    const { redirect } = this.state
    
    return (
      
      <Paper key={fiche.id} onClick={this.goToFiche} style={paperStyle}>
        <div style={{width: '60px', paddingTop:'11px'}} >
          <Avatar aria-label="Recipe" style={avatar}>
            {fiche.provinciaalCoordinator.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div style={{width: '420px'}}>
          <Typography style={{fontWeight: 'bold'}}>{fiche.provinciaalCoordinator}</Typography>
          <div><Typography>{fiche.melding}: Te district {fiche.district}</Typography></div>
          <Typography>Aangemaakt op {moment(fiche.createdAt).format('DD-MM-YYYY HH:mm')}</Typography>
          </div>
      </Paper>
    );
  }
}
