import { Card, CardContent, Typography } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import villa from '../../../assets/villa.jfif';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withoutAuthInstance } from '../../../utils/axios/axios';
import { setUserLogin } from '../../../actions/userActions';

function SearchCard({
  name,
  surname,
  price,
  locality,
  city,
  state,
  buildUpArea,
  bedroomNumber,
  image,
  id,
}) {
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.navbar);
  const userState = useSelector((state) => state.user);
  const generalState = useSelector((state) => state.general);

  const [clicked, setClicked] = useState(false);
  const [emi, setEmi] = useState();
  const [avgPrice, setAvgPrice] = useState();

  const useStyles = makeStyles((theme) => ({
    card: {
      height: theme.typography.pxToVw(150),
      width: theme.typography.pxToVw(600),
      backgroundColor: themeState.isDark
        ? theme.palette.primaryBlue
        : theme.palette.dark.text,
      borderRadius: `${theme.typography.pxToRem(92)} 0`,
      display: 'flex',
      margin: ` ${theme.typography.pxToRem(12)} 0 `,
    },
    media: {
      width: '40%',
      height: '100%',
      borderRadius: `${theme.typography.pxToRem(44)} 0`,
      boxShadow: '8px 13px 20px #0000002E',
      objectFit: 'contain',
    },
    cardContent: {
      flexGrow: 1,
      backgroundColor: `${theme.palette.primaryBlue}`,
      padding: `${theme.typography.pxToRem(30)}`,
    },
    columnContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: theme.typography.pxToVw(130),
    },
    rowContainers: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    verticalLine: {
      height: theme.typography.pxToVw(25),
      borderLeft: '1px solid',
      color: theme.palette.dark.text,
      opacity: '0.7',
    },
    bottomRowContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '40%',
    },
    headerTitle: {
      fontSize: theme.typography.pxToRem(30),
      color: theme.palette.dark.text,
      marginBottom: `${theme.typography.pxToRem(10)}`,
      fontWeight: 'bold',
    },
    headerSubTitle: {
      margin: ` ${theme.typography.pxToRem(12)} 0 `,
      fontSize: theme.typography.pxToRem(22),
      color: theme.palette.dark.text,
      opacity: '0.6',
      fontStyle: 'italic',
    },
    icon: {
      color: theme.palette.dark.text,
      padding: `${theme.typography.pxToRem(5)} `,
      backgroundColor: !clicked ? theme.palette.primaryBlue : 'red',
      borderRadius: `${theme.typography.pxToRem(100)} `,
      height: `${theme.typography.pxToRem(35)}`,
      width: `${theme.typography.pxToRem(35)}`,
      transform: !clicked ? 'scale(1)' : 'scale(1.2)',
      transition: 'transform 0.2s',
      '&:hover': {
        color: 'white',
        backgroundColor: 'red',
        transform: 'scale(1.2)',
        cursor: 'pointer',
      },
    },
    info: {
      margin: ` ${theme.typography.pxToRem(12)} 0 `,
      fontSize: theme.typography.pxToRem(19),
      color: theme.palette.dark.text,
      opacity: '0.9',
    },
    address: {
      margin: ` -${theme.typography.pxToRem(16)} 0 `,
      fontSize: theme.typography.pxToRem(13),
      color: theme.palette.dark.text,
      opacity: '0.9',
    },
    tableFirst: {
      color: theme.palette.dark.text,
    },
    tableContainer: {
      margin: ` ${theme.typography.pxToRem(24)} 0 `,
      width: '70%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    horizontalLine: {
      marginTop: `-${theme.typography.pxToRem(20)}`,
      color: theme.palette.dark.text,
      opacity: '0.7',
      width: '75%',
    },
    tableSecond: {
      color: theme.palette.dark.text,
    },
    accountImg: {
      transform: 'scale(1.5)',
      margin: ` ${theme.typography.pxToRem(5)} `,
      color: theme.palette.dark.text,
    },
    name: {
      fontWeight: 'bold',
    },
    footer: {
      color: theme.palette.dark.text,
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    let url = '';

    if (id) {
      url = `/bookmarks/${id}`;
      console.log(url);

      withoutAuthInstance
        .get(url)
        .then((response) => {
          response.data[0].bookmarks.forEach((el) => {
            if (el.image === image) {
              setClicked(true);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    setEmi(Math.floor(Math.random() * (50000 - 15000) + 15000));
    setAvgPrice(Math.floor(Math.random() * (10 - 1) + 1));
    // fetch data
    let url = '';

    if (generalState.activeTab === 0) {
      url = `/house/buy/${generalState.selectedLocation}`;
    } else {
      url = `/house/rent/${generalState.selectedLocation}`;
    }

    withoutAuthInstance
      .get(url)
      .then((response) => {
        console.log(response.data);
        response.data.forEach((data) => {
          const bookmark = data['bookmarks'];
          console.log('BOOKMARK: ', bookmark);
          bookmark.forEach((da) => {
            if (image === da.image) {
              setClicked(true);
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBookmarkClick = () => {
    if (userState.isLoggedIn === false) {
      window.alert('Please signin to add bookmarks');
      return;
    }
    setClicked(!clicked);
    let url = '';
    const bookmark = {
      user_id: userState.userId,
      name,
      surname,
      price,
      locality,
      city,
      state,
      buildUpArea,
      bedroomNumber,
      image,
    };

    if (!clicked) {
      console.log(clicked);
      console.log('bookmarks');
      url = '/bookmarks';
      withoutAuthInstance
        .post(url, bookmark)
        .then((response) => {
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(clicked);
      console.log('delete');
      url = '/delete';

      withoutAuthInstance
        .post(url, bookmark)
        .then((response) => {
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={image} />
        <CardContent className={classes.cardContent}>
          <Typography>
            <div className={classes.columnContainer}>
              <div className={classes.rowContainers}>
                <div className={classes.headerTitle}>{price}</div>
                <div className={classes.headerSubTitle}>
                  {`EMI starts at Rs ${emi}`}
                </div>
                <Icon className={classes.icon}>
                  <FavoriteIcon onClick={handleBookmarkClick} />
                </Icon>
              </div>
              <div className={classes.rowContainers}>
                <div>
                  <div className={classes.info}>{bedroomNumber} BHK </div>
                  <div className={classes.address}>
                    {city} , {state}
                  </div>
                </div>
              </div>
              <div className={classes.tableContainer}>
                <span>
                  <span className={classes.tableFirst}>Build Up Area</span>
                  <br />
                  <span className={classes.tableSecond}>{buildUpArea}</span>
                </span>
                <div className={classes.verticalLine}></div>
                <span>
                  <span className={classes.tableFirst}>Avg. Price</span> <br />
                  <span
                    className={classes.tableSecond}
                  >{`Rs ${avgPrice} k /sq.ft`}</span>
                </span>
                <div className={classes.verticalLine}></div>
                <span>
                  <span className={classes.tableFirst}>Locality</span> <br />
                  <span className={classes.tableSecond}>{locality}</span>
                </span>
              </div>
              <hr className={classes.horizontalLine} />

              <div div className={classes.bottomRowContainer}>
                <Icon className={classes.accountImg}>
                  <AccountCircleIcon />
                </Icon>
                <div>
                  <p className={classes.name}>
                    {name} {surname}
                  </p>
                  <p className={classes.footer}>Owner</p>
                </div>
              </div>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default SearchCard;
