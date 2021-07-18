import React, { useEffect } from "react";
import Lottie from "react-lottie";
import TextTransition from "react-text-transition";
import { makeStyles } from "@material-ui/core/styles";
import animationData from "../assets/animations/world-locations.json";
import { LOADING_TEXT } from "../utils/constants";
import { useIBMServices } from "../store";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const title_styles = {
  color: "#FFFFFF",
  fontSize: 40,
  marginBottom: 20,
  fontWeight: "bold",
};

export default function Loading(props) {
  const { children } = props;
  const [index, setIndex] = React.useState(0);

  const loading = useIBMServices((state) => state.loading_voices);
  const getVoices = useIBMServices((state) => state.getVoicesList)
  const classes = useStyles();

  useEffect(() => {
    getVoices()
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000
    );
    return () => clearTimeout(intervalId);
  }, [getVoices]);

  return (
    <div className={classes.root}>
      {loading ? (
        <div className={classes.loading_screen}>
          <Lottie options={defaultOptions} height={600} width={600} />

          <div className={classes.title_wrapper}>
            <TextTransition
              text={LOADING_TEXT[index % LOADING_TEXT.length]}
              style={title_styles}
            />
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  loading_screen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#081f44",
  },
  title_wrapper: {
    display: "flex",
    justifyContent: "center",
  },
}));
