import { useForm } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../store/loginSliceThunk';
import { Button, Typography, TextField, Box, Link } from '@mui/material';
import '../styles/index.css';
import { AppDispatch, UsernamePassword } from '../interfaces';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernamePassword>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: UsernamePassword) => {
    const resultAction = await dispatch(fetchLogin(data));
    if (fetchLogin.fulfilled.match(resultAction)) {
      navigate('/profile');
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
          {...register('username', {
            required: 'Имя обязательно!',
            validate: (value) =>
              /^\S+$/.test(value) || 'Имя не должно содержать пробелов или пустых строк!',
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
          {...register('password', {
            required: 'Пароль обязателен!',
            validate: (value) =>
              /^\S+$/.test(value) || 'Пароль не должен содержать пробелов или пустых строк!',
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
    </>
  );
}
