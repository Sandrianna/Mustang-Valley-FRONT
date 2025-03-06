import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
import { useErrorMessage } from "../context/ErrorProvider.jsx";
import { useSnackbar } from "../context/SnackbarProvider.jsx";
import { Button, Typography, TextField, Snackbar, Alert  } from "@mui/material";
import axios from "axios";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const { openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage } =
    useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSnackbarMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        {
          username: data.username.trim(),
          password: data.password.trim(),
        },
        { withCredentials: true }
      );
      setSnackbarMessage("Регистрация прошла успешно!");
      setOpenSnackbar(true);
      await login(data.username);
      navigate("/profile");
    } catch (err) {
      setSnackbarMessage("Ошибка регистрации:" + err.response?.data?.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason == "clickway") return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Регистрация
        </Typography>
        <TextField
          label="Имя пользователя"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("username", {
            required: "Имя обязательно!",
            validate: (value) =>
              /^\S+$/.test(value) ||
              "Имя не должно содержать пробелов или пустых строк!",
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        ></TextField>
        <TextField
          label="Пароль"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          {...register("password", {
            required: "Пароль обязателен!",
            validate: (value) =>
              /^\S+$/.test(value) ||
              "Пароль не должен содержать пробелов или пустых строк!",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        ></TextField>
        <Button
          type="sumbit"
          variant="contained"
          color="primary"
          className="btn--submit"
          sx={{ marginTop: 3 }}
        >
          Зарегистрироваться
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
