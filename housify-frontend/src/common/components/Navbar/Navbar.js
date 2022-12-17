/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { NavbarConst } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Modal,
  Switch,
  Typography,
} from '@material-ui/core';
import { toggleTheme } from '../../../actions/navbarActions';
import { useDispatch, useSelector } from 'react-redux';
import NavbarButton from '../StyledButtons/NavbarButton';
import { useAuth0 } from '@auth0/auth0-react';
import { setBearerToken, setUserLogin } from '../../../actions/userActions';
import { useHistory } from 'react-router';
import { withoutAuthInstance } from '../../../utils/axios/axios';
import Form from './Form';

function Navbar() {
  const dispatch = useDispatch();
  const navbarState = useSelector((state) => state.navbar);
  const history = useHistory();
  const userState = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: '#161414',
    border: '4px solid #2064eb',
    boxShadow: 24,
    p: 4,
    borderRadius: '25px',
  };

  const { loginWithRedirect, logout, user, getAccessTokenSilently } =
    useAuth0();

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: navbarState.isDark
        ? theme.palette.dark.bgc
        : theme.palette.light.bgc,
      height: theme.typography.pxToVh(35),
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
    buttonGroup: {
      minWidth: theme.typography.pxToVw(300),
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: navbarState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,
      fontSize: theme.typography.pxToRem(22),
      fontWeight: 200,
      fontFamily: theme.typography.fontFamily,

      '&:hover': {
        textDecoration: 'underline',
      },
    },
    toggleButtonLight: {
      color: '#FFC93C',
    },
    toggleButtonDark: {
      color: theme.palette.primaryBlue,
    },
    actionButtonGroup: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      minWidth: theme.typography.pxToVw(180),
    },
    switchRoot: {
      border: '1px solid blue',
    },
    userDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      minWidth: theme.typography.pxToVw(110),
      maxWidth: theme.typography.pxToVw(110),
    },
    modal: {
      border: `1px ${theme.palette.primaryBlue}`,
    },
  }));

  const classes = useStyles();
  const handleThemeButtonClick = () => {
    toggleTheme(dispatch);
  };

  // Handling User Login

  useEffect(() => {
    async function effect() {
      if (user) {
        let url = '/uniqueId';

        const token = {
          user_id: user.sub,
        };
        const data = {
          isLoggedIn: true,
          userName: user?.name,
          userEmail: user?.email,
          pictureUrl: user?.picture,
          isEmailVerified: user?.email_verified,
          userId: user?.sub,
        };

        setUserLogin(data, dispatch);

        withoutAuthInstance
          .post(url, token)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    effect();
  }, [user]);

  useEffect(() => {
    const effect = async () => {
      const token = await getAccessTokenSilently();
      setBearerToken(token, dispatch);
      window.localStorage.bearer = token;
    };
    if (user) effect();
  }, [user]);

  const modalVariant = {
    hidden: {
      opacity: 0,
      x: '-100vw',
    },
    visible: {
      opacity: 1,
      x: '0',
    },
  };
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer} onClick={() => history.push('/')}>
        {!navbarState.isDark ? (
          <svg
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
      <div className={classes.buttonGroup}>
        <div className={classes.link}>
          <Button className={classes.link} onClick={handleOpen}>
            {NavbarConst.LIST_YOUR_PROPERTY}
          </Button>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            hideBackdrop
          >
            <Box sx={style}>
              <div>
                <Form onCloseModal={handleClose} />
              </div>
            </Box>
          </Modal>
        </div>
        <Link className={classes.link} to="/bookmark">
          {NavbarConst.BOOKMARK}
        </Link>
      </div>
      <div className={classes.actionButtonGroup}>
        {!userState.isLoggedIn ? (
          <div className={classes.userDiv}>
            <NavbarButton
              onClick={loginWithRedirect}
              borderRadius={20}
              width={90}
              text={NavbarConst.SIGN_IN}
            />
            <NavbarButton
              onClick={loginWithRedirect}
              borderRadius={20}
              width={90}
              text={NavbarConst.SIGN_UP}
            />
          </div>
        ) : (
          <div className={classes.userDiv}>
            <NavbarButton
              borderRadius={20}
              width={90}
              onClick={logout}
              text={NavbarConst.LOGOUT}
            />
            <Avatar src={userState.pictureUrl} />
          </div>
        )}

        <Switch
          checked={navbarState.isDark}
          color="primary"
          onChange={handleThemeButtonClick}
          classes={{ input: classes.switchRoot }}
        />
      </div>
    </div>
  );
}

export default Navbar;
