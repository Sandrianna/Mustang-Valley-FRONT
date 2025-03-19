import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchSignUp } from '../store/signSliceThunk.ts';
import { Button, Typography, TextField } from '@mui/material';
import { fetchLogin } from '../store/loginSliceThunk.ts';
import { AppDispatch, UsernamePassword } from '../interfaces/index.ts';

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernamePassword>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: UsernamePassword) => {
    const resultAction = await dispatch(fetchSignUp(data));
    if (fetchSignUp.fulfilled.match(resultAction)) {
      const loginResult = await dispatch(fetchLogin(data));
      if (fetchLogin.fulfilled.match(loginResult)) {
        navigate('/profile');
      }
    }
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
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
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
          className="btn--submit"
          sx={{ marginTop: 3 }}
        >
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
}
