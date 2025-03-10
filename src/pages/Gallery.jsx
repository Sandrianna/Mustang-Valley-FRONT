import { useState } from "react";
import { useErrorMessage } from "../context/ErrorProvider.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import { useLoading } from "../context/LoadingProvider.jsx";
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
  const { setErrorMessage, clearErrorMessage } = useErrorMessage();
  const { loading, startLoading, stopLoading } = useLoading();
  const [images, setImages] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!user) {
      setErrorMessage("Вы не вошли в профиль!");
      navigate("/login");
      return;
    }

    startLoading();

    axios
      .get("https://dog.ceo/api/breeds/image/random/20")
      .then((response) => {
        setImages(response.data.message);
        clearErrorMessage();
      })
      .catch(() => {
        setErrorMessage("Ошибка загрузки изображений");
      })
      .finally(() => {
        stopLoading();
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
