import { NavLink } from "react-router";
import { useAuth } from "../context/AuthProvider";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function Home() {
  const { user } = useAuth();
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
