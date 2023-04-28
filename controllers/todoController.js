const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

const addTodo = async (req, res) => {
  let { content } = req.body;

  content = content.trim();

  if (content != "") {
    const newTodo = new Todo({
      content: content,
    });

    await newTodo
      .save()
      .then((todo) => {
        res.status(201).json({
          success: true,
          message: "Todo added successfully!",
          data: todo,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "Content is empty! Please enter something",
    });
  }
};

const getAllTodos = async (req, res) => {
  await Todo.find()
    .then((todos) => {
      res.status(200).json({
        success: true,
        data: todos,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  let { content } = req.body;
  content = content ? content.trim() : undefined;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Content is missing! Please enter some content",
    });
  }

  try {
    const todoToUpdate = await Todo.findById(id);

    if (!todoToUpdate) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID ${id} not found`,
      });
    }

    todoToUpdate.content = content;

    const updatedTodo = await todoToUpdate.save();

    res.status(200).json({
      success: true,
      message: `Todo with ID ${id} updated successfully!`,
      data: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (deletedTodo) {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully!",
        data: deletedTodo,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Todo with ID ${id} not found!`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const toggleCompleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todoToUpdate = await Todo.findById(id);

    todoToUpdate.completed = !todoToUpdate.completed;

    const updatedTodo = await todoToUpdate.save();

    res.status(200).json({
      success: true,
      message: `Todo with ID ${id} updated successfully!`,
      data: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
  toggleCompleteTodo,
};
