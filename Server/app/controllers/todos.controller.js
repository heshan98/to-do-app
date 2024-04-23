const db = require("../models");
const Todo = db.todo; 

// Create and Save a new Todo task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.task) {
    res.status(400).send({ message: "Task can not be empty!" });
    return;
  }

  // Create a Todo task
  const todo = new Todo({
    task: req.body.task,
    userId: req.body.userId,
    completed: req.body.completed ? req.body.completed : false
  });

  // Save Todo task in the database
  todo
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo task."
      });
    });
};

// Retrieve all Todo tasks from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;

  var condition = userId ? { userId: { $eq: userId } } : {};
  Todo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ 
        message:
          err.message || "Some error occurred while retrieving Todo tasks."
      });
    });
};

// Find a single Todo task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Todo task with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Todo task with id=" + id });
    });
};

// Update a Todo task by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
 
  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo task with id=${id}.`
        });
      } else res.send({ message: "Todo task was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo task with id=" + id
      });
    });
};

// Delete a Todo task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Todo task with id=${id}!`
        });
      } else {
        res.send({
          message: "Todo task was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo task with id=" + id
      });
    });
};

// Delete all Todo tasks from the database.
exports.deleteAll = (req, res) => {
  Todo.deleteMany({})
    .then(data => {
      res.send({
        message: `Todo tasks were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Todo tasks."
      });
    });
};
