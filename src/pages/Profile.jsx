import { useState, useEffect } from "react";
import { useErrorMessage } from "../context/ErrorProvider.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import useLogIn from "../hooks/useLogIn.jsx";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function Profile() {
  const { user, logout} = useAuth();
  const { setErrorMessage } = useErrorMessage();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useLogIn();


  useEffect(() => {
    if(!user) return;

    axios
      .get("http://localhost:3000/auth/profile", {withCredentials: true})
      .then((response) => {
        setProfile(response.data);
      })

      .catch(() => {
        setErrorMessage("Ошибка загрузки профиля");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", marginTop: 9 }}
      >
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
            <CircularProgress />
          </Box>
        )}
        <Typography variant="h5" gutterBottom>
          {user?.username
            ? `Добро пожаловать, ${user.username}!`
            : "Проверка входа"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          sx={{ marginTop: 3 }}
        >
          Выйти
        </Button>
      </Paper>
    </Container>
  );
}
