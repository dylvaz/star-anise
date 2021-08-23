import { Avatar, Link } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Placeholder
        </Typography>
        {user ? (
          <>
            <Avatar src={user.avatar} className={classes.avatar} />
            <Link color="inherit" variant="body2" underline="none" href="/logout">Logout</Link>
          </>
        ) : (
          <Link color="inherit" variant="body2" underline="none" href="/login">Login</Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
