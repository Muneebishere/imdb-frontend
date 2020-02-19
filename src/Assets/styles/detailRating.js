import { makeStyles } from '@material-ui/core/styles';
import { themeColor } from './theme'

export const detailRating = makeStyles(theme => ({
  rating: {
    marginRight: theme.spacing(0.5)
  },
  ratingText: {
    fontWeight: "bold",
    color: themeColor,
    fontSize: 19,
    marginLeft: theme.spacing(0.5)
  },
  ratingHeading: {
    fontSize: 18,
    color: '#757575',
    fontWeight: "bold",
  },
  ratingTotal: {
    fontSize: 10,
    color: '#757575',
    fontWeight: "bold",
    marginTop: "10px",
    marginRight: theme.spacing(0.5)
  }
}));