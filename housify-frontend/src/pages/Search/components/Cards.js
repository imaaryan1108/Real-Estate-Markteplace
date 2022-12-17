import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchCard from './SearchCard';
import { withoutAuthInstance } from '../../../utils/axios/axios';

function Cards() {
  const [houses, setHouses] = useState([]);

  const generalState = useSelector((state) => state.general);

  useEffect(() => {
    let url = '';

    if (generalState.activeTab === 0) {
      url = `/house/buy/${generalState.selectedLocation}`;
    } else {
      url = `/house/rent/${generalState.selectedLocation}`;
    }
    console.log(url);

    withoutAuthInstance
      .get(url)
      .then((response) => {
        setHouses(response.data);
        console.log('HEYYYYYYYYYYYYYY', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [generalState.activeTab, generalState.selectedLocation]);

  const themeState = useSelector((state) => state.navbar);
  const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: themeState.isDark
        ? theme.palette.dark.bgc
        : theme.palette.light.bgc,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid
        item
        container
        alignItems="center"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={8}>
          {houses &&
            houses.map((house) => {
              return (
                <SearchCard
                  name={house.owner.name}
                  surname={house.owner.surname}
                  price={house.house_properties.housePrice}
                  locality={house.house_location.locality}
                  city={house.house_location.city}
                  state={house.house_location.state}
                  buildUpArea={house.house_properties.buildUpArea}
                  bedroomNumber={house.house_properties.bedroomNumber}
                  address={house.house_location.address}
                  image={house.house_properties.houseImage}
                />
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
}

export default Cards;
