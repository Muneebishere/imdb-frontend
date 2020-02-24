import { makeStyles } from '@material-ui/core/styles';
import { themeColor, boxShadow } from './theme'

export const reviewList = makeStyles(theme => ({
  root: {
    maxWidth: 640,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    boxShadow: boxShadow
  },
  container: {
    width: '50%'
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