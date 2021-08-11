const signinStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundImage: "url(/img/registration_counter.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: 'blue',
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

export default signinStyles;
