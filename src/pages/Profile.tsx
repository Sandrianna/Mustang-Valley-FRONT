import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '../store/profileSliceThunk.ts';
import { logout } from '../store/loginSliceThunk.ts';
import { Button, Container, Typography, Paper, Box, CircularProgress } from '@mui/material';
import { AppDispatch, ProfileState } from '../interfaces/index.ts';

export function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: ProfileState) => state.profile.profileUser);
  const status = useSelector((state: ProfileState) => state.profile.status);

  useEffect(() => {
    dispatch(fetchProfile());

    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginTop: 9 }}>
        {status === 'loading' && (
          <Box display="flex" justifyContent="center" sx={{ marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        )}
        <Typography variant="h5" gutterBottom>
          {profile?.username ? `Добро пожаловать, ${profile.username}!` : 'Проверка входа'}
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
