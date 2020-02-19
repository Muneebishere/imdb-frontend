import { makeStyles } from '@material-ui/core/styles';
import { themeColor, boxShadow } from './theme'

export const celebrityFilms = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    width: '100%',
    boxShadow: boxShadow
  },
  characterName: {
    display: 'inline',
    color: themeColor,
    marginLeft: theme.spacing(0.5),
  },
  filmCardContainer: {
    alignContent: 'center',
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