import { makeStyles } from '@material-ui/core/styles';
import { themeColor, boxShadow } from './theme'

export const reviewList = makeStyles(theme => ({
  root: {
    width: 'inherit',
    maxWidth: 640,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    boxShadow: boxShadow
  },
  inline: {
    display: 'inline',
  },
  subHeading: {
    paddingTop: theme.spacing(1),
    fontSize: 22,
    color: themeColor,
    fontWeight: "bold",
  },
  reviewHeading: {
    color: themeColor,
    fontWeight: "bold",
  }
}));