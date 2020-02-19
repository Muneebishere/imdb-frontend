import { makeStyles } from '@material-ui/core/styles';
import { themeColor, buttonTextColor } from './theme'

export const filmInfo = makeStyles(theme => ({
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
  watchlistButton: {
    fontWeight: "bold",
    color: buttonTextColor,
    marginLeft: "4px",
    marginRight: theme.spacing(1),
    backgroundColor: themeColor,
    '&:hover': {
      backgroundColor: themeColor,
    }
  },
  removeWatchlistBtn: {
    fontWeight: "bold",
    color: themeColor,
    marginLeft: "4px",
    marginRight: theme.spacing(1),
    backgroundColor: buttonTextColor,
    '&:hover': {
      backgroundColor: buttonTextColor,
    }
  },
  trailerButton: {
    marginTop: "12px",
    borderColor: themeColor,
    color: themeColor,
  },
  content: {
    paddingBottom: "10px",
    padding: "12px"
  },
  navigation: {
    width: "100%"
  },
  btnGroup: {
    marginBottom: "4px"
  },
  nav: {
    backgroundColor: themeColor,
    color: buttonTextColor,
    '&:hover': {
      backgroundColor: themeColor,
    }
  },
  typeBtn: {
    textTransform: "capitalize",
    fontWeight: "bold",
  }
}));