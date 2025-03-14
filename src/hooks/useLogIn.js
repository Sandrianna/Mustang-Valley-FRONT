import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider.jsx";
import { useDispatch } from "react-redux"; 
import { setErrorMessage} from "../store/errorSlice.ts";

export default function useLogIn() {
  const dispatch = useDispatch();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          dispatch(setErrorMessage("Неверный логин или пароль!"));
          setUser(null);
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, setErrorMessage]);
}
