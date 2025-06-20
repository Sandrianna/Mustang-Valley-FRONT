import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, ProfileState } from '../interfaces';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { PhotoCamera } from '@mui/icons-material';
import '../styles/edit-profile.css';
import { updateProfile } from '../store/profileSliceThunk';

export function EditProfile() {
  const profile = useSelector((state: ProfileState) => state.profile.profileUser);
  const [form, setForm] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    phone: profile?.phone || '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string>(profile?.avatar || '/default-avatar.jpg');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const dispatch = useDispatch<AppDispatch>();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("Данные перед отправкой:", { ...form, avatarFile }); 

  const formData = new FormData();
  formData.append("firstName", form.firstName);
  formData.append("lastName", form.lastName);
  formData.append("phone", form.phone);

  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }

  try {
    console.log("Отправка данных на сервер...");
    await dispatch(updateProfile(formData));
    navigate("/profile");
  } catch (err) {
    console.error("Ошибка при обновлении профиля:", err);
  }
};
  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <Container maxWidth="sm" className="edit-profile-container">
      <Paper elevation={0} className="edit-profile-paper">
        <Typography variant="h4" gutterBottom className="edit-profile-title">
          Редактирование профиля
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            src={avatarPreview}
            alt="avatar"
            sx={{ width: 100, height: 100 }}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => fileInputRef.current?.click()}
            sx={{ position: 'relative', left: -40, top: 65,  background: 'rgba(255, 255, 255, 0.5)', width: 40, height:40 }}
          >
            <PhotoCamera />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Имя"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="edit-profile-field"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Фамилия"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="edit-profile-field"
          />
      
          <TextField
            fullWidth
            margin="normal"
            label="Телефон"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="edit-profile-field"
          />

          <Box mt={4} className="edit-profile-buttons-container">
            <Button
              variant="outlined"
              size="large"
              className="edit-profile-back-button"
              onClick={handleBack}
            >
              Назад
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="edit-profile-button"
            >
              Сохранить
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
