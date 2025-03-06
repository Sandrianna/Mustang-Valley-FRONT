import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useErrorMessage } from "../context/ErrorProvider";

export default function useLogIn() {
  const { setErrorMessage } = useErrorMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Вы не вошли в профиль!");
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
