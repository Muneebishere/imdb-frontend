import { makeStyles } from '@material-ui/core/styles';
import { themeColor } from './theme'

export const highlightedText = makeStyles(theme => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    borderColor: themeColor,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
    margin: theme.spacing(0.5),
    },
    '& hr': {
    margin: theme.spacing(0, 0.5),
    },
  },
  contentRating: {
      fontSize: 14,
      color: '#757575',
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      fontWeight: "bold",
  }
}));