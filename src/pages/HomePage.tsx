import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  Collapse,
  RadioGroup,
  CardActions,
  FormControlLabel,
  Radio,
  useTheme,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { showSnackbar } from '../store/snackbarSlice';
import { ru } from 'date-fns/locale';
import {
  ChildCare,
  DirectionsBoat,
  Email,
  ExpandMore,
  Home,
  House,
  LocationOn,
  Person,
  Pets,
  Phone,
  Stars,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { options } from '../data/options';
import { services } from '../data/services';
import '../styles/main.css';
import {
  checkDateAvailability,
  createBooking,
  fetchAvailableDates,
  resetBookingState,
} from '../store/bookingSliceThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, LoginState, RootState } from '../interfaces';

export function HomePage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const user = useSelector((state: LoginState) => state.login.user);
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState('estate');
  const [bookingData, setBookingData] = useState({
    checkInDate: null as Date | null,
    checkOutDate: null as Date | null,
    option: '',
    adults: 0,
    children: 0,
    hasPets: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const bookingState = useSelector((state: RootState) => state.booking); 
  const navigate = useNavigate();
  const now = new Date();

  const isDateUnavailable = (date: Date) => {
    if (!bookingState.availability.unavailableDates) return false;
    return bookingState.availability.unavailableDates.some((unavailableDate: string | number | Date) => {
      return new Date(unavailableDate).toDateString() === date.toDateString();
    });
  };

  useEffect(() => {
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      dispatch(
        checkDateAvailability({
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
        })
      );
    } else {
      dispatch(resetBookingState());
    }
  }, [bookingData.checkInDate, bookingData.checkOutDate, dispatch]);

  useEffect(() => {
    dispatch(fetchAvailableDates());
  }, [dispatch]);

  useEffect(() => {
    if (bookingState.status === 'failed' && bookingState.error) {
      dispatch(showSnackbar(`Ошибка бронирования: ${bookingState.error}`));
      dispatch(resetBookingState());
    }
  }, [bookingState.status, bookingState.error, dispatch]);

  useEffect(() => {
    if (bookingState.availability.status === 'failed' && bookingState.availability.error) {
      dispatch(showSnackbar(`Ошибка проверки дат: ${bookingState.availability.error}`));
    }
  }, [bookingState.availability.status, bookingState.availability.error, dispatch]);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        const section = document.getElementById(location.state.scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          if (location.state.hash) {
            window.history.replaceState(null, '', location.state.hash);
          }
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleBookingSubmit = async () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate || !bookingData.option) {
      dispatch(showSnackbar('Пожалуйста, заполните все обязательные поля'));
      return;
    }

    if (
      (bookingData.checkInDate && bookingData.checkInDate < now) ||
      (bookingData.checkOutDate && bookingData.checkOutDate < now)
    ) {
      dispatch(showSnackbar('Вы не можете выбрать дату в прошлом'));
      return;
    }

    if (
      bookingState.availability.status === 'succeeded' &&
      !bookingState.availability.isAvailable
    ) {
      dispatch(showSnackbar('Выбранные даты уже заняты. Пожалуйста, выберите другие даты.'));
      return;
    }

     try {
    if (!user) { // проверка наличия пользователя
      dispatch(showSnackbar('Для бронирования необходимо войти в систему'));
      navigate('/login');
      return;
    }

    const resultAction = await dispatch(createBooking(bookingData));
    
    if (createBooking.fulfilled.match(resultAction)) {
      navigate('/profile');
    }
  } catch (error) {
    console.error('Booking error:', error);
    dispatch(showSnackbar('Ошибка бронирования. Пожалуйста, войдите в систему.'));
  }
  };

  useEffect(() => {
    if (bookingState.status === 'failed' && bookingState.error) {
      dispatch(showSnackbar(`Ошибка бронирования: ${bookingState.error}`));
      dispatch(resetBookingState());
    }
  }, [bookingState.status, bookingState.error, dispatch]);

  const handleExpandClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleFormChange = (field: string, value: string | number | boolean | Date | null) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectedPackage = options.find((opt) => opt.id === selectedOption);

  if (!selectedPackage) {
    return null;
  }
  return (
    <Container maxWidth="lg" className="container" >
      <Box id="main-section" className="hero" >
        <CardMedia
          component="img"
          className="heroImage"
          image="/main-photo.jpg"
          alt="Агроусадьба"
        />
        <Box className="heroContent">
          <Typography variant="h3" component="h1" className="heroTitle" gutterBottom>
            Добро пожаловать в нашу агроусадьбу!
          </Typography>
          <Typography variant="h6" className="heroSubtitle">
            Отдых в живописном месте с комфортом и уютом
          </Typography>
        </Box>
      </Box>

      <Box id="about-us-section" className="section">
        <Typography variant="h4" className="sectionTitle" gutterBottom>
          Наши услуги
        </Typography>

        <Box className="servicesGrid">
          {services.map((service, index) => (
            <Card key={index} className={`serviceCard ${expandedCard === index ? 'expanded' : ''}`}>
              <Box className="serviceCardContent">
                <CardMedia
                  component="img"
                  className="serviceMedia"
                  image={service.img}
                  alt={service.title}
                />
                <CardContent>
                  <Typography variant="h6" className="serviceTitle" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Box>

              <CardActions
                className="serviceCardActions"
                disableSpacing
                sx={{ justifyContent: 'center' }}
              >
                <Button
                  size="small"
                  className="button secondaryButton"
                  endIcon={
                    <ExpandMore
                      sx={{
                        transform: expandedCard === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  }
                  onClick={() => handleExpandClick(index)}
                >
                  {expandedCard === index ? 'Свернуть' : 'Подробнее'}
                </Button>
              </CardActions>

              <Collapse in={expandedCard === index} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{service.details}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Варианты аренды */}
      <Box id="services-section" className="rentalOptions">
        <Typography variant="h4" className="sectionTitle" gutterBottom>
          Варианты аренды
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                aria-label="rental options"
                name="rental-options"
                value={selectedOption}
                onChange={handleChange}
              >
                {options.map((option) => (
                  <Card
                    key={option.id}
                    className={`optionCard ${selectedOption === option.id ? 'selectedOption' : ''}`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControlLabel
                        value={option.id}
                        control={<Radio color="primary" />}
                        label={
                          <Box sx={{ ml: 1 }}>
                            <Typography variant="h6">{option.title}</Typography>
                            <Typography className="priceSelected">{option.price}</Typography>
                          </Box>
                        }
                        sx={{ flexGrow: 1, p: 2 }}
                      />
                    </Box>
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card className="packageCard">
              <CardMedia
                component="img"
                className="packageMedia"
                image={selectedPackage.image}
                alt={selectedPackage.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" className="packageTitle">
                  {selectedPackage.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedPackage.description}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  <strong>Цена:</strong> {selectedPackage.price}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  Включено в пакет:
                </Typography>
                <ul style={{ paddingLeft: 20 }}>
                  {selectedPackage.includes.map((item, index) => (
                    <li key={index}>
                      <Typography variant="body2">{item}</Typography>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="contained"
                  className="button"
                  size="large"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => {
                    const element = document.getElementById('reservation-section');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Забронировать этот вариант
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Карта */}
      <Box className="location-section" textAlign="center">
        <Typography variant="h4" className="sectionTitle" gutterBottom>
          Наше местоположение
        </Typography>

        <Box className="map-container">
          <iframe
            title="Карта агроусадьбы"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A2ee44173372ce49e1f2ccced87bd8a9f3185cb56c7c4a41060b3a6fe26c4df47&source=constructor"
            className="map"
          ></iframe>

          <Box className="map-overlay">
            <Box className="address-info">
              <LocationOn className="address-icon" />
              <Box className="address-text">
                <Typography variant="h6">Адрес агроусадьбы</Typography>
                <Typography variant="body1">
                  Беларусь, Гродненская область,
                  <br />
                  деревня Игнатовичи, 12
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Бронирование */}
      <Box id="reservation-section" className="booking-section" textAlign="center">
        <Typography variant="h4" className="sectionTitle" gutterBottom>
          Забронируйте свой отдых
        </Typography>

        <Paper elevation={0} className="booking-form">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} className="booking-field">
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                <DatePicker
                  label="Дата заезда"
                  value={bookingData.checkInDate}
                  onChange={(date) => handleFormChange('checkInDate', date)}
                  format="dd MMMM yyyy"
                  minDate={new Date()}
                  shouldDisableDate={isDateUnavailable}
                  slots={{ textField: TextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error:
                        bookingState.availability.status === 'succeeded' &&
                        !bookingState.availability.isAvailable &&
                        bookingData.checkInDate !== null &&
                        bookingData.checkOutDate !== null,
                      helperText:
                        bookingState.availability.status === 'succeeded' &&
                        !bookingState.availability.isAvailable &&
                        bookingData.checkInDate !== null
                          ? 'Выбранные даты заняты'
                          : '',
                    },
                    day: {
                      sx: {
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                        '&.Mui-disabled:not(.Mui-selected)': {
                          color: theme.palette.text.disabled,
                        },
                        '&.MuiPickersDay-today': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    },
                  }}
                  className="booking-calendar"
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6} className="booking-field">
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                <DatePicker
                  label="Дата выезда"
                  value={bookingData.checkOutDate}
                  onChange={(date) => handleFormChange('checkOutDate', date)}
                  format="dd MMMM yyyy"
                  minDate={bookingData.checkInDate || new Date()}
                  shouldDisableDate={isDateUnavailable}
                  slots={{ textField: TextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error:
                        bookingState.availability.status === 'succeeded' &&
                        !bookingState.availability.isAvailable &&
                        bookingData.checkInDate !== null &&
                        bookingData.checkOutDate !== null,
                      helperText:
                        bookingState.availability.status === 'succeeded' &&
                        !bookingState.availability.isAvailable &&
                        bookingData.checkOutDate !== null
                          ? 'Выбранные даты заняты'
                          : '',
                    },
                    day: {
                      sx: {
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                        '&.Mui-disabled:not(.Mui-selected)': {
                          color: theme.palette.text.disabled,
                        },
                        '&.MuiPickersDay-today': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    },
                  }}
                  className="booking-calendar"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} className="booking-field">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Вариант аренды</InputLabel>
                <Select
                  label="Вариант аренды"
                  value={bookingData.option}
                  onChange={(e) => handleFormChange('option', e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  <MenuItem value="Только домик">
                    <Box display="flex" alignItems="center">
                      <Home style={{ marginRight: 8 }} />
                      Только домик
                    </Box>
                  </MenuItem>
                  <MenuItem value="Усадьба+конюшня">
                    <Box display="flex" alignItems="center">
                      <House style={{ marginRight: 8 }} />
                      Усадьба+конюшня
                    </Box>
                  </MenuItem>
                  <MenuItem value="Усадьба+байдарки">
                    <Box display="flex" alignItems="center">
                      <House style={{ marginRight: 8 }} />
                      <DirectionsBoat style={{ marginRight: 8 }} />
                      Усадьба+байдарки
                    </Box>
                  </MenuItem>
                  <MenuItem value="Полный пакет">
                    <Box display="flex" alignItems="center">
                      <Stars style={{ marginRight: 8 }} />
                      Полный пакет
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className="booking-field">
              <TextField
                label="Количество взрослых"
                type="number"
                variant="outlined"
                fullWidth
                value={bookingData.adults}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  handleFormChange('adults', Math.max(1, value));
                }}
                inputProps={{
                  min: 1, 
                }}
                error={bookingData.adults < 1} 
                helperText={bookingData.adults < 1 ? 'Должен быть хотя бы один взрослый' : ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="booking-field">
              <TextField
                label="Количество детей"
                type="number"
                variant="outlined"
                fullWidth
                value={bookingData.children}
                onChange={(e) =>
                  handleFormChange('children', Math.max(0, parseInt(e.target.value) || 0))
                }
                inputProps={{
                  min: 0, 
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ChildCare />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} className="booking-field">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Животные</InputLabel>
                <Select
                  label="Животные"
                  value={bookingData.hasPets ? 1 : 0}
                  onChange={(e) => handleFormChange('hasPets', e.target.value === 1)}
                  startAdornment={
                    <InputAdornment position="start">
                      <Pets />
                    </InputAdornment>
                  }
                >
                  <MenuItem value={0}>Без животных</MenuItem>
                  <MenuItem value={1}>С животными</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <button
                className="booking-submit-btn"
                onClick={handleBookingSubmit}
                disabled={
                  !bookingData.checkInDate ||
                  !bookingData.checkOutDate ||
                  !bookingData.option ||
                  bookingState.status === 'loading'
                }
              >
                {bookingState.status === 'loading' ? (
                  <>
                    <CircularProgress size={24} color="inherit" />
                    <span style={{ marginLeft: 10 }}>Обработка...</span>
                  </>
                ) : (
                  'Подтвердить бронирование'
                )}
              </button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      {/* Контакты */}
      <Box id="contacts-section" className="section">
        <Typography variant="h4" className="sectionTitle" gutterBottom>
          Контакты
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            gap: 3,
            mt: 4,
          }}
        >
          <Box
            className="contactItem"
            sx={{
              flex: 1,
              maxWidth: { sm: 'calc(33.333% - 16px)' },
            }}
          >
            <LocationOn className="contactIcon" />
            <Typography variant="h6" className="contactTitle" gutterBottom>
              Адрес
            </Typography>
            <Typography variant="body1">
              Беларусь, Гродненская область
              <br />
              деревня Игнатовичи, 12
            </Typography>
          </Box>
          <Box
            className="contactItem"
            sx={{
              flex: 1,
              maxWidth: { sm: 'calc(33.333% - 16px)' },
            }}
          >
            <Phone className="contactIcon" />
            <Typography variant="h6" className="contactTitle" gutterBottom>
              Телефон
            </Typography>
            <Typography variant="body1">
              +375 (29) 783-30-82
              <br />
              +375 (29) 587-63-09
            </Typography>
          </Box>

          <Box
            className="contactItem"
            sx={{
              flex: 1,
              maxWidth: { sm: 'calc(33.333% - 16px)' },
            }}
          >
            <Email className="contactIcon" />
            <Typography variant="h6" className="contactTitle" gutterBottom>
              Email & Соцсети
            </Typography>
            <Typography variant="body1">
              info@agrousadba.com
            
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
