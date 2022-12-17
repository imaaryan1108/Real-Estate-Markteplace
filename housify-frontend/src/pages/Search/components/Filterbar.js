import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Icon } from '@material-ui/core';
import Filters from './Filters';
import { useSelector } from 'react-redux';

function Filterbar() {
  const [filterState, setFilterState] = useState(false);
  const generalState = useSelector((state) => state.general);

  const handleFilterButtonClick = () => {
    setFilterState(!filterState);
  };
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    filterContainer: {
      width: '100%',
      height: filterState
        ? `${theme.typography.pxToVw(60)}`
        : `${theme.typography.pxToVw(30)}`,
      padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(
        25
      )}`,
      display: 'flex',
      flexDirection: 'row',
      borderRadius: `${theme.typography.pxToRem(24)}`,
      backgroundColor: theme.palette.primaryBlue,
      marginBottom: `${theme.typography.pxToRem(40)}`,
      transition: '0.3s ease-in-out',
    },
    searchBar: {
      flexGrow: 1,
      backgroundColor: theme.palette.dark.text,
      borderRadius: `${theme.typography.pxToRem(24)}`,
      height: `${theme.typography.pxToVw(20)}`,
      margin: `${theme.typography.pxToRem(0)} ${theme.typography.pxToRem(25)}`,
    },
    icons: {
      color: theme.palette.dark.text,
      transform: 'scale(1.3)',
      marginTop: `${theme.typography.pxToRem(5)}`,
      margin: `${theme.typography.pxToRem(7)}`,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    filters: {
      marginTop: `${theme.typography.pxToRem(-95)}`,
      transition: '1s ease-out',
    },
    placeholder: {
      margin: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(20)}`,
      fontWeight: 'bold',
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <div className={classes.searchBar}>
          <div className={classes.placeholder}>
            {' '}
            {generalState.selectedLocation}
          </div>
        </div>
        <Icon className={classes.icons} onClick={handleFilterButtonClick}>
          <FilterListIcon />
        </Icon>
      </div>
      {filterState && (
        <div className={classes.filters}>
          <Filters />
        </div>
      )}
    </div>
  );
}

export default Filterbar;
