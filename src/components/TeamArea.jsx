import { TextField, Typography, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';

const PLAYERS_IN_TEAM_COUNT = 5;

export default function TeamArea({
  onChange,
  title,
  teamName,
  toggleReset,
  teams,
}) {
  const [values, setValues] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  });

  useEffect(() => {
    setValues({
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
    });
  }, [toggleReset]);

  return (
    <>
      <Grid item>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      </Grid>
      {new Array(PLAYERS_IN_TEAM_COUNT).fill().map((_, idx) => (
        <Grid item key={idx}>
          <TextField
            className="textfield"
            name={teamName}
            inputProps={{ index: idx }}
            value={values[idx]}
            onChange={(e) => {
              onChange(e);
              setValues((prevState) => ({
                ...prevState,
                [idx]: e.target.value,
              }));
            }}
            label={`Summoner ${idx + 1}`}
          />
        </Grid>
      ))}
    </>
  );
}
