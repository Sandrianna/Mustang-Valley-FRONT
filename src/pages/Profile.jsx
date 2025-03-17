import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, clearProfile } from "../store/profileSliceThunk.js";
import { logout } from "../store/loginSliceThunk.js";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.login.user);
  const status = useSelector((state) => state.profile.status);

  useEffect(() => {
    dispatch(fetchProfile());

    return () => {
      dispatch(clearProfile());
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", marginTop: 9 }}
      >
        {status === "loading" && (
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
          onClick={() => dispatch(logout())}
          sx={{ marginTop: 3 }}
        >
          Выйти
        </Button>
      </Paper>
    </Container>
  );
}
