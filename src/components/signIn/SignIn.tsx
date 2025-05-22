import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import useSignIn from "./useSignIn";
import HomeIcon from '@mui/icons-material/Home';

const SignIn: React.FC = () => {
  const {
    login,
    setLogin,
    password,
    setPassword,
    message,
    handleSignIn,
    error,
    navigate,
  } = useSignIn();
  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" gap={2} mt={8}>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            position: "fixed",
            bottom: 24,
            left: 24,
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            boxShadow: 4,
            borderRadius: "50px",
            textTransform: "none",
            paddingX: 2,
          }}
        >
          Back to Home
        </Button>

        <Typography variant="h5" textAlign="center">
          Sign In
        </Typography>

        <TextField
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>

        {message && (
          <Alert severity={error ? "error" : "success"}>{message}</Alert>
        )}
      </Box>
    </Container>
  );
};

export default SignIn;
