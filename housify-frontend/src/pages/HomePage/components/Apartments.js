import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BlueButton from '../../../common/components/StyledButtons/BlueButton';
import { apartmentsConst } from '../../../utils/constants';
import ApartmentCard from './ApartmentCard';
import hearts from '../../../assets/Icon ionic-md-heart-half.svg';
import home from '../../../assets/Icon awesome-home.svg';
import hands from '../../../assets/Icon awesome-hands-helping.svg';
import { withoutAuthInstance } from '../../../utils/axios/axios';

function Apartments() {
  const themeState = useSelector((state) => state.navbar);

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    let url = '/houses';

    console.log(url);

    withoutAuthInstance
      .get(url)
      .then((response) => {
        setHouses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      marginTop: `${theme.typography.pxToRem(200)}`,
    },
    innerHeader: {
      color: theme.palette.primaryBlue,
    },
    descriptionText: {
      minWidth: theme.typography.pxToVw(430),
      maxWidth: theme.typography.pxToVw(430),
      margin: ` ${theme.typography.pxToRem(12)} 0 `,
      fontSize: theme.typography.pxToRem(22),
      color: themeState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,
      opacity: '0.6',
      fontStyle: 'italic',
    },
    apartmentsGrid: {
      paddingTop: `${theme.typography.pxToRem(80)}`,
      paddingBottom: '2%',
      marginLeft: '10%',
      marginRight: '10%',
    },
    imgs: {
      backgroundColor: `${theme.palette.primaryBlue}`,
      borderRadius: `${theme.typography.pxToRem(200)}`,
      transform: 'scale(0.8)',
      padding: `${theme.typography.pxToRem(10)}`,
      width: `${theme.typography.pxToRem(244)}`,
      height: `${theme.typography.pxToRem(244)}`,
    },
    serviceText: {
      color: themeState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,
      fontSize: theme.typography.pxToRem(34),
      textAlign: 'center',
      marginLeft: theme.typography.pxToRem(-120),
    },
    serviceHeader: {
      color: themeState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,
      fontSize: theme.typography.pxToRem(60),
      fontWeight: 'bold',
      marginTop: `${theme.typography.pxToRem(100)}`,
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Grid
        className={classes.container}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={6} direction="column" justifyContent="space-between">
          <p className={classes.mainHeader}>
            TOP RATED <span className={classes.innerHeader}>APARTMENTS</span>
            <br />
          </p>

          <p className={classes.descriptionText}>
            with over 1 thousand homes for sale
          </p>
        </Grid>

        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          direction="row"
          justify="center"
          className={classes.apartmentsGrid}
        >
          {houses &&
            houses.slice(0, 8).map((house) => {
              return (
                <Grid item xs={12} md={4} spacing={2}>
                  <ApartmentCard
                    price={house.house_properties.housePrice}
                    locality={house.house_location.locality}
                    city={house.house_location.city}
                    image={house.house_properties.houseImage}
                  />
                </Grid>
              );
            })}
        </Grid>

        {/* */}
        <Grid
          item
          container
          alignItems="center"
          direction="row"
          justifyContent="center"
          className={classes.apartmentsGrid}
        ></Grid>

        <Grid
          item
          container
          alignItems="center"
          direction="row"
          justifyContent="center"
        >
          <Grid item xs={4} justifyContent="center">
            <p className={classes.serviceHeader}>
              OUR <span className={classes.innerHeader}>SERVICES</span>
            </p>
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          direction="row"
          justifyContent="center"
          className={classes.apartmentsGrid}
        >
          <Grid item xs={1} md={3} justifyContent="center">
            <img src={home} alt="" className={classes.imgs} />

            <p className={classes.serviceText}>
              Buy your dream <br />
              <span className={classes.innerHeader}>home</span>
            </p>
          </Grid>
          <Grid item xs={1} md={3} justifyContent="center">
            <img src={hearts} alt="" className={classes.imgs} />
            <p className={classes.serviceText}>
              Rent the home you <br />
              <span className={classes.innerHeader}>love</span>
            </p>
          </Grid>
          <Grid item xs={1} md={3} justifyContent="center">
            <img src={hands} alt="" className={classes.imgs} />
            <p className={classes.serviceText}>
              Be partner with <br />
              <span className={classes.innerHeader}>Housify</span>
            </p>
          </Grid>
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          direction="row"
          justifyContent="center"
        >
          <Grid item xs={4} justifyContent="center"></Grid>
          <Grid item xs={4} justifyContent="center"></Grid>
          <Grid item xs={4} justifyContent="center"></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Apartments;
