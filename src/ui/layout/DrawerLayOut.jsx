import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ArchiveIcon from '@material-ui/icons/Archive';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import SignIn from '../users/AuthPageSignIn';
import Join from '../users/AuthPageJoin';
import ToevoegenFiche from '../Fiche/Toevoegen';
import MijnFiches from '../Fiche/MijnFiches';
import ViewFiche from '../Fiche/View';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});
const Auth = () => {
  var isAuthenticated = false;

  if (sessionStorage.getItem('JWT')!==null) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  return isAuthenticated;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/aanmelden",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class MiniDrawer extends React.Component {
  state = {
    open: false,
  };
  state = {
    redirectToReferrer: false
  };

  login = () => {
    Auth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  

  render() {
    const { classes, theme } = this.props;
    

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              <Link to="/" className="title">Interventiefiches</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
          
        >
         
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon  /> : <ChevronLeftIcon  />}
            </IconButton>
          </div>
          <Divider />
          <List style={{paddingLeft: "0px"}}>
            <ListItem button  component={Link} to="/fiches/Toevoegen">
              <ListItemIcon >
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText primary="Toevoegen" />
            </ListItem>
            <ListItem button  component={Link} to="/fiches/mine" >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Mijn Fiches" />
            </ListItem>
            <ListItem button  component={Link} to="/ontvangenFiches" >
              <ListItemIcon>
                <MoveToInboxIcon />
              </ListItemIcon>
              <ListItemText primary="Ontvangen Fiches" />
            </ListItem>
            <ListItem button  component={Link} to="/alleFiches" >
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Alle Fiches" />
            </ListItem> 
          </List>
        </Drawer>
        <div style={{position:'relative', display:'plex', width:'100%'}}>
          <div className={classes.toolbar} />
          <div style={{display: 'flex',}}>
          <PrivateRoute exact path="/" component={ToevoegenFiche}/>
          <Route exact path="/registeren" component={Join} />
          <Route exact path="/aanmelden" component={SignIn} />
          <PrivateRoute  exact path="/fiches/Toevoegen" component={ToevoegenFiche}/>
          <PrivateRoute  exact path="/fiches/mine" component={MijnFiches}  />
          <PrivateRoute  exact path="/fiches/view/:id" component={ViewFiche}  />
          </div>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);