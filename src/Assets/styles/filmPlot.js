import { makeStyles } from '@material-ui/core/styles';
import { themeColor } from './theme'

export const filmPlot = makeStyles(theme => ({
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