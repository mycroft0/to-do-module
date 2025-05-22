import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        mt={8}
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Welcome
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/signin")}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
