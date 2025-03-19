import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { closeSnackbar } from '../store/snackbarSlice.ts';
import { SnackbarState } from '../interfaces/index.ts';

export function SnackbarComponent() {
  const dispatch = useDispatch();
  const openSnackbar = useSelector((state: SnackbarState) => state.snackbar.open);
  const snackbarMessage = useSelector((state: SnackbarState) => state.snackbar.message);

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => dispatch(closeSnackbar())}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={() => dispatch(closeSnackbar())} severity="error">
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
