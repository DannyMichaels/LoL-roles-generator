import { Grid, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ROLE_IMAGES } from '../utils/roleImages';
import { Fragment } from 'react';

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

export default function Results({ teams, roles }) {
  const { blueSide, redSide } = teams;

  return (
    <Grid container direction="row" justify="space-evenly" sm={12} spacing={2}>
      <TeamList title="Team One (Blue Side)" team={blueSide} roles={roles} />
      <TeamList title="Team Two (Red Side)" team={redSide} roles={roles} />
    </Grid>
  );
}
