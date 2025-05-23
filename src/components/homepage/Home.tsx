import React from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import videoBackground from "../../video/video.mp4";
import styles from './styles.module.css'; 

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.backgroundContainer}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoBackground}
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container maxWidth="sm" className={styles.contentContainer}>
        <Paper elevation={6} className={styles.paper}>
          <Box display="flex" flexDirection="column" gap={3} alignItems="center">
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Welcome
            </Typography>
            <Button
              fullWidth
              variant="contained"
              className={styles.buttonGradient}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              className={styles.buttonOutlined}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
