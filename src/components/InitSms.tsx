import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSmsVerify, setCode } from '../store/SmsSliceThunk.ts';
import { Button, Typography, TextField, Container, Box } from '@mui/material';
//import { fetchLogin } from '../store/loginSliceThunk.ts';
import { AppDispatch, SmsState} from '../interfaces/index.ts';

export function InitSms(){
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const sessionId = useSelector((state: SmsState) => state.sms.sessionId);
    const code = useSelector((state: SmsState) => state.sms.code);

    const handleVerify = async() => {
        const result = await dispatch(fetchSmsVerify({sessionId, code}));
        if(fetchSmsVerify.fulfilled.match(result)) {
            navigate("/profile");
        } else {
            alert("Неверный код!");
        }
    };

    return(
        <Container>
            <Box>
                <Typography variant='h5'>Введите код из SMS</Typography>
                <TextField
                    label="Код"
                    variant="outlined"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    fullWidth
                    margin='normal'
                />
                <Button variant='contained' color='primary' onClick={handleVerify} sx={{marginTop: 3}}>
                    Подтвердить
                </Button>
            </Box>
        </Container>
    )
}
