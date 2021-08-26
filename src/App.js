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
import { Box } from '@material-ui/core';

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

  const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

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
        <div className="body">
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
                <TeamArea
                  title="Team 1 (Blue Side)"
                  teamName="blueSide"
                  onChange={handleChange}
                  toggleReset={toggleReset}
                />
              </Grid>

              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                sm={6}>
                <TeamArea
                  title="Team 2 (Red Side)"
                  teamName="redSide"
                  onChange={handleChange}
                  toggleReset={toggleReset}
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                sm={12}
                spacing={2}>
                <Grid item>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Team One (Blue Side)
                  </Typography>
                  {roles.map((role, idx) => (
                    <Grid
                      item
                      style={{
                        backgroundColor: '#fff',
                        padding: '10px',
                        border: '1px solid #999',
                      }}>
                      <Typography>Role: {role}</Typography>
                      <Typography>Name: {teams.blueSide[idx]}</Typography>
                    </Grid>
                  ))}
                </Grid>
                <Grid item>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Team Two (Red Side)
                  </Typography>
                  {roles.map((role, idx) => (
                    <Grid
                      item
                      style={{
                        backgroundColor: '#fff',
                        padding: '10px',
                        border: '1px solid #999',
                      }}>
                      <Typography>Role: {role}</Typography>
                      <Typography>Name: {teams.redSide[idx]}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
          <>
            <br />
            <Box marginTop={8} />
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={2}
              sm={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={getRoles}
                disabled={playersLength < 10}>
                {!sent ? 'Get Roles' : 'Shuffle Again'}
              </Button>
              <Box marginRight={2} />
              <Button variant="contained" color="secondary" onClick={onReset}>
                Reset
              </Button>
            </Grid>
          </>
        </div>
        <footer>
          <Grid container justify="space-between" style={{ padding: '10px' }}>
            <Typography>GitCat LoL roles Generator</Typography>
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
