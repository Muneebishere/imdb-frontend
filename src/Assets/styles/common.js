import { makeStyles } from '@material-ui/core/styles';
import { themeColor, boxShadow, buttonTextColor } from './theme'

export const commonStyles = makeStyles(theme => ({
  duration: {
    fontSize: 14,
    color: '#757575',
    marginLeft: theme.spacing(1),
    fontWeight: "bold"
  },
  width100: {
    width: '100%'
  },
  title: {
    fontWeight: "bold",
    color: themeColor,
  },
  wrapText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  marginNav: {
    marginTop: "6px"
  },
  noTextTransform: {
    textTransform: "none"
  },
  card: {
    boxShadow: boxShadow,
  },
  btnTheme1: {
    fontWeight: "bold",
    backgroundColor: themeColor,
    color: buttonTextColor,
    '&:hover': {
      backgroundColor: themeColor,
    }
  },
  btnTheme2: {
    fontWeight: "bold",
    backgroundColor: buttonTextColor,
    color: themeColor,
    '&:hover': {
      backgroundColor: buttonTextColor,
    }
  }

}));