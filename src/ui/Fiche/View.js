// react imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// imports
import Paper from 'material-ui/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import PDF from '@material-ui/icons/PictureAsPdf';
import Edit from '@material-ui/icons/Edit';

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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    fontSize: 'x-small'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    fontSize: 'small'
  },
  iconSmall: {
    fontSize: 20,
  },
});

class ViewFiche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeAll: false,
      expandedProvinciaal: true,
      expandedVaststelling: false,
      expandedBeslissing: false,
      expandedTijdstippen: false,
      expandedBijkomende: false
    };
  }
  
  changeAll = () => {
    if(!this.state.changeAll) {
      this.setState({changeAll: true, expandedProvinciaal: true, expandedVaststelling: true, expandedBeslissing: true, expandedTijdstippen: true, expandedBijkomende: true});
    } else {
      this.setState({changeAll: false, expandedProvinciaal: false, expandedVaststelling: false, expandedBeslissing: false, expandedTijdstippen: false, expandedBijkomende: false});
    }
  }
  goToEditFiche = () => {
    this.props.onEditClick(this.props.value);   
  }
  changeExpansion = (type) => {
    switch(type){
      case 'Provinciaal':
        this.setState({expandedProvinciaal: !this.state.expandedProvinciaal});
        break;
      case 'Vaststelling':
        this.setState({expandedVaststelling: !this.state.expandedVaststelling});
        break;
      case 'Beslissing':
        this.setState({expandedBeslissing: !this.state.expandedBeslissing});
        break;
      case 'Tijdstippen':
        this.setState({expandedTijdstippen: !this.state.expandedTijdstippen});
        break;
      case 'Bijkomende':
        this.setState({expandedBijkomende: !this.state.expandedBijkomende});
        break;
      default: 
        this.setState({expandedBijkomende: !this.state.expandedBijkomende}); 
      break;
    }
  }
  render() {
    const { ficheId, classes} = this.props;
    const {expandedProvinciaal, expandedVaststelling, expandedBeslissing, expandedTijdstippen, expandedBijkomende} = this.state;
  
    if(!this.props.loading && !this.props.personeelLoading){
      const {  vaststelling_, beslissing_, tijdstippen_, bijkomende_}= this.state;
        
      return (          
        <Paper id="content" style={{padding:"1px 15px 15px 15px"}} >
          <div style={{position: "absolute", right: "0px",  top:"15px", display:"flex"}}>
            <Button variant="contained" color="primary" size="small" className={classes.button}>
              PDF
              <PDF className={classes.rightIcon} />
            </Button>
            {this.state.changeAll ? <Button variant="outlined" color="secondary" size="small" onClick={this.changeAll} className={classes.button}>Alles dichtschuiven <ArrowUpward className={classes.rightIcon} /> </Button> : <Button variant="outlined" size="small" color="secondary" className={classes.button} onClick={this.changeAll}>Alles openschuiven <ArrowDownward className={classes.rightIcon} /> </Button> }
           <Button variant="outlined" color="primary" size="small" onClick={this.goToEditFiche.bind(this)} className={classes.button}>Bewerken <Edit className={classes.rightIcon} /> </Button>
          </div>           
            <ExpansionPanel defaultExpanded={true} expanded={expandedProvinciaal} style={{}} onClick={this.changeExpansion.bind(this, 'Provinciaal')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="title">Gegevens Provinciaal Coördinator</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography variant="body2"><Provinciaal ficheId={ficheId} key={'provinciale_'+ficheId} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expandedVaststelling} onClick={this.changeExpansion.bind(this, 'Vaststelling')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="title">Vaststelling</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body2"><Vaststelling classNameProp={vaststelling_}  ficheId={ficheId} key={'vaststelling_'+ficheId} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expandedBeslissing} onClick={this.changeExpansion.bind(this, 'Beslissing')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="title">Beslissing oproep bijstand</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography variant="body2"><Beslissing  classNameProp={beslissing_}  ficheId={ficheId} key={'beslissing_'+ficheId} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expandedTijdstippen} onClick={this.changeExpansion.bind(this, 'Tijdstippen')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="title">Tijdstippen + Middelen uitvoering</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography variant="body2"><Tijdstippen classNameProp={tijdstippen_}  ficheId={ficheId} key={'tijdstippen_'+ficheId} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel expanded={expandedBijkomende} onClick={this.changeExpansion.bind(this, 'Bijkomende')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="title">Bijkomende details vaststellingen</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography variant="body2"><Bijkomende classNameProp={bijkomende_}  ficheId={ficheId} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Paper>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}
ViewFiche.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewFiche);
