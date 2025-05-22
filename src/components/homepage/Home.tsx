import React from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import videoBackground from "../../video/video.mp4";

const Home: React.FC = () => {
  const navigate = useNavigate();

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
      {/* Video Background */}
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
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            alignItems="center"
          >
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Welcome
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(to right, #36d1dc, #5b86e5)",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(to right, #5b86e5, #36d1dc)",
                },
              }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "#5b86e5",
                color: "#5b86e5",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
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
