import { makeStyles } from '@material-ui/core/styles';
import { themeColor, boxShadow } from './theme'

export const descriptionCard = makeStyles(theme => ({
  root: {
    maxWidth: '50%',
    width: 'inherit',
    boxShadow: boxShadow
  },
  title: {
    color: themeColor,
    fontWeight: "bold",
  },
  castHeading: {
    fontSize: 14,
    color: themeColor,
    fontWeight: "bold",
  },
  castNames: {
    fontSize: 14,
    marginLeft: theme.spacing(1)
  }
}));