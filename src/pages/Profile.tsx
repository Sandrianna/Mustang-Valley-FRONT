import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '../store/profileSliceThunk.ts';
import { logout } from '../store/loginSliceThunk.ts';
import {  BookingResponse, RootState } from '../interfaces';
import { useNavigate } from 'react-router';
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Avatar,
  Divider,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import {
  Email,
  Phone,
  Person,
  Transgender,
  CalendarToday,
  LocationOn,
  Edit,
  Pets,
} from '@mui/icons-material';
import { AppDispatch, ProfileState } from '../interfaces/index.ts';
import '../styles/profile.css';
import { fetchUserBookings } from '../store/bookingSliceThunk.ts';

export function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: ProfileState) => state.profile.profileUser);
  
  const status = useSelector((state: ProfileState) => state.profile.status);
  const { bookings, status: bookingsStatus } = useSelector((state: RootState) => state.booking);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

 useEffect(() => {
  dispatch(fetchProfile());
}, [dispatch]);

  const handleBookNow = () => {
  if (location.pathname !== '/') {
    navigate('/', { state: { scrollTo: 'reservation-section' } });
  } else {
    const element = document.getElementById('reservation-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

  return (
    <Container maxWidth="lg" className="profile-container">
      {status === 'loading' ? (
        <Box className="profile-loading">
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper className="profile-card">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar className="profile-avatar" src={profile?.avatar || '/default-avatar.jpg'} />
                <Typography variant="h4" className="profile-title">
                  {profile?.firstName} {profile?.lastName}
                </Typography>

                <Chip
                  label={`@${profile?.username}`}
                  color="primary"
                  size="small"
                  className="profile-username"
                />

                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  className="profile-edit-btn"
                  onClick={() => navigate('/edit-profile')}
                >
                  Редактировать профиль
                </Button>

                <Divider className="profile-divider" />

                <List dense className="profile-info-list">
                  <ListItem>
                    <ListItemIcon className="email-icon">
                      <Email fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Email" secondary={profile?.email} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon className="phone-icon">
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Телефон" secondary={`+375 ${profile?.phone}`} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon className="gender-icon">
                      <Transgender fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Пол"
                      secondary={profile?.gender === 'male' ? 'Мужской' : 'Женский'}
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card className="profile-activity-card">
              <CardContent>
                <Typography variant="h5" className="profile-activity-title">
                  <CalendarToday className="profile-activity-icon" />
                  Предстоящие бронирования
                </Typography>

                {bookingsStatus === 'loading' ? (
                  <CircularProgress size={24} />
                ) : bookings.length > 0 ? (
                  <List className="booking-list">
                    {bookings.map((booking: BookingResponse) => {
                      const isPastBooking = new Date(booking.checkOutDate) < new Date();
                      return (
                        <ListItem
                          key={booking._id}
                          className={`booking-item ${isPastBooking ? 'past-booking' : ''}`}
                        >
                          <ListItemText
                            primary={
                              <>
                                {new Date(booking.checkInDate).toLocaleDateString()}
                                {' → '}
                                {new Date(booking.checkOutDate).toLocaleDateString()}
                                {isPastBooking && (
                                  <Chip
                                    label="Завершено"
                                    size="small"
                                    color="default"
                                    sx={{ ml: 1 }}
                                  />
                                )}
                              </>
                            }
                            secondary={
                              <>
                                <span
                                  className={`booking-badge option ${isPastBooking ? 'past' : ''}`}
                                >
                                  <LocationOn className="booking-info-icon" />
                                  {booking.option}
                                </span>
                                <span
                                  className={`booking-badge guests ${isPastBooking ? 'past' : ''}`}
                                >
                                  <Person className="booking-info-icon" />
                                  {booking.adults + booking.children} гостей
                                </span>
                                {booking.hasPets && (
                                  <span
                                    className={`booking-badge pets ${isPastBooking ? 'past' : ''}`}
                                  >
                                    <Pets className="booking-info-icon" />С животными
                                  </span>
                                )}
                              </>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  <Box className="profile-empty-bookings">
                    <Typography>У вас пока нет активных бронирований</Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  className="profile-book-btn"
                  onClick={handleBookNow}
                >
                  Забронировать сейчас
                </Button>
              </CardContent>
            </Card>

            <Card className="profile-activity-card">
              <CardContent>
                <Typography variant="h5" className="profile-activity-title">
                  <LocationOn className="profile-activity-icon" />
                  Мои предпочтения
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper className="profile-preference-card">
                      <Typography variant="subtitle1" className="profile-preference-title">
                        Любимые варианты
                      </Typography>
                      <Typography variant="body2" className="profile-preference-text">
                        {profile?.favoriteOptions || '—'}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper className="profile-preference-card">
                      <Typography variant="subtitle1" className="profile-preference-title">
                        Особые пожелания
                      </Typography>
                      <Typography variant="body2" className="profile-preference-text">
                        {profile?.specialWishes || '—'}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  className="profile-edit-preferences-btn"
                  onClick={() => navigate('/edit-preferences')}
                >
                  Редактировать предпочтения
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Button
        variant="contained"
        color="error"
        className="profile-logout-btn"
        onClick={() => dispatch(logout())}
      >
        Выйти из аккаунта
      </Button>
    </Container>
  );
}
