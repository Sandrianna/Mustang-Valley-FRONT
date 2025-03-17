import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../store/snackbarSlice.ts";
import { fetchGallery } from "../store/gallerySliceThunk.js";
import { useNavigate } from "react-router";

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

export function Gallery() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.gallery.status);
  const images = useSelector((state) => state.gallery.images);
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();



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
          onClick={()=>{dispatch(fetchGallery())}}
        >
          Загрузить картинки
        </Button>

        {status === "loading" && (
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
