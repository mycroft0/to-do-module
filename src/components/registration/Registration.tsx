import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import useRegistration from "./useRegistration";
import HomeIcon from "@mui/icons-material/Home";
import videoBackground from "../../video/video.mp4";
import styles from "./styles.module.css"; // ✅ Import the CSS module

const RegistrationForm: React.FC = () => {
  
  const {
    handleRegister,
    login,
    setLogin,
    password,
    setPassword,
    message,
    error,
    navigate
  } = useRegistration();

  return (
    <Box className={styles.root}>
      <video autoPlay loop muted playsInline className={styles.video}>
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper className={styles.paper} elevation={6}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              className={styles.backButton}
            >
              Back to Home
            </Button>

            <Typography variant="h4" textAlign="center" fontWeight="bold">
              Register
            </Typography>

            <TextField
              label="Login"
              variant="outlined"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              onClick={handleRegister}
              className={styles.registerButton}
              fullWidth
            >
              Register
            </Button>

            {message && (
              <Alert severity={error ? "error" : "success"}>{message}</Alert>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
