// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router'
import moment from 'moment-es6';
import PropTypes from 'prop-types';
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px'
}
const tableStyle = {
  width: '100%'
}
// material-ui imports
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Fiches } from '../../../api/fiches/fiches';
import { Personeelsleden } from '../../../api/personeelsleden/personeelsleden';
import FicheRow from '../../components/FicheRow';

class OntvangenFiches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
    };
  }
  goToFiche = () => {
    console.log("alert");
    /*const location = {
      pathname: 'fiches/view/'+_id
    }*/
  }
  renderFiches = () => {
    return this.props.fiches.map((fiche) => (
      <FicheRow key={fiche._id} fiche={fiche} />
    ));
  }
  render() {
    console.log(this.props);
    const {deselectOnClickaway, enableSelectAll, fixedFooter, fixedHeader, multiSelectable, selectable, showCheckboxes, showRowHover, stripedRows} = this.state;
    return (
      <div className="container" style={{margin:"10px 0px 40px 230px"}}>
        <h3 style={{color:"#fff", marginLeft:"30px"}}>Ontvangen Fiches</h3>
        <Paper id="content">
          <Table style={tableStyle} fixedHeader={fixedHeader} fixedFooter={fixedFooter} selectable={selectable} multiSelectable={multiSelectable}>
            <TableHeader displaySelectAll={showCheckboxes} adjustForCheckbox={showCheckboxes} enableSelectAll={enableSelectAll}>
              <TableRow>
                <TableHeaderColumn>Fichenummer</TableHeaderColumn>
                <TableHeaderColumn>Datum</TableHeaderColumn>
                <TableHeaderColumn>Districtsnummer</TableHeaderColumn>
                <TableHeaderColumn>P. coördinator</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={showCheckboxes} deselectOnClickaway={deselectOnClickaway} showRowHover={showRowHover} stripedRows={stripedRows}>
              {this.renderFiches()}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
OntvangenFiches.propTypes = {
  fiches: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('fiches');
  Meteor.subscribe('personeelsleden');
  return {
    fiches: Fiches.find({}, { sort: { createdAt: -1 } }).fetch(),
    personeelsleden: Personeelsleden.find({}, {sort: {naam: -1}}).fetch(),
    currentUser: Meteor.user(),
  };
}, OntvangenFiches);
