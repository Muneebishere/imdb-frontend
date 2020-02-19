import { makeStyles } from '@material-ui/core/styles';
import { themeColor } from './theme'

export const watchListNavButton = makeStyles(theme => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "30%",
    borderColor: "#000000",
    backgroundColor: "#000000",
    color: "#000000",
    marginLeft: "4px",
    alignContent: "center",
    height: "18px",
    '& svg': {
    margin: theme.spacing(0.5),
    },
    '& hr': {
    margin: theme.spacing(0, 0.5),
    },
  },
  text: {
      fontSize: 12,
      color: themeColor,
      marginLeft: "4px",
      marginRight: "4px",
      fontWeight: "bold"  
    }
}));