import {
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Box,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const PLAYERS_IN_TEAM_COUNT = 5;

// team area before results, with textfields
export default function TeamArea({
  onChange,
  title,
  teamName,
  teamSide,
  toggleReset,
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

  const { breakpoints } = useTheme();
  const matchesXs = useMediaQuery(breakpoints.down('sm'));

  return (
    <>
      <Grid item>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      </Grid>
      {new Array(PLAYERS_IN_TEAM_COUNT).fill().map((_, idx) => (
        <Grid item key={idx}>
          <Box marginTop={2} />

          <TextField
            variant="filled"
            color="primary"
            className="textfield"
            name={teamName}
            fullWidth
            inputProps={{ index: idx }}
            value={values[idx]}
            label={`Summoner ${idx + 1} (${teamSide})`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            placeholder={
              matchesXs ? 'Enter Name' : `Enter Summoner ${idx + 1}'s IGN`
            }
            onChange={(e) => {
              onChange(e);
              setValues((prevState) => ({
                ...prevState,
                [idx]: e.target.value,
              }));
            }}
          />
        </Grid>
      ))}
    </>
  );
}
