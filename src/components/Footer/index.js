import React from "react";
import { Typography, Link } from "@material-ui/core";
import styles from "./styles";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://hispindia.org/">
          HISP India
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
}
