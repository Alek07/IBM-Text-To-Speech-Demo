import React, { useState } from "react";
import { LANGUAGES } from "../utils/constants";
import H5AudioPlayer from "react-h5-audio-player";
import { useIBMServices } from "../store";
import "react-h5-audio-player/lib/styles.css";
import {
  makeStyles,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  Slide,
  CircularProgress,
} from "@material-ui/core";

export default function Form() {
  const [errors, setErrors] = useState(null);
  const [values, setValues] = useState({
    text: "",
    language: "es",
    voice: "",
  });

  const audio = useIBMServices((state) => state.audio);
  const clear_audio = useIBMServices((state) => state.clearAudio);
  const voice_list = useIBMServices((state) => state.voices);
  const synthesize_text = useIBMServices((state) => state.syntehesizeText);
  const loading = useIBMServices((state) => state.loading_synthesize);

  const classes = useStyles();

  const handleInputsChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      ...(name === 'language' && { voice: "" }),
    });
  };

  const validate = () => {
    let temp = {};

    temp.text = values.text !== "" ? "" : "Este campo es requerido";
    temp.language = values.language !== "" ? "" : "Este campo es requerido";
    temp.voice = values.voice !== "" ? "" : "Este campo es requerido";

    setErrors(temp);

    return Object.values(temp).every((value) => value === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      clear_audio();
      synthesize_text(values);
    }
  };

  return (
    <div className={classes.root}>
      <Slide in={true} direction="up" timeout={{ enter: 1000 }}>
        <div className={classes.form_container}>
          <Typography variant="h4" className={classes.formTitle}>
            Text to Speech - Demo
          </Typography>

          <form className={classes.form} noValidate autoComplete="off">
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className={classes.subtitle}
            >
              Escriba o pegue un texto en español
            </Typography>
            <TextField
              value={values.text}
              name="text"
              onChange={handleInputsChanges}
              label="Texto"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              {...(errors?.text && { error: true, helperText: errors.text })}
            />

            <Typography
              variant="subtitle2"
              color="textSecondary"
              className={classes.subtitle}
            >
              Escoja el lenguaje de salida para el audio
            </Typography>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel>Lenguaje</InputLabel>
              <Select
                value={values.language}
                name="language"
                onChange={handleInputsChanges}
                label="Lenguage"
                fullWidth
                {...(errors?.language && {
                  error: true,
                })}
              >
                {LANGUAGES.map((language, index) => (
                  <MenuItem key={index} value={language.value}>
                    {language.label}
                  </MenuItem>
                ))}
              </Select>
              {errors?.language && (
                <FormHelperText className={classes.formError}>
                  {errors.language}
                </FormHelperText>
              )}
            </FormControl>

            <Typography
              variant="subtitle2"
              color="textSecondary"
              className={classes.subtitle}
            >
              Escoja una voz para el lenguaje seleccionado
            </Typography>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel>Voz</InputLabel>
              <Select
                value={values.voice}
                name="voice"
                onChange={handleInputsChanges}
                label="Voz"
                {...(errors?.voice && {
                  error: true,
                })}
              >
                {voice_list.map(
                  (voice, index) =>
                    voice.language?.includes(values.language) && (
                      <MenuItem key={index} value={voice.name}>
                        {voice.name}
                      </MenuItem>
                    )
                )}
              </Select>
              {errors?.voice && (
                <FormHelperText className={classes.formError}>
                  {errors.voice}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              type="button"
              onClick={handleSubmit}
              size="large"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              <Typography>Sintetizar</Typography>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </form>

          <div className={classes.audio_container}>
            <H5AudioPlayer src={audio} />
          </div>
        </div>
      </Slide>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form_container: { width: "50%" },
  form: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
    },
  },
  formTitle: { marginBottom: theme.spacing(3) },
  subtitle: { marginBottom: theme.spacing(2) },
  formControl: {
    marginBottom: theme.spacing(3),
  },
  formError: { color: "#f44336" },
  audio_container: {
    width: "100%",
    marginTop: theme.spacing(5),
  },
  buttonProgress: { position: "absolute" },
}));
