import { useState, useEffect } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Paper from '@material-ui/core/Paper';
import { Typography, TextField } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core';

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
 * @method sample
 * @param {Array} array
 * @return {String} takes an array of strings (words) and returns a random element, the random element being a string.
 */
const sample = (array) => array[Math.floor(Math.random() * array.length)];

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
    blueSide: new Array(5).fill(''),
    redSide: new Array(5).fill(''),
  });

  // const [visitedRoles, setVisitedRoles] = useState({
  //   blueSide: new Set(),
  //   redSide: new Set(),
  // });

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

  useEffect(() => {
    console.log({ teams });
  }, [teams]);

  const roles = ['Top', 'Mid', 'Jungle', 'ADC', 'SUPPORT'];

  const getRoles = () => {
    let result1 = shuffle(teams.blueSide);
    let result2 = shuffle(teams.redSide);

    console.log({ result1, result2 });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className="App">
        <Typography>Paper</Typography>

        {teams['blueSide'].map((spot, idx) => (
          <TextField
            name="blueSide"
            inputProps={{ index: idx }}
            onChange={handleChange}
          />
        ))}
        <Button onClick={() => getRoles()}>getroles</Button>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
