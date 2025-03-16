import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../store/snackbarSlice.ts";
import { startLoading, stopLoading } from "../store/loadingSlice.ts";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Button,
  Container,
  Box,
  CircularProgress,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import "../styles/gallery.css";

export default function Gallery() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.load);
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!user) {
      dispatch(showSnackbar("Вы не вошли в профиль!"));
      navigate("/login");
      return;
    }

    dispatch(startLoading());

    axios
      .get("http://localhost:3000/users/me/images", { withCredentials: true })
      .then((response) => {
        setImages(response.data.message);
      })
      .catch(() => {
        dispatch(showSnackbar("Ошибка загрузки изображений"));
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  return (
    <Container>
      <Box textAlign="center" my={9}>
        <Typography variant="h3" component="h1" gutterBottom>
          Галерея
        </Typography>
        <Button
          variant="contained"
          sx={{ padding: "15px" }}
          color="primary"
          onClick={fetchData}
        >
          Загрузить картинки
        </Button>

        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <ImageList cols={4} gap={8}>
        {images.map((imageUrl, index) => (
          <ImageListItem key={index}>
            <img src={imageUrl} alt="Random Dog" width="100%" />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
