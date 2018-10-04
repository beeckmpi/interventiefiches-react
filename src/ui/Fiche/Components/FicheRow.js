// react imports
import React, { Component } from 'react';
import moment from 'moment-es6';


// material-ui imports
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';

const paperStyle = {position:"relative",  padding:"5px 15px", width:'100%', margin: '0 0', display: 'flex'};
const avatar = {
    backgroundColor: red[500],
    marginTop: '5px'
};
export default class FicheRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      activeClass: 'ficheRow'
    };       
  }
  componentDidMount(){
    if (this.props.active === this.props.fiche.id){
      this.setState({activeClass: 'ficheRow activeClass'});
    }
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.active !== this.props.fiche.id){
      this.setState({activeClass: 'ficheRow'});
    } else {
      this.setState({activeClass: 'ficheRow activeClass'});
    }
  }
  goToFiche = () => {
    this.props.onHeaderClick(this.props.value);   
  }
  render() {
    const { fiche } = this.props
    const { activeClass } = this.state
   
    return (
      
      <Paper key={fiche.id} onClick={this.goToFiche.bind(this)} style={paperStyle} className={activeClass}>
        <div style={{width: '60px', paddingTop:'11px'}} >
          <Avatar aria-label="Recipe" style={avatar}>
            {fiche.provinciaalCoordinator.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div style={{width: 'auto'}}>
          <Typography style={{fontWeight: 'bold'}}>{fiche.provinciaalCoordinator}</Typography>
          <div><Typography>{fiche.melding}: Te district {fiche.district}</Typography></div>
          <Typography>Aangemaakt op {moment(fiche.createdAt).format('DD-MM-YYYY HH:mm')}</Typography>
          </div>
      </Paper>
    );
  }
}
