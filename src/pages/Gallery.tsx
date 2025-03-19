import { useDispatch, useSelector } from 'react-redux';
import { fetchGallery } from '../store/gallerySliceThunk.ts';
import {
  Button,
  Container,
  Box,
  CircularProgress,
  Typography,
  ImageList,
  ImageListItem,
} from '@mui/material';
import '../styles/gallery.css';
import { AppDispatch, GalleryState } from '../interfaces/index.ts';

export function Gallery() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: GalleryState) => state.gallery.status);
  const images = useSelector((state: GalleryState) => state.gallery.images);

  return (
    <Container>
      <Box textAlign="center" my={9}>
        <Typography variant="h3" component="h1" gutterBottom>
          Галерея
        </Typography>
        <Button
          variant="contained"
          sx={{ padding: '15px' }}
          color="primary"
          onClick={() => {
            dispatch(fetchGallery());
          }}
        >
          Загрузить картинки
        </Button>

        {status === 'loading' && (
          <Box display="flex" justifyContent="center" sx={{ marginTop: '20px' }}>
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
