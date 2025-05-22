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
import { useNavigate } from "react-router-dom";
import videoBackground from "../../video/video.mp4"; 

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleRegister,
    login,
    setLogin,
    password,
    setPassword,
    message,
    error,
  } = useRegistration();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={6}
          sx={{
            p: 6, 
            borderRadius: 4,
            backgroundColor: "#ffffffdd",
            backdropFilter: "blur(6px)",
          }}
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                boxShadow: 4,
                borderRadius: "50px",
                textTransform: "none",
                paddingX: 2,
                alignSelf: "start",
              }}
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
              color="primary"
              onClick={handleRegister}
              sx={{
                background: "linear-gradient(to right, #36d1dc, #5b86e5)",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(to right, #5b86e5, #36d1dc)",
                },
              }}
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
