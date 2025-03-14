import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../store/loadingSlice.ts";
import { setErrorMessage } from "../store/errorSlice.ts";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router";
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
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.load);

  useEffect(() => {
    if (!user) return navigate("/login");

    dispatch(startLoading());

    axios
      .get("http://localhost:3000/auth/profile", { withCredentials: true })
      .then((response) => {
        setProfile(response.data.user);
      })

      .catch(() => {
        dispatch(setErrorMessage("Ошибка загрузки профиля"));
        logout();
      })
      .finally(() => {
        dispatch(stopLoading());
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
          {profile?.username
            ? `Добро пожаловать, ${profile.username}!`
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
