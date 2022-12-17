import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

function NavbarButton({
  text,
  onClick,
  width,
  height,
  borderRadius,
  fontSize,
}) {
  const useStyles = makeStyles((theme) => ({
    button: {
      background:
        'transparent linear-gradient(126deg, #80AAE8 0%, #E8EEB4 53%, #FA8891 100%) 0% 0% no-repeat padding-box',
      borderRadius: theme.typography.pxToRem(borderRadius),
      minWidth: theme.typography.pxToRem(width),
      maxWidth: theme.typography.pxToRem(width),
      minHeight: theme.typography.pxToRem(height),
      maxHeight: theme.typography.pxToRem(height),
      fontSize: theme.typography.pxToRem(fontSize),

      '&:hover': {
        background:
          'transparent linear-gradient(279deg, #80AAE8 0%, #E8EEB4 53%, #FA8891 100%) 0% 0% no-repeat padding-box',
      },
    },
  }));
  const classes = useStyles();

  return (
    <Button onClick={onClick} className={classes.button}>
      {text}
    </Button>
  );
}

export default NavbarButton;
