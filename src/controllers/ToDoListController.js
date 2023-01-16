const TodoListModel = require("../models/TodoListModel");
const jwt = require("jsonwebtoken");

// User Todo Create
exports.CreateTodo = (req, res) => {
  const { toDoSubject, toDoDescription } = req.body;
  const user = req.headers.username;
  const toDoStatus = "New";
  const toDoCreateDate = Date.now();
  const toDoUpdateDate = Date.now();
  const PostBody = {
    user,
    toDoSubject,
    toDoDescription,
    toDoStatus,
    toDoCreateDate,
    toDoUpdateDate,
  };
  TodoListModel.create(PostBody, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: {
          error: err,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          todo: data,
        },
      });
    }
  });
};

// User Specific Todos View
exports.ViewTodosByUser = (req, res) => {
  const userName = req.headers.username;
  TodoListModel.find({ userName }, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: {
          error: err,
        },
      });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
// User Specific Todos List Filter By Status
exports.FilterTodosByStatus = (req, res) => {
  const userName = req.headers.username;
  const { toDoStatus } = req.body;
  TodoListModel.find({ userName, toDoStatus }, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: {
          error: err,
        },
      });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
// User Specific Todos List Filter By Date
exports.FilterTodosByDate = (req, res) => {
  const userName = req.headers.username;
  const { formDate, toDate } = req.body;
  TodoListModel.find(
    {
      userName,
      toDoCreateDate: { $gte: new Date(formDate), $lte: new Date(toDate) },
    },
    (err, data) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          data: {
            error: err,
          },
        });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};

// Single Todo Update
exports.UpdateTodo = (req, res) => {
  const { toDoSubject, toDoDescription, _id } = req.body;
  const toDoUpdateDate = Date.now();
  const PutBody = {
    toDoSubject,
    toDoDescription,
    toDoUpdateDate,
  };
  TodoListModel.updateOne(
    { _id },
    { $set: PutBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          data: {
            error: err,
          },
        });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};

// Single Todo Remove
exports.RemoveTodo = (req, res) => {
  const { _id } = req.body;
  TodoListModel.remove({ _id }, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: {
          error: err,
        },
      });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
