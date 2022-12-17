import {
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveTab,
  setSelectedLocation,
} from '../../../actions/generalActions';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { searchConst } from '../../../utils/constants';
import { MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Search() {
  const [locationPopoverIsOpen, setLocationPopoverIsOpen] = useState(false);
  const [pricePopoverIsOpen, setPricePopoverIsOpen] = useState(false);
  const [locationAnchor, setLocationAnchor] = useState(null);
  const [priceAnchor, setPriceAnchor] = useState(null);

  const generalState = useSelector((state) => state.general);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    if (newValue !== null) setActiveTab(newValue, dispatch);
  };

  const handleLocationDropdown = (e) => {
    if (locationAnchor !== null) {
      setLocationAnchor(null);
      setLocationPopoverIsOpen(!locationPopoverIsOpen);
    } else {
      setLocationAnchor(e.currentTarget);
      setLocationPopoverIsOpen(!locationPopoverIsOpen);
    }
  };

  const handleLocationSelect = (e) => {
    setSelectedLocation(e.target.innerText, dispatch);
    setLocationAnchor(null);
    setLocationPopoverIsOpen(false);
  };

  useEffect(() => {
    if (locationAnchor === null) setLocationPopoverIsOpen((prev) => !prev);
  }, [locationAnchor]);

  useEffect(() => {
    if (priceAnchor === null) setPricePopoverIsOpen((prev) => !prev);
  }, [priceAnchor]);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minWidth: theme.typography.pxToRem(1000),
      maxWidth: theme.typography.pxToRem(1000),
      minHeight: theme.typography.pxToRem(50),
      maxHeight: theme.typography.pxToRem(50),
    },
    toggleButtonRoot: {
      background: `${theme.palette.light.bgc} !important`,
      color: theme.palette.primaryBlue,
      borderRadius: `${theme.typography.pxToRem(40)} ${theme.typography.pxToRem(
        40
      )} 0 0`,
      minWidth: theme.typography.pxToRem(100),
    },
    toggleButtonSelected: {
      backgroundColor: `${theme.palette.primaryBlue} !important`,
      color: `${theme.palette.common.white} !important`,
    },
    searchboxContainer: {
      display: 'grid',
      gridTemplateColumns: '0.6fr 0.2fr 0.2fr',
      alignItems: 'center',
      backgroundColor: theme.palette.primaryBlue,
      boxShadow: '15px, 21px, 50px #00000069',
      maxWidth: theme.typography.pxToRem(600),
      padding: theme.typography.pxToRem(10),
      borderRadius: `0 ${theme.typography.pxToRem(
        45
      )} ${theme.typography.pxToRem(45)} ${theme.typography.pxToRem(45)}`,
      minHeight: theme.typography.pxToRem(100),
      maxHeight: theme.typography.pxToRem(100),
    },
    filter: {
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    buttons: {
      color: theme.palette.common.white,
      margin: `0 ${theme.typography.pxToRem(5)}`,
    },
    divider: {
      background: theme.palette.common.white,
      height: 42,
      width: 2,
      opacity: 0.6,
    },
    placeholder: {
      fontWeight: 100,
      letterSpacing: theme.spacing(0.4),
      color: theme.palette.common.white,
    },
    link: {
      margin: theme.spacing(1),
      color: theme.palette.dark.text,
      transform: 'scale(2)',
    },
    popover: {
      backgroundColor: theme.palette.primaryBlue,
      color: theme.palette.common.white,
    },
    popoverHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: theme.typography.pxToRem(250),
      padding: theme.typography.pxToRem(10),
      borderBottom: `1px solid ${theme.palette.light.bgc}`,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <ToggleButtonGroup
          classes={{ grouped: classes.toggleButtonRoot }}
          exclusive
          value={generalState.activeTab}
          onChange={handleChange}
          variant="scrollable"
        >
          <ToggleButton
            value={0}
            classes={{ selected: classes.toggleButtonSelected }}
          >
            <h3> {searchConst.BUY} </h3>
          </ToggleButton>
          <ToggleButton
            value={1}
            classes={{ selected: classes.toggleButtonSelected }}
          >
            <h3>{searchConst.RENT}</h3>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className={classes.searchboxContainer}>
        <div className={classes.filter}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2> {searchConst.LOCATION} </h2>
            <p className={classes.placeholder}>
              {generalState.selectedLocation === ''
                ? searchConst.LOCATION_PLACEHOLDER
                : generalState.selectedLocation.toUpperCase()}
            </p>
          </div>
          {locationPopoverIsOpen ? (
            <IconButton
              className={classes.buttons}
              onClick={handleLocationDropdown}
            >
              <ArrowDownIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.buttons}
              onClick={handleLocationDropdown}
            >
              <ArrowUpIcon />
            </IconButton>
          )}
        </div>
        <Divider
          className={classes.divider}
          component="ol"
          orientation="vertical"
        />

        <Link to="/search">
          <div className={classes.link}>
            <SearchIcon />
          </div>
        </Link>
      </div>
      <Popover
        open={Boolean(locationAnchor)}
        anchorEl={locationAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={() => setLocationAnchor(null)}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.popover}>
          <div className={classes.popoverHeader}>
            <h3>Location</h3>
            <IconButton
              size="small"
              onClick={handleLocationDropdown}
              className={classes.buttons}
            >
              <CloseIcon size="small" />
            </IconButton>
          </div>
          <MenuItem onClick={handleLocationSelect}>Raipur</MenuItem>
          <MenuItem onClick={handleLocationSelect}>Ranchi</MenuItem>
          <MenuItem onClick={handleLocationSelect}>Bhubaneswar</MenuItem>
          <MenuItem onClick={handleLocationSelect}>Bhopal</MenuItem>
          <MenuItem onClick={handleLocationSelect}>Mumbai</MenuItem>
          <MenuItem onClick={handleLocationSelect}>Delhi</MenuItem>
        </div>
      </Popover>
    </div>
  );
}

export default Search;
