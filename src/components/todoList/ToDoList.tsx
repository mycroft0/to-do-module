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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useToDoList from "./useToDoList";
import videoBackground from "../../video/videoToDo.mp4";
import styles from "./styles.module.css";

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
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useToDoList();

  return (
    <Box className={styles.containerBox}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.videoBackground}
        src={videoBackground}
      />

      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" className={styles.toolbarTitle}>
            {currentUser?.login}'s ToDo List
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box className={styles.mainBox}>
        <Container maxWidth="sm" sx={{ zIndex: 1 }}>
          <Paper elevation={6} className={styles.paperCard}>
            <Box className={styles.todoInputGroup}>
              <TextField
                label="New Todo"
                variant="outlined"
                value={input}
                fullWidth
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
              <Button
                variant="contained"
                onClick={handleAdd}
                className={styles.addButton}
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
              className={styles.searchField}
            />

            <Box className={styles.sortControls}>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) =>
                    setSortBy(e.target.value as "name" | "createdAt")
                  }
                >
                  <MenuItem value="createdAt">Creation Date</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel id="sort-order-label">Order</InputLabel>
                <Select
                  labelId="sort-order-label"
                  value={sortOrder}
                  label="Order"
                  onChange={(e) =>
                    setSortOrder(e.target.value as "asc" | "desc")
                  }
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Tabs
              value={filter}
              onChange={(e, val) => {
                setFilter(val);
                setPage(1);
              }}
              centered
              className={styles.tabsRoot}
              classes={{
                indicator: styles.tabsIndicator,
              }}
            >
              <Tab label="Active" value="active" className={styles.tabRoot} />
              <Tab
                label="Completed"
                value="completed"
                className={styles.tabRoot}
              />
            </Tabs>

            <List>
              {paginatedTodos.map((todo) => (
                <ListItem
                  key={todo.id}
                  className={`${styles.todoListItem} ${
                    todo.completed
                      ? styles.todoListItemCompleted
                      : styles.todoListItemActive
                  }`}
                  sx={{
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
                        >
                          <CheckCircleIcon className={styles.completeButton} />
                        </IconButton>
                      )}
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(todo.id)}
                        aria-label="delete"
                      >
                        <Delete className={styles.deleteButton} />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={todo.text}
                    className={
                      todo.completed
                        ? styles.listItemTextCompleted
                        : styles.listItemTextActive
                    }
                  />
                </ListItem>
              ))}
            </List>

            {filteredTodos.length > ITEMS_PER_PAGE && (
              <Box className={styles.paginationBox}>
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
