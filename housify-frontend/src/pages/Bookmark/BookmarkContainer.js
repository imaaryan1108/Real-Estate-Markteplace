import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Navbar from '../../common/components/Navbar/Navbar';
import Cards from '../Search/components/Cards';
import SearchNav from '../Search/components/SearchNav';
import BookmarksCards from './BookmarksCards';
import NotSignIn from './NotSignIn';

function BookmarkContainer() {
  const themeState = useSelector((state) => state.navbar);
  const userState = useSelector((state) => state.user);

  const user_id = userState.userId;
  console.log(user_id);
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
        <title>Bookmark Results</title>
      </Helmet>
      <Navbar />
      {user_id ? <BookmarksCards param={user_id} /> : <NotSignIn />}
    </div>
  );
}

export default BookmarkContainer;
