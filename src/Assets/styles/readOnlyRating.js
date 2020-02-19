import { makeStyles } from '@material-ui/core/styles';
import { themeColor } from './theme'

export const readOnlyRating = makeStyles(theme => ({
  rating: {
    marginBottom: theme.spacing(0)
  },
  ratingText: {
    fontWeight: "bold",
    color: themeColor
  }
}));
