import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Cards from './components/Cards';
import SearchNav from './components/SearchNav';

function SearchContainer() {
  const themeState = useSelector((state) => state.navbar);
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      backgroundColor: themeState.isDark
        ? theme.palette.dark.bgc
        : theme.palette.light.bgc,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>Search Results</title>
      </Helmet>
      <SearchNav />
      <Cards />
    </div>
  );
}

export default SearchContainer;
