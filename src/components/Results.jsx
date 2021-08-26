import { Grid, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ROLE_IMAGES } from '../utils/roleImages';

const Results = ({ teams, roles }) => (
  <Grid container direction="row" justify="space-evenly" sm={12} spacing={2}>
    <Grid item>
      <Typography variant="h4" component="h1" gutterBottom>
        Team One (Blue Side)
      </Typography>
      <List className="team__list">
        {roles.map((role, idx) => (
          // <Grid
          //   item
          //   style={{
          //     backgroundColor: '#fff',
          //     padding: '10px',
          //     border: '1px solid #999',
          //   }}>
          <ListItem alignItems="center" className="team__list--item">
            <ListItemAvatar>
              <Avatar alt={role} src={ROLE_IMAGES[role]} />
            </ListItemAvatar>
            <Typography>Role: {role}</Typography>
            <Typography>Name: {teams.blueSide[idx]}</Typography>
          </ListItem>
          // </Grid>
        ))}
      </List>
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
);

export default Results;
