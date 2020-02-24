import { themeColor, buttonTextColor } from './theme'

export const signup = theme => ({
  paper: {
    marginTop: "60px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: "2px",
    backgroundColor: themeColor,
    color: buttonTextColor,
  },
  form: {
    marginTop: "20px",
    width: '100%', // Fix IE 11 issue.
    '& label.Mui-focused': {
      color: themeColor,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: themeColor,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: themeColor,
      },
    },
  },
  submit: {
    marginTop: "20px",
    marginBottom: "5px",
    fontWeight: "bold",
    backgroundColor: themeColor,
    color: buttonTextColor,
    '&:hover': {
      backgroundColor: themeColor,
    }
  },
  avatarBtn: {
    marginTop: "10px",
    fontWeight: "bold",
    backgroundColor: buttonTextColor,
    color: themeColor,
    '&:hover': {
      backgroundColor: buttonTextColor,
    }
  },
  user_avatar: {
    width: "100px",
    height: "100px",
  }
});