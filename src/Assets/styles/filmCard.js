import { makeStyles } from '@material-ui/core/styles';
import { themeColor, buttonTextColor, boxShadow } from './theme'

export const filmCard = makeStyles(theme => ({
  card: {
    maxWidth: 200,
    minWidth: 200,
    border: '1px solid',
    borderColor: themeColor,
    boxShadow: boxShadow
  },
  margin: {
    margin: '15px'
  },
  media: {
    height: 300,
  },
  yearRelased: {
    fontSize: 12,
    color: '#757575',
  },
  title2: {
    fontWeight: "bold",
    color: themeColor
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    paddingBottom: theme.spacing(0)
  },
  watchlistButton: {
    fontWeight: "bold",
    backgroundColor: themeColor,
    color: buttonTextColor,
    '&:hover': {
      backgroundColor: themeColor,
    }
  },
  removeWatchlistBtn: {
    textTransform: "none",
    fontSize: "12px",
    fontWeight: "bold",
    backgroundColor: buttonTextColor,
    color: themeColor,
    '&:hover': {
      backgroundColor: buttonTextColor,
    }
  },
}));