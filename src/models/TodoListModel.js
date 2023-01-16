const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    user: { type: String },
    toDoSubject: { type: String },
    toDoDescription: { type: String },
    toDoStatus: { type: String },
    toDoCreateDate: { type: Date },
    toDoUpdateDate: { type: Date },
  },
  { versionKey: false }
);
const TodoListModel = mongoose.model("ToDoList", DataSchema);
module.exports = TodoListModel;
