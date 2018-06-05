import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//Material-ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
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
