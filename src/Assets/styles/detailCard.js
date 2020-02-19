import { makeStyles } from '@material-ui/core/styles';
import { themeColor, boxShadow } from './theme'

export const detailCard = makeStyles(theme => ({
  card: {
    maxWidth: 750,
    width: 'fit-content',
    minWidth: 500,
    boxShadow: boxShadow
  },
  media: {
    height: 300,
    width: 200,
    border: '1px solid',
    borderColor: themeColor,
  }
}));