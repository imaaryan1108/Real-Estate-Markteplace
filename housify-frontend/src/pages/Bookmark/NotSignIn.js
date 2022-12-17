import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

function NotSignIn() {
  const themeState = useSelector((state) => state.navbar);

  const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: themeState.isDark
        ? theme.palette.dark.bgc
        : theme.palette.light.bgc,
      padding: `${theme.typography.pxToRem(44)} ${theme.typography.pxToRem(
        44
      )}`,
      overflow: 'hidden',
    },
    mainHeader: {
      color: themeState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,
      fontSize: theme.typography.pxToRem(60),
      fontWeight: 'bold',
    },
    innerHeader: {
      color: theme.palette.primaryBlue,
      fontSize: theme.typography.pxToRem(60),
      fontWeight: 'bold',
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <div className={classes.container}>
        {' '}
        <span className={classes.mainHeader}> Please Sign In</span> <br />
        <span className={classes.innerHeader}>
          to save your favorite properties to Bookmark
        </span>
      </div>
    </div>
  );
}

export default NotSignIn;
