import { makeStyles } from '@material-ui/core/styles';

export const celebrityCardDetail = makeStyles(theme => ({
  yearRelased: {
    fontSize: 16,
    color: '#757575',
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  releaseDateHeading: {
    fontSize: 14,
    color: '#757575',
    fontWeight: "bold",
  },
  genres: {
    fontSize: 14,
    color: '#757575',
    marginTop: theme.spacing(0.5),
  },
  releaseDate: {
    fontSize: 14,
    color: '#757575',
    marginLeft: theme.spacing(0.5),
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    paddingBottom: "10px",
  }
}));