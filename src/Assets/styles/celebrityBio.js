import { makeStyles } from '@material-ui/core/styles';

export const celebrityBio = makeStyles(theme => ({
  castHeading: {
    fontSize: 14,
    fontWeight: "bold",
  },
  castNames: {
    fontSize: 14,
    marginLeft: theme.spacing(1)
  }
}));