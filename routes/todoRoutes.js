const todoController = require("../controllers/todoController");
const validateID = require("../middlewares");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Todo APIs!" });
});

router.post("/todos/add", todoController.addTodo);

router.get("/todos/getAllTodos", todoController.getAllTodos);

router.put("/todos/update/:id", validateID, todoController.updateTodo);

router.patch(
  "/todos/toggleCompleted/:id",
  validateID,
  todoController.toggleCompleteTodo
);

router.delete("/todos/delete/:id", validateID, todoController.deleteTodo);

module.exports = router;
