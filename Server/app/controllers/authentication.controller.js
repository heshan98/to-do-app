const db = require("../models");
const User = db.user;

// User registration
exports.signup = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "Username and password are required!" });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  // Save User in the database
  user.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
};

// User login
exports.login = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "Username and password are required!" });
    return;
  }

  // Find user by username and password
  User.findOne({ username: req.body.username, password: req.body.password })
    .then(user => {
      if (!user) {
        res.status(404).send({ message: "User not found or invalid credentials." });
      } else {
        res.send(user);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error occurred while logging in." });
    });
};
