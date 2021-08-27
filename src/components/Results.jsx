import {
  Grid,
  Typography,
  useMediaQuery,
  Box,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ROLE_IMAGES } from '../utils/roleImages';
import { Fragment } from 'react';
import { useTheme } from '@material-ui/core/styles';

const TeamList = ({ title, team, roles }) => (
  <Grid item>
    <Typography variant="h4" component="h1" gutterBottom>
      {title}
    </Typography>
    <List className="team__list">
      {roles.map((role, idx) => (
        <Fragment key={idx}>
          <ListItem alignItems="center" className="team__list--item">
            <ListItemAvatar>
              <Avatar alt={role} src={ROLE_IMAGES[role]} />
            </ListItemAvatar>

            <ListItemText
              secondary={
                <>
                  {'Name - '}
                  <Typography
                    component="h2"
                    variant="subtitle1"
                    className="inline"
                    color="textPrimary">
                    {team[idx]}
                  </Typography>
                  <br />
                  {'Role - '}
                  <Typography
                    component="span"
                    variant="body2"
                    className="inline"
                    color="textPrimary">
                    {role}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </Fragment>
      ))}
    </List>
  </Grid>
);

export default function Results({ teams, roles, shuffleMode }) {
  const { blueSide, redSide } = teams;
  const { breakpoints } = useTheme();
  let matchesXs = useMediaQuery(breakpoints.down('xs'));

  return (
    <Grid
      container
      className="inner-column"
      direction={matchesXs ? 'column' : 'row'}
      justify={matchesXs ? 'center' : 'space-evenly'}
      xs={12}
      alignItems="center"
      sm={12}
      lg={10}
      spacing={2}>
      <Grid item container direction="column" align="center" justify="center">
        <Typography
          align="center"
          variant="h2"
          gutterBottom
          style={{ textShadow: '1px 1px 1px #999' }}>
          {shuffleMode === 'teams'
            ? 'Random Teams Results'
            : 'Random Roles Results'}
        </Typography>
        <Box style={{ flexGrow: 1 }} marginBottom={1} />
      </Grid>
      <TeamList title="Team One (Blue Side)" team={blueSide} roles={roles} />
      {matchesXs && <Box marginTop={4} />}
      <TeamList title="Team Two (Red Side)" team={redSide} roles={roles} />
    </Grid>
  );
}
