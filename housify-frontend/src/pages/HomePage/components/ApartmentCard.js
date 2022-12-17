import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import { useSelector } from 'react-redux';
import apt from '../../../assets/West_villas.jpg';

function ApartmentCard({ price, locality, city, image }) {
  const themeState = useSelector((state) => state.navbar);
  const useStyles = makeStyles((theme) => ({
    card: {
      height: theme.typography.pxToRem(400),
      width: theme.typography.pxToRem(330),
      backgroundColor: themeState.isDark
        ? theme.palette.primaryBlue
        : theme.palette.dark.text,
      borderRadius: `${theme.typography.pxToRem(44)} 0`,
    },
    media: {
      height: '65%',
      width: '100%',
      borderRadius: `${theme.typography.pxToRem(44)} 0`,
      boxShadow: '8px 13px 20px #0000002E',
    },
    price: {
      fontSize: theme.typography.pxToRem(30),
      color: themeState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,
      marginBottom: `${theme.typography.pxToRem(10)}`,
    },
    name: {
      fontSize: theme.typography.pxToRem(20),
      color: themeState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,
      opacity: '0.8',
    },
    location: {
      fontSize: theme.typography.pxToRem(15),
      color: themeState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,
      opacity: '0.6',
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <p className={classes.price}>{price} </p>
            <p className={classes.name}>{locality} </p>
            <p className={classes.location}>{city}</p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ApartmentCard;
