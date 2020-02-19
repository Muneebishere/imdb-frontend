import grey from '@material-ui/core/colors/grey';
import { themeColor } from './theme'

export const navigation = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3)
  },
  navbar: {
    backgroundColor: themeColor,
    color: grey[900]
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  loginButton: {
    '&:hover': {
      color: grey[900],
    }
  },
  sidelist: {
    width: 250,
  },
  drawer: {
    backgroundColor: themeColor
  },
  linkStyle: {
    '&:hover': {
      textDecoration: 'none',
      color: 'inherit'
    }
  },
  watchListButton: {
    textTransform: "none"
  },
  divider: {
    height: "28px",
    backgroundColor: grey[900],
    marginLeft: "4px",
    marginRight: "4px",
    marginTop: "10px",
    marginBottom: "10px"
  }
});