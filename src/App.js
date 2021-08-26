import { useState, useMemo } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core';
import TeamArea from './components/TeamArea';

const theme = createTheme({
  palette: {
    background: {
      // default: '#e4f0e2',
      paper: '#e4f0e2',
    },

    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

/**
 * @method shuffle
 * @param {Array} array
 * @return  takes an array and shuffles the elements.
 */

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

function App() {
  const [teams, setTeams] = useState({
    blueSide: [],
    redSide: [],
  });

  const [sent, setSent] = useState(false);
  const [toggleReset, handleToggleReset] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const index = e.target.getAttribute('index');

    let currentTeam = [...teams[name]];
    currentTeam[index] = value;

    setTeams((prevState) => ({
      ...prevState,
      [name]: [...currentTeam],
    }));
  };

  const roles = ['Top', 'Mid', 'Jungle', 'ADC', 'Support'];

  const getRoles = () => {
    setTeams((prevState) => ({
      blueSide: shuffle(prevState.blueSide),
      redSide: shuffle(prevState.redSide),
    }));

    setSent(true);
  };

  const onReset = () => {
    const inputFields = document.getElementsByClassName('textfield');

    Array.from(inputFields).map((field) => (field.value = ''));

    setSent(false);
    setTeams({
      blueSide: [],
      redSide: [],
    });

    handleToggleReset((prev) => !prev);
  };

  const playersLength = useMemo(
    () => teams.blueSide.length + teams.redSide.length,
    [teams]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className="App">
        <Typography></Typography>

        {!sent ? (
          <Grid
            container
            sm={6}
            justify="center"
            alignItems="center"
            spacing={2}
            direction="row">
            <TeamArea
              title="Team 1 (Blue Side)"
              teamName="blueSide"
              onChange={handleChange}
              teams={teams}
              toggleReset={toggleReset}
            />
          </Grid>
        ) : (
          <Grid
            container
            direction="column"
            justify="center"
            sm={12}
            spacing={2}>
            {roles.map((role, idx) => (
              <Grid item>
                <Typography>name: {teams.blueSide[idx]}</Typography>
                <Typography>role: {role}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
        <Button onClick={getRoles} disabled={playersLength < 10}>
          {!sent ? 'Get Roles' : 'Shuffle Again'}
        </Button>
        <Button onClick={onReset}>Reset</Button>
        <footer></footer>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
