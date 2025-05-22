import React from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tabs,
  Tab,
  Pagination,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useToDoList from "./useToDoList";
import { useNavigate } from "react-router-dom";
import videoBackground from "../../video/videoToDo.mp4";

const TodoApp: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleAdd,
    handleDelete,
    handleComplete,
    paginatedTodos,
    setFilter,
    setSearch,
    setPage,
    input,
    setInput,
    search,
    filter,
    filteredTodos,
    ITEMS_PER_PAGE,
    page,
    handleLogout,
    currentUser,
  } = useToDoList();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          filter: "brightness(0.7)",
        }}
        src={videoBackground}
      />

      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(50, 53, 62, 0.85)", 
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.30)",
          color: "#e0e0e0",
          zIndex: 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            {currentUser?.login}'s ToDo List
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "#90caf9",
              color: "#90caf9",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "bold",
              ml: 1,
              "&:hover": {
                backgroundColor: "rgba(144, 202, 249, 0.30)", 
                borderColor: "#64b5f6",
                color: "#64b5f6",
              },
            }}
          >
            Logout
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: "#90caf9",
              color: "#90caf9",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "bold",
              ml: 2,
              "&:hover": {
                backgroundColor: "rgba(144, 202, 249, 0.15)",
                borderColor: "#64b5f6",
                color: "#64b5f6",
              },
            }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
          px: 2,
        }}
      >
        <Container maxWidth="sm" sx={{ zIndex: 1 }}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#ffffffdd",
              backdropFilter: "blur(6px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
            }}
          >
            <Box display="flex" gap={2} mb={3}>
              <TextField
                label="New Todo"
                variant="outlined"
                value={input}
                fullWidth
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                sx={{ borderRadius: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(to right, #36d1dc, #5b86e5)",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(to right, #5b86e5, #36d1dc)",
                  },
                }}
              >
                Add
              </Button>
            </Box>

            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Tabs
              value={filter}
              onChange={(e, val) => {
                setFilter(val);
                setPage(1);
              }}
              centered
              TabIndicatorProps={{
                style: {
                  backgroundColor: filter === "active" ? "#36d1dc" : "#5b86e5",
                },
              }}
              sx={{
                mb: 2,
                "& .MuiTab-root": {
                  fontWeight: "bold",
                  color: "#1976d2",
                },
              }}
            >
              <Tab label="Active" value="active" />
              <Tab label="Completed" value="completed" />
            </Tabs>

            <List>
              {paginatedTodos.map((todo) => (
                <ListItem
                  key={todo.id}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: todo.completed ? "#e3f2fd" : "#ffffff",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: todo.completed ? "#bbdefb" : "#f0f4ff",
                    },
                  }}
                  secondaryAction={
                    <Box>
                      {!todo.completed && (
                        <IconButton
                          edge="end"
                          onClick={() => handleComplete(todo.id)}
                          aria-label="complete"
                          sx={{ color: "#5b86e5" }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      )}
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(todo.id)}
                        aria-label="delete"
                        sx={{ color: "#ff4b2b" }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={todo.text}
                    sx={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#757575" : "#212121",
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {filteredTodos.length > ITEMS_PER_PAGE && (
              <Box mt={3} display="flex" justifyContent="center">
                <Pagination
                  count={Math.ceil(filteredTodos.length / ITEMS_PER_PAGE)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  shape="rounded"
                />
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default TodoApp;
