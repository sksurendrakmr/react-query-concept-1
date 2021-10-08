import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
const routes = [
  { name: "Home", path: "/", activeIndex: 0 },
  { name: "Traditional Superheros", path: "/tradition", activeIndex: 1 },
  { name: "RQ Superheros", path: "/rq", activeIndex: 2 },
];

const useStyle = makeStyles((theme) => ({
  toolMargin: {
    ...theme.mixins.toolbar,
  },
  textLink: {
    color: "white",
    opacity: 0.9,
    textDecoration: "none",
    "&:hover": {
      opacity: 1,
    },
    // "&.active": {
    //   opacity: 1,
    //   color: "tomato",
    // },
  },
  activeStyle: {
    opacity: 1,
  },
}));

const Header = () => {
  const classes = useStyle();
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar variant='dense'>
          {routes.map((route, index) => (
            <Typography
              key={`${index}`}
              sx={{ fontWeight: 600, flexGrow: 1 }}
              variant='body1'
              component={NavLink}
              to={route.path}
              className={classes.textLink}>
              {route.name}
            </Typography>
          ))}
        </Toolbar>
      </AppBar>
      <div className={classes.toolMargin} />
    </>
  );
};

export default Header;
