// react imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// imports
import Paper from 'material-ui/Paper';
import Button from '@material-ui/core/Button';

import Send from '@material-ui/icons/Send';
import Save from '@material-ui/icons/Save';

import Provinciaal from './Components/view/Provinciaal';
import Vaststelling from './Components/edit/vaststelling';
import Beslissing from './Components/edit/Beslissing';
import Tijdstippen from './Components/edit/Tijdstippen';
import Bijkomende from './Components/edit/Bijkomende';

//styles

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing.unit,
    fontSize: 'small'
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
class EditFiche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenProvinciaal: true,
      OpenVaststelling: true,
      OpenBeslissing: true,
      OpenTijdstippen: true,
      OpenBijkomende: true
    };
  }
  showHide = (type, expanded) => {
    console.log(type+' '+expanded)
  }

  render() {
    const { ficheId, classes } = this.props;
    if(!this.props.loading){
      const {vaststelling_, beslissing_, tijdstippen_,bijkomende_ }= this.state;
      return (
       <Paper id="content" style={{padding:"1px 15px 15px 15px"}} >
          <div style={{position: "absolute", right: "0px",  top:"15px", display:"flex"}}>
            <Button variant="outlined" color="primary" size="small" className={classes.button}>
              Bewaren
              <Save className={classes.rightIcon} />
            </Button>
            <Button variant="outlined" color="secondary" size="small" className={classes.button}>
              Doorsturen
              <Send className={classes.rightIcon} />
            </Button>
          </div>           
            <ExpansionPanel key="Provinciaal" defaultExpanded={true} onChange={this.showHide.bind(this, 'Provinciaal')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="title">Gegevens Provinciaal Coördinator</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography variant="body2"><Provinciaal ficheId={ficheId} key={'provinciale_'+ficheId} ExpansionPanelOpen={this.state.OpenProvinciaal} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel key="Vaststelling" defaultExpanded={true} onChange={this.showHide.bind(this, 'Vaststelling')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="title">Vaststelling</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body2"><Vaststelling classNameProp={vaststelling_}  ficheId={ficheId} key={'vaststelling_'+ficheId} ExpansionPanelOpen={this.state.OpenVaststelling} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded={true}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="title">Beslissing oproep bijstand</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography variant="body2"><Beslissing  classNameProp={beslissing_}  ficheId={ficheId} key={'beslissing_'+ficheId} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded={true}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="title">Tijdstippen + Middelen uitvoering</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography variant="body2"><Tijdstippen classNameProp={tijdstippen_}  ficheId={ficheId} key={'tijdstippen_'+ficheId} /></Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel defaultExpanded={true}>
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
EditFiche.propTypes = {
  fiche: PropTypes.object,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  docsReadyYet: PropTypes.bool,
  imageFiles: PropTypes.array,
};

export default  withStyles(styles)(EditFiche);
