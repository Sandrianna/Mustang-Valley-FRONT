import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchSignUp } from '../store/signSliceThunk.ts';
import {
  Button,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { fetchLogin } from '../store/loginSliceThunk.ts';
import { AppDispatch, ExtendedUserForm} from '../interfaces/index.ts';
//import { fetchSmsInit } from '../store/SmsSliceThunk.ts';//


export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExtendedUserForm>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: ExtendedUserForm) => {
    const resultAction = await dispatch(fetchSignUp(data));
    if (fetchSignUp.fulfilled.match(resultAction)) {
      const loginResult = await dispatch(fetchLogin(data));
      if (fetchLogin.fulfilled.match(loginResult)) {
        navigate('/profile');
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Button variant="outlined" className="btn--back" onClick={() => navigate('/login')}>
        ← Назад
      </Button>

      <Typography variant="h4" gutterBottom textAlign="center">
        Регистрация
      </Typography>

      

      <TextField
        label="Логин"
        fullWidth
        margin="normal"
        {...register('username', {
          required: 'Логин обязателен!',
          validate: (value) => /^\S+$/.test(value) || 'Логин не должен содержать пробелов!',
        })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="Пароль"
        type="password"
        fullWidth
        margin="normal"
        {...register('password', {
          required: 'Пароль обязателен!',
          validate: (value) => /^\S+$/.test(value) || 'Пароль не должен содержать пробелов!',
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Имя"
        fullWidth
        margin="normal"
        {...register('firstName', {
          required: 'Имя обязательно!',
          validate: (value) => /^\S+$/.test(value) || 'Имя не должно содержать пробелов!',
        })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        label="Фамилия"
        fullWidth
        margin="normal"
        {...register('lastName', {
          required: 'Фамилия обязательна!',
          validate: (value) => /^\S+$/.test(value) || 'Фамилия не должна содержать пробелов!',
        })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />

      <TextField
        label="Почта"
        type="email"
        fullWidth
        margin="normal"
        {...register('email', {
          required: 'Почта обязательна!',
          pattern: {
            value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            message: 'Неверный формат почты!',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Номер телефона"
        type="tel"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <span style={{ marginRight: 8, fontSize: '0.9rem', color: '#555' }}>+375</span>
          ),
        }}
        {...register('phone', {
          required: 'Телефон обязателен!',
          pattern: {
            value: /^\d{9}$/,
            message: 'Введите 9 цифр после +375!',
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <FormControl fullWidth margin="normal" error={!!errors.gender}>
        <InputLabel id="gender-label">Пол</InputLabel>
        <Select
          labelId="gender-label"
          label="Пол"
          defaultValue=""
          {...register('gender', { required: 'Пол обязателен!' })}
        >
          <MenuItem value="male">Мужской</MenuItem>
          <MenuItem value="female">Женский</MenuItem>
        </Select>
        {errors.gender && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {errors.gender.message}
          </Typography>
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        className="btn--submit"
        sx={{ marginTop: 3 }}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
}
