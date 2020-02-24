import { themeColor, boxShadow, buttonTextColor } from './theme'

export const watchlist = theme => ({
  title: {
    fontWeight: "bold",
    color: themeColor,
  },
  card: {
    boxShadow: boxShadow,
  },
  button: {
    fontWeight: "bold",
    backgroundColor: themeColor,
    color: buttonTextColor,
    '&:hover': {
      backgroundColor: themeColor,
    }
  },
});