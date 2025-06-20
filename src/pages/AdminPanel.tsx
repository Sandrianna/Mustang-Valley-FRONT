import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from '../store/adminSlice';
import { fetchAllBookings, deleteBooking } from '../store/bookingSliceThunk';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
} from '@mui/material';
import { AppDispatch, BookingResponse, RootState, User } from '../interfaces';
import { Logout } from '@mui/icons-material';
import '../styles/admin-pannel.css';
import { logout } from '../store/loginSliceThunk.ts';
import { useNavigate } from 'react-router';


export function AdminPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<number>(0);

  const { users, status: usersStatus } = useSelector((state: RootState) => state.admin);
  const { bookings, status: bookingsStatus } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    if (tabValue === 0) {
      dispatch(fetchAllUsers());
    } else {
      dispatch(fetchAllBookings());
    }
  }, [dispatch, tabValue]);

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить это бронирование?')) {
      dispatch(deleteBooking(bookingId));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" className="admin-panel-container">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom className="admin-title">
          Панель администратора
        </Typography>
        
        <Tooltip title="Выйти из аккаунта">
          <IconButton 
            onClick={handleLogout}
            className="admin-logout-btn"
            sx={{ 
              marginBottom: '16px',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)'
              }
            }}
          >
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="admin-tabs">
        <Tabs value={tabValue} onChange={(_e: React.SyntheticEvent, newValue: number) => setTabValue(newValue)}>
          <Tab label="Пользователи" className="admin-tab"/>
          <Tab label="Бронирования" className="admin-tab"/>
        </Tabs>
      </Box>

      {tabValue === 0 ? (
        <Paper sx={{ mt: 3 }} className="admin-table-paper">
          {usersStatus === 'loading' ? (
            <Box className="admin-loading-container">
              <CircularProgress color='primary'/>
              <Typography className="admin-loading-text">Загрузка данных...</Typography>
            </Box>
          ) : (
            <TableContainer className="admin-table-container">
              <Table>
                <TableHead>
                  <TableRow className="admin-table-header">
                    <TableCell>ID</TableCell>
                    <TableCell>Имя</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Телефон</TableCell>
                    <TableCell>Роль</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user: User) => (
                    <TableRow key={user._id} className="admin-table-row">
                      <TableCell>{user._id}</TableCell>
                      <TableCell>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                          className="admin-delete-btn"
                        >
                          Удалить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      ) : (
        <Paper sx={{ mt: 3 }} className="admin-table-paper">
          {bookingsStatus === 'loading' ? (
            <Box className="admin-loading-container">
              <CircularProgress color='primary'/>
              <Typography className="admin-loading-text">Загрузка данных...</Typography>
            </Box>
          ) : (
            <TableContainer className="admin-table-container">
              <Table>
                <TableHead>
                  <TableRow className="admin-table-header">
                    <TableCell>ID</TableCell>
                    <TableCell>Пользователь</TableCell>
                    <TableCell>Даты бронирования</TableCell>
                    <TableCell>Вариант аренды</TableCell>
                    <TableCell>Взрослые</TableCell>
                    <TableCell>Дети</TableCell>
                    <TableCell>С животными?</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking: BookingResponse) => (
                    <TableRow key={booking._id} className="admin-table-row">
                      <TableCell>{booking._id}</TableCell>
                      <TableCell>
                        {typeof booking.userId === 'object' && booking.userId !== null
                          ? `${booking.userId.firstName} ${booking.userId.lastName}`
                          : `(ID: ${booking.userId})`}
                      </TableCell>
                      <TableCell>
                        {new Date(booking.checkInDate).toLocaleDateString()} -{' '}
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{booking.option}</TableCell>
                      <TableCell>{booking.adults}</TableCell>
                      <TableCell>{booking.children}</TableCell>
                      <TableCell>{booking.hasPets ? 'Да' : 'Нет'}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="admin-delete-btn"
                        >
                          Удалить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}
    </Container>
  );
}