import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper, Stack } from '@mui/material';
import { updatePreferences } from '../store/profileSliceThunk';
import { AppDispatch, RootState } from '../interfaces/index';
import { useNavigate } from 'react-router';
import '../styles/edit-preferences.css'; 

export function EditPreferences() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.profile.profileUser);

  const [favoriteOptions, setFavoriteOptions] = useState(profile?.favoriteOptions || '');
  const [specialWishes, setSpecialWishes] = useState(profile?.specialWishes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    dispatch(updatePreferences({ 
      userId: profile._id, 
      favoriteOptions, 
      specialWishes 
    })).then(() => navigate('/profile')); 
  };

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <Paper elevation={0} className="preferences-container">
      <Typography variant="h5" className="preferences-title">
        Редактирование предпочтений
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Любимые варианты"
          value={favoriteOptions}
          onChange={(e) => setFavoriteOptions(e.target.value)}
          className="preferences-field"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Особые пожелания"
          value={specialWishes}
          onChange={(e) => setSpecialWishes(e.target.value)}
          className="preferences-field"
          multiline
          rows={4}
        />
        
        <Stack direction="row" spacing={2} className="preferences-buttons">
          <Button 
            variant="outlined" 
            onClick={handleBack}
            className="preferences-back-button"
          >
            Назад
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            className="preferences-save-button"
            disabled={!profile}
          >
            Сохранить
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}