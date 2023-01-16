const express = require("express");
const ProfileController = require("../controllers/ProfileController");
const ToDoListController = require("../controllers/ToDoListController");
const TokenVerify = require("../middlewares/AuthVerifyMiddleware");
const router = express.Router();

// User Registration
router.post("/profiles", ProfileController.CreateProfile);

// User Profile Update
router.put("/profiles", TokenVerify, ProfileController.UpdateProfile);

// User Login
router.post("/login", ProfileController.UserLogin);

// User Login
router.get("/me", TokenVerify, ProfileController.TokenVerify);

// User Todo Create
router.post("/todos", TokenVerify, ToDoListController.CreateTodo);

// User Specific Todos List View
router.get("/todos", TokenVerify, ToDoListController.ViewTodosByUser);

// User Specific Todos List Filter By Status
router.get(
  "/todos-filter-status",
  TokenVerify,
  ToDoListController.FilterTodosByStatus
);

// User Specific Todos List Filter By Date
router.get(
  "/todos-filter-date",
  TokenVerify,
  ToDoListController.FilterTodosByDate
);

// User Todo Update
router.put("/todos", TokenVerify, ToDoListController.UpdateTodo);

// User Single Todo Delete
router.delete("/todos", TokenVerify, ToDoListController.RemoveTodo);

module.exports = router;
