import { useState, useMemo } from 'react';
import './App.css';
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Paper from '@material-ui/core/Paper';
import {
  Typography,
  Grid,
  useMediaQuery,
  Hidden,
  TextField,
  Button,
  Box,
  InputAdornment,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TeamArea from './components/TeamArea';
import Results from './components/Results';
import AccountCircle from '@material-ui/icons/AccountCircle';

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

const INITIAL_PLAYERS_STATE = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
};

const PLAYERS_IN_GAME_COUNT = 10;

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

  const [shuffleMode, setShuffleMode] = useState('roles');

  const [players, setPlayers] = useState(INITIAL_PLAYERS_STATE);

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

  const getShuffledRoles = () => {
    setTeams((prevState) => ({
      blueSide: shuffle(prevState.blueSide),
      redSide: shuffle(prevState.redSide),
    }));

    setSent(true);
  };

  const getShuffledTeams = () => {
    let result = shuffle([...Object.values(players)]);

    const firstFivePlayers = [...result].slice(0, 5);
    const secondFivePlayers = [...result].slice(5);

    setTeams((prevState) => ({
      ...prevState,
      blueSide: firstFivePlayers,
      redSide: secondFivePlayers,
    }));

    setSent(true);
  };

  const onReset = () => {
    setSent(false);
    setTeams({
      blueSide: new Array(5).fill(''),
      redSide: new Array(5).fill(''),
    });
    setPlayers(INITIAL_PLAYERS_STATE);
    handleToggleReset((prev) => !prev);
  };

  const someInputsAreEmpty = useMemo(
    () =>
      shuffleMode === 'roles'
        ? [...teams.blueSide, ...teams.redSide].some((value) => value === '')
        : [...Object.values(players)].some((value) => value === ''),
    [teams, shuffleMode, players]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className="App">
        <Box style={{ flexGrow: 1 }} />

        <div className="page-content">
          {/* <div className="inner-column"> */}
          {!sent ? (
            <>
              <Grid
                container
                direction={'row'}
                alignItems="center"
                justify={'center'}
                className="inner-column"
                lg={shuffleMode === 'teams' && 4}
                sm={shuffleMode === 'teams' && 8}
                spacing={4}>
                <Grid
                  item
                  container
                  direction="column"
                  align="center"
                  justify="center">
                  <Typography
                    align="center"
                    variant="h2"
                    gutterBottom
                    style={{ textShadow: '1px 1px 1px #999' }}>
                    {shuffleMode === 'teams' ? 'Random Teams' : 'Random Roles'}
                  </Typography>
                  <Box style={{ flexGrow: 1 }} marginBottom={1} />
                </Grid>
                {shuffleMode === 'roles' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {new Array(PLAYERS_IN_GAME_COUNT)
                      .fill()
                      .map((_player, idx) => (
                        <Grid item md={6}>
                          {/* <Box marginTop={2} /> */}
                          <TextField
                            fullWidth
                            variant="filled"
                            label={`Player ${idx + 1}`}
                            value={players[idx]}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle />
                                </InputAdornment>
                              ),
                            }}
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setPlayers((prevState) => ({
                                ...prevState,
                                [idx]: e.target.value,
                              }))
                            }
                          />
                        </Grid>
                      ))}
                  </>
                )}
              </Grid>
            </>
          ) : (
            <Results shuffleMode={shuffleMode} teams={teams} roles={roles} />
          )}
          <>
            <br />
            <Box marginTop={5} style={{ flexGrow: 1 }} />
            <Grid
              container
              direction={matchesXs ? 'column' : 'row'}
              alignItems="center"
              justify="center"
              sm={12}>
              {shuffleMode === 'roles' ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={getShuffledRoles}
                    disabled={someInputsAreEmpty}>
                    {!sent ? 'Get Random Roles' : 'Shuffle Roles Again'}
                  </Button>
                  <Box
                    marginRight={!matchesXs && 2}
                    marginTop={matchesXs && 2}
                  />
                  <Button
                    variant="contained"
                    style={{ color: '#fff' }}
                    color="secondary"
                    onClick={onReset}>
                    Reset
                  </Button>
                  <Box
                    marginRight={!matchesXs && 2}
                    marginTop={matchesXs && 2}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ background: 'blue' }}
                    onClick={() => {
                      setShuffleMode('teams');
                      onReset();
                    }}>
                    Get random teams instead
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={getShuffledTeams}
                    disabled={someInputsAreEmpty}>
                    {!sent ? 'Get Random Teams' : 'Shuffle Again'}
                  </Button>
                  <Box
                    marginRight={!matchesXs && 2}
                    marginTop={matchesXs && 2}
                  />
                  <Button
                    variant="contained"
                    style={{ color: '#fff' }}
                    color="secondary"
                    onClick={onReset}>
                    Reset
                  </Button>
                  <Box
                    marginRight={!matchesXs && 2}
                    marginTop={matchesXs && 2}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ background: 'blue' }}
                    onClick={() => {
                      setShuffleMode('roles');
                      onReset();
                    }}>
                    Get random roles instead
                  </Button>
                </>
              )}
              <Box marginRight={!matchesXs && 2} marginTop={matchesXs && 2} />
            </Grid>
          </>
          <Box marginTop={4} style={{ flexGrow: 1 }} />
        </div>
        {/* </div> */}
        <footer>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ padding: '10px' }}>
            <Typography>
              <Hidden xsDown>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={'https://github.com/DannyMichaels/'}>
                  GitCat
                </a>
              </Hidden>
              &nbsp; LoL Teams / Roles Randomizer &copy; 2021
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
