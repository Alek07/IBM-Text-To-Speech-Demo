import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Form from "./components/Form";
import SideBar from "./components/SideBar";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideBar />
      <Form />
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },
}));

export default App;
