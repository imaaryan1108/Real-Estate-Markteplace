import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

function BlueButton({ text, onClick, width, height, borderRadius, fontSize }) {
  const themeState = useSelector((state) => state.navbar);
  const useStyles = makeStyles((theme) => ({
    button: {
      borderRadius: theme.typography.pxToRem(borderRadius),
      minWidth: theme.typography.pxToRem(width),
      maxWidth: theme.typography.pxToRem(width),
      minHeight: theme.typography.pxToRem(height),
      maxHeight: theme.typography.pxToRem(height),
      fontSize: theme.typography.pxToRem(fontSize),
      backgroundColor: `${theme.palette.primaryBlue}`,
      color: themeState.isDark
        ? theme.palette.dark.text
        : theme.palette.light.text,

      "&:hover": {
        backgroundColor: `${theme.palette.primaryBlue}`,
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Button onClick={onClick} className={classes.button}>
        {text}
      </Button>
    </div>
  );
}

export default BlueButton;
