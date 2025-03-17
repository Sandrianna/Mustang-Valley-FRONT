import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux"; 
import { showSnackbar } from "../store/snackbarSlice.ts";

export function useLogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          dispatch(showSnackbar("Неверный логин или пароль!"));
 
          navigate("/login");
        }
        else if(error.response.status === 400) {
          dispatch(showSnackbar("Уже существует пользователь с таким логином!"));
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, showSnackbar]);
}
