import { makeStyles } from '@material-ui/core/styles';
import { themeColor } from './theme'

export const watchListGrid = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%'
  },
  title: {
    color: themeColor,
    fontWeight: "bold",
    fontSize: "14px"
  },
  rating: {
    color: themeColor,
    fontWeight: "bold",
    marginRight: "5px"
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)',
  },
  listTile: {
    width: '16% !important',
    marginLeft: "5px",
  },
  iconBtn: {
    padding: "0px 8px 0px 0px",
    fontSize: "22px"
  },
  icon: {
    color: themeColor,
    fontWeight: "bold",
    fontSize: "22px"
  },
  img: {
    cursor: "pointer",
  }
}));
