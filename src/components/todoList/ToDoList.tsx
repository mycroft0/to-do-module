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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useToDoList from "./useToDoList";

const TodoApp: React.FC = () => {
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
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {currentUser?.login}'s ToDo List
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={3} maxWidth="600px" mx="auto">
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="New Todo"
            value={input}
            fullWidth
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </Box>

        <TextField
          label="Search"
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
        >
          <Tab label="Active" value="active" />
          <Tab label="Completed" value="completed" />
        </Tabs>

        <List>
          {paginatedTodos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <>
                  {!todo.completed && (
                    <IconButton
                      edge="end"
                      onClick={() => handleComplete(todo.id)}
                    >
                      <CheckCircleIcon color="success" />
                    </IconButton>
                  )}
                  <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                    <Delete color="error" />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={todo.text}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "gray" : "inherit",
                }}
              />
            </ListItem>
          ))}
        </List>

        {filteredTodos.length > ITEMS_PER_PAGE && (
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredTodos.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TodoApp;
