import { useState } from 'react';
import './App.css';
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid, useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core';
import TeamArea from './components/TeamArea';
import { Box } from '@material-ui/core';
import Results from './components/Results';

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
 * @return {Array} takes an array and shuffles the elements.
 */

const shuffle = (array) => {
  let shuffledArray = [...array];
  let currentIndex = shuffledArray.length - 1;
  let temporaryValue;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);

    // classic swap algorithm
    temporaryValue = shuffledArray[currentIndex]; // assign tempValue to the currentIndex of array
    shuffledArray[currentIndex] = shuffledArray[randomIndex]; // takes element  from current index and shuffles it, moving it to random index.
    shuffledArray[randomIndex] = temporaryValue;

    currentIndex--;
  }
  return shuffledArray;
};

function App() {
  const [teams, setTeams] = useState({
    blueSide: new Array(5).fill(''),
    redSide: new Array(5).fill(''),
  });

  const [sent, setSent] = useState(false);
  const [toggleReset, handleToggleReset] = useState(false);

  const { breakpoints } = useTheme();
  const matchesXs = useMediaQuery(breakpoints.down('xs'));

  const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

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

  const getRoles = () => {
    setTeams((prevState) => ({
      blueSide: shuffle(prevState.blueSide),
      redSide: shuffle(prevState.redSide),
    }));

    setSent(true);
  };

  const onReset = () => {
    setSent(false);
    setTeams({
      blueSide: new Array(5).fill(''),
      redSide: new Array(5).fill(''),
    });

    handleToggleReset((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className="App">
        <Grid item style={{ flexGrow: 1 }} />

        <div className="page-content">
          {/* <Typography align="center" variant="h1" component="h1">
          LoL Roles Generator
        </Typography> */}
          {!sent ? (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between">
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                sm={6}>
                {/* textfields team1 */}
                <TeamArea
                  title="Team 1 (Blue Side)"
                  teamName="blueSide"
                  onChange={handleChange}
                  toggleReset={toggleReset}
                  teamSide="Blue Side"
                />
              </Grid>

              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                sm={6}>
                {/* textfields team2 */}
                {matchesXs && <Box marginTop={4} />}
                <TeamArea
                  title="Team 2 (Red Side)"
                  teamName="redSide"
                  onChange={handleChange}
                  toggleReset={toggleReset}
                  teamSide="Red Side"
                />
              </Grid>
            </Grid>
          ) : (
            <Results teams={teams} roles={roles} />
          )}
          <>
            <br />
            <Box marginTop={8} />
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              sm={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={getRoles}
                disabled={[...teams.blueSide, ...teams.redSide].some(
                  (value) => value === ''
                )}>
                {!sent ? 'Get Roles' : 'Shuffle Again'}
              </Button>
              <Box marginRight={2} />
              <Button
                variant="contained"
                style={{ color: '#fff' }}
                color="secondary"
                onClick={onReset}>
                Reset
              </Button>
            </Grid>
          </>
          <Grid item style={{ flexGrow: 1 }} />
        </div>

        <footer>
          <Grid container justify="space-between" style={{ padding: '10px' }}>
            <Typography>
              <a
                target="_blank"
                rel="noreferrer"
                href={'https://github.com/DannyMichaels/'}>
                GitCat
              </a>
              &nbsp; LoL Roles Generator &copy; 2021
            </Typography>

            <a
              target="_blank"
              rel="noreferrer"
              href={'https://github.com/DannyMichaels/LoL-roles-generator'}>
              Source
            </a>
          </Grid>
        </footer>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
