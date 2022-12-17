import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  InputBase,
  Button,
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import houseIcon from '../../../assets/house-308936.svg';
import { withoutAuthInstance } from '../../../utils/axios/axios';

function Form({ onCloseModal }) {
  const [houseImage, setHouseImage] = useState(houseIcon);
  const [displayHouseImage, setDisplayHouseImage] = useState(houseIcon);
  const [type, setType] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [housePrice, setHousePrice] = useState('');
  const [bedroomNumber, setBedRoomNumber] = useState(0);
  const [buildUpArea, setBuildUpArea] = useState('');

  const handleListProperty = (e) => {
    e.preventDefault();

    let url = '/houseListing';

    const data = new FormData();
    data.append('name', firstName);
    data.append('surname', lastName);
    data.append('phoneNumber', phoneNumber);
    data.append('email', email);
    data.append('city', city);
    data.append('state', state);
    data.append('address', address);
    data.append('locality', locality);
    data.append('sale_or_rent', type);
    data.append('houseprice', housePrice);
    data.append('bedroomNumber', bedroomNumber);
    data.append('buildUpArea', buildUpArea);
    data.append('houseImage', houseImage);

    // const data = [
    //   {
    //     owner: {
    //       name: firstName,
    //       surname: lastName,
    //       phoneNumber: phoneNumber,
    //       email: email,
    //     },
    //     house_location: {
    //       city: city,
    //       state: state,
    //       address: address,
    //       locality: locality,
    //     },
    //     house_properties: {
    //       sale_or_rent: type,
    //       houseprice: housePrice,
    //       bedroomNumber: bedroomNumber,
    //       buildUpArea: buildUpArea,
    //     },
    //   },
    // ];

    if (firstName === '' || lastName === '') {
      window.alert('Please fill name');
      return;
    } else if (phoneNumber.length !== 10) {
      window.alert('Please fill a valid phone number');
      return;
    } else if (
      city === '' ||
      state === '' ||
      address === '' ||
      locality === ''
    ) {
      window.alert('Please fill a valid address');
      return;
    } else if (housePrice === '') {
      window.alert('Please enter the house price');
      return;
    }
    withoutAuthInstance
      .post(url, data)
      .then(() => {
        window.alert('Your Property has been successfully listed!');
        onCloseModal();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const useStyles = makeStyles((theme) => ({
    title: {
      color: theme.palette.dark.text,

      fontSize: theme.typography.pxToVh(30),
      margin: `${theme.typography.pxToRem(20)} ${theme.typography.pxToRem(
        20
      )} ${theme.typography.pxToRem(30)} ${theme.typography.pxToRem(20)}`,
      fontWeight: '700',
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      width: theme.typography.pxToVw(200),

      // backgroundColor: theme.palette.primaryBlue,
    },

    profileImage: {
      border: 'solid #2064eb',
      width: theme.typography.pxToVw(200),
      height: theme.typography.pxToVw(150),
    },
    input: {
      color: theme.palette.dark.text,

      alignItem: 'start',
    },
    fieldsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: theme.typography.pxToRem(10),

      width: '100%',
      // height: '90%',
    },
    email: {
      gridColumn: '1 / 3',
    },
    inputBase: {
      border: `2px solid ${theme.palette.primaryBlue}`,
      height: '7vh',
      padding: theme.spacing(2),
      borderRadius: theme.typography.pxToRem(6),
      color: theme.palette.dark.text,

      borderRadius: theme.typography.pxToRem(6),
    },
    buttonsContainer: {
      // backgroundColor: 'red',
      margin: `${theme.typography.pxToRem(40)} auto ${theme.typography.pxToRem(
        40
      )} auto`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      // alignItems: 'center',
      width: theme.typography.pxToVw(200),
    },
    rightContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      // backgroundColor: 'red',
      marginLeft: '100px',
    },
    submitButton: {
      backgroundColor: theme.palette.primaryBlue,
      width: theme.typography.pxToVw(80),
      color: theme.palette.dark.text,
      '&:hover': {
        backgroundColor: theme.palette.primaryBlue,
        color: theme.palette.dark.text,
      },
    },
    cancelButton: {
      backgroundColor: theme.palette.dark.text,
      width: theme.typography.pxToVw(80),

      '&:hover': {
        color: theme.palette.light.text,
        backgroundColor: theme.palette.dark.text,
      },
    },
  }));

  const classes = useStyles();

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDisplayHouseImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div>
      <div className={classes.title}>Enter Information</div>
      <div className={classes.formContainer}>
        <div className={classes.inputContainer}>
          <img
            src={displayHouseImage}
            alt=""
            className={classes.profileImage}
          />
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            className={classes.input}
            onChange={(e) => {
              setHouseImage(e.target.files[0]);
              imageHandler(e);
            }}
          />
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.fieldsContainer}>
            <InputBase
              id="outlined-basic"
              placeholder="First Name"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="Last Name"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="Email"
              variant="outlined"
              className={classes.email}
              //className={classes.inputBase}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="Phone"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="City"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setCity(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="Locality"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setLocality(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="Address"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="State"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setState(e.target.value)}
            />
            <div>
              <Box>
                <FormControl fullWidth fullHeight>
                  <Select
                    className={classes.inputBase}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    defaultValue={'Type'}
                  >
                    <MenuItem value="Sale">Sale</MenuItem>
                    <MenuItem value="Rent">Rent</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <InputBase
              id="outlined-basic"
              placeholder="Price"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setHousePrice(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="Number of Bedrooms"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setBedRoomNumber(e.target.value)}
            />
            <InputBase
              id="outlined-basic"
              placeholder="Build Up Area"
              variant="outlined"
              className={classes.inputBase}
              onChange={(e) => setBuildUpArea(e.target.value)}
            />
          </div>
          <div className={classes.buttonsContainer}>
            <Button
              onClick={handleListProperty}
              className={classes.submitButton}
            >
              Submit
            </Button>
            <Button onClick={onCloseModal} className={classes.cancelButton}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
