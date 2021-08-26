import { useState } from 'react';
import './App.css';
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid, useMediaQuery, Hidden } from '@material-ui/core';
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

function shuffle(array) {
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
}

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
        <Box style={{ flexGrow: 1 }} />

        <div className="page-content">
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
          <Box marginTop={4} style={{ flexGrow: 1 }} />
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
