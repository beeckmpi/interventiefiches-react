import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


//Material-ui components
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import HomeIcon from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import './index.css';
import App from './App';
import DrawerLayOut from './ui/layout/DrawerLayOut';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render( <Router>
        <MuiThemeProvider>
          <section>
            <DrawerLayOut />            
          </section>
        </MuiThemeProvider>
      </Router>, document.getElementById('root'));
registerServiceWorker();
