import { makeStyles } from '@material-ui/core/styles';
import { themeColor, boxShadow } from './theme'

export const castList = makeStyles(theme => ({
  root: {
    width: '100%',
    minWidth: 500,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
    boxShadow: boxShadow
  },
  characterName: {
    display: 'inline',
    color: themeColor,
    marginLeft: theme.spacing(0.5),
  },
  actorName: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    fontWeight: "bold",
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    border: '1px solid',
    borderColor: themeColor,
  },
  subHeading: {
    paddingTop: theme.spacing(1),
    fontSize: 22,
    color: themeColor,
    fontWeight: "bold",
    marginBottom: "-15px",
  }
}));