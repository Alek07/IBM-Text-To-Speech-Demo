import React from "react";
import { makeStyles, Typography, Divider } from "@material-ui/core";

import logo_fisc from "../assets/png/logo_fisc.png";

export default function SideBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar_content}>
        <img src={logo_fisc} alt="logo_fisc" className={classes.logo} />

        <Typography variant="h4" className={classes.title}>
          Proyecto Semestral
        </Typography>

        <Typography variant="h5" className={classes.title}>
          Tópicos Especiales II
        </Typography>

        <Divider
          light
          variant="fullWidth"
          classes={{ root: classes.divider }}
        />
      </div>

      <Typography variant="h7" className={classes.footer_text}>
        ©2021 Checkpoint Studio
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#081f44",
    padding: theme.spacing(5),
  },
  sidebar_content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    margin: theme.spacing(3),
  },
  divider: {
    width: "100%",
    height: 0,
    border: "1px solid #FFFFFF",
    marginTop: theme.spacing(3),
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  footer_text: {
    color: "#FFFFFF",
    textAlign: "left",
  },
}));
