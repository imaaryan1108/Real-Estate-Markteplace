import { Icon, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Filterbar from './Filterbar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function SearchNav() {
  const navbarState = useSelector((state) => state.navbar);
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    navContainer: {
      backgroundColor: navbarState.isDark
        ? theme.palette.dark.bgc
        : theme.palette.light.bgc,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(
        30
      )}`,
    },
    logoContainer: {
      padding: `${theme.typography.pxToVh(8)} ${theme.typography.pxToVh(28)}`,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    logoImage: {
      width: theme.typography.pxToVh(100),
    },
    filterBar: {
      flexGrow: 1,
    },
    favorites: {
      display: 'flex',
      backgroundColor: theme.palette.primaryBlue,
      height: `${theme.typography.pxToVw(30)}`,
      borderRadius: `${theme.typography.pxToRem(136)}`,
      padding: `${theme.typography.pxToRem(15)} ${theme.typography.pxToRem(0)}`,
      margin: `${theme.typography.pxToVh(0)} ${theme.typography.pxToVh(28)}`,
      textDecoration: 'none',
    },
    favoriteIcon: {
      color: `${theme.palette.dark.text}`,
      transform: 'scale(1.2)',
      margin: `${theme.typography.pxToRem(0)} ${theme.typography.pxToRem(15)}`,
    },
    text: {
      color: `${theme.palette.dark.text}`,
      paddingRight: `${theme.typography.pxToRem(20)} `,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.navContainer}>
      <div className={classes.logoContainer}>
        {!navbarState.isDark ? (
          <svg
            onClick={() => history.push('/')}
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="33"
            viewBox="0 0 98 33"
          >
            <text
              id="HOUSIFY"
              transform="translate(0 25)"
              fill="#2064eb"
              font-size="24"
              font-family="Poppins-ExtraBold, Poppins"
              font-weight="800"
            >
              <tspan x="0" y="0">
                H
              </tspan>
              <tspan
                y="0"
                fill="#161414"
                font-family="Poppins-Light, Poppins"
                font-weight="300"
              >
                OUSIFY
              </tspan>
            </text>
          </svg>
        ) : (
          <svg
            onClick={() => history.push('/')}
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="33"
            viewBox="0 0 98 33"
          >
            <text
              id="HOUSIFY"
              transform="translate(0 25)"
              fill="#2064eb"
              font-size="24"
              font-family="Poppins-ExtraBold, Poppins"
              font-weight="800"
            >
              <tspan x="0" y="0">
                H
              </tspan>
              <tspan
                y="0"
                fill="#efeaea"
                font-family="Poppins-Light, Poppins"
                font-weight="300"
              >
                OUSIFY
              </tspan>
            </text>
          </svg>
        )}
      </div>

      <div className={classes.filterBar}>
        <Filterbar />
      </div>

      <Link className={classes.favorites} to="/bookmark">
        <Icon className={classes.favoriteIcon}>
          <FavoriteIcon />
        </Icon>
        <p className={classes.text}>FAVORITES</p>
      </Link>
    </div>
  );
}

export default SearchNav;
