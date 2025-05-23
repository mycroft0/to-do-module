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
import useSignIn from "./useSignIn";
import HomeIcon from "@mui/icons-material/Home";
import videoBackground from "../../video/video.mp4";
import styles from "./styles.module.css"; // ✅ Import CSS Module

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
    <Box className={styles.root}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.video}
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper elevation={6} className={styles.paper}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h4" textAlign="center" fontWeight="bold">
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

            <Button
              variant="contained"
              onClick={handleSignIn}
              className={styles.signInButton}
              fullWidth
            >
              Sign In
            </Button>

            {message && (
              <Alert severity={error ? "error" : "success"}>{message}</Alert>
            )}
          </Box>
        </Paper>

        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          className={styles.backButton}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default SignIn;
