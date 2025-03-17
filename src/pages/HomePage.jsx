import { Container, Typography, Box } from "@mui/material";

export function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="40vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Добро пожаловать на главную страницу!
        </Typography>
      </Box>
    </Container>
  );
}
