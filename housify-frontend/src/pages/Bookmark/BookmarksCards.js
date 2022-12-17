import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withoutAuthInstance } from '../../utils/axios/axios';
import SearchCard from '../Search/components/SearchCard';

function BookmarksCards({ param }) {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    let url = '';

    if (param) {
      url = `/bookmarks/${param}`;
      console.log(url);

      withoutAuthInstance
        .get(url)
        .then((response) => {
          setHouses(response.data[0].bookmarks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  console.log('Houses', houses);

  const themeState = useSelector((state) => state.navbar);
  const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: themeState.isDark
        ? theme.palette.dark.bgc
        : theme.palette.light.bgc,
    },
    message: {
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
    messageContainer: {
      margin: `${theme.typography.pxToRem(200)}`,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <Grid
          item
          container
          alignItems="center"
          direction="row"
          justifyContent="center"
        >
          <Grid item xs={8}>
            {houses.length != 0 ? (
              houses.map((house) => {
                return (
                  <SearchCard
                    id={param}
                    name={house.name}
                    surname={house.surname}
                    price={house.price}
                    locality={house.locality}
                    city={house.city}
                    state={house.state}
                    buildUpArea={house.buildUpArea}
                    bedroomNumber={house.bedroomNumber}
                    address={house.address}
                    image={house.image}
                  />
                );
              })
            ) : (
              <div className={classes.messageContainer}>
                {' '}
                <span className={classes.message}>No </span>{' '}
                <span className={classes.innerHeader}> Bookmarks Present</span>{' '}
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default BookmarksCards;
