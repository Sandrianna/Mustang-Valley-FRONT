import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export function Home() {
  const user = useSelector((state) => state.login.user);
  return (
    <AppBar position="fixed" sx={{ width: "100%", top: 0, left: 0, zIndex: 1 }}>
      <Toolbar>
        <Box display="flex" gap={2}>
          <Button color="inherit" component={NavLink} to="/">
            Главная
          </Button>
          <Button color="inherit" component={NavLink} to="/gallery">
            Галерея
          </Button>
        </Box>

        <Box marginLeft="auto">
          <Button
            color="inherit"
            component={NavLink}
            to={user ? "/profile" : "/login"}
          >
            {user ? "Профиль" : "Войти"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
