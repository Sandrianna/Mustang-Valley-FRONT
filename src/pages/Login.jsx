import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage } from "../store/errorSlice.ts";
import { showSnackbar, closeSnackbar } from "../store/snackbarSlice.ts";
import { useAuth } from "../context/AuthProvider.jsx";
import {
  Button,
  Typography,
  TextField,
  Alert,
  Box,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import "../styles/index.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const openSnackbar = useSelector((state) => state.snackbar.open);
  const snackbarMessage = useSelector((state) => state.snackbar.message);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  useEffect(() => {
    if (errorMessage) {
      dispatch(showSnackbar(errorMessage));
    }
  }, [errorMessage]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          username: data.username.trim(),
          password: data.password.trim(),
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        login(data.username);
        navigate("/profile");
      }
    } catch (error) {
      if (error.response) {
        const errorText = error.response?.data.message || "Ошибка при входе";
        dispatch(showSnackbar(errorText));
      }
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom align="center">
          Форма входа
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
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
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
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="btn--submit"
          sx={{ marginTop: 3 }}
        >
          Войти
        </Button>
        <Box textAlign="center" marginTop={3}>
          <Typography variant="body2">
            Все еще не зарегистрированы?
            <Link component={NavLink} to="/registration" variant="body2">
              Зарегистрироваться
            </Link>
          </Typography>
        </Box>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => dispatch(closeSnackbar())} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
