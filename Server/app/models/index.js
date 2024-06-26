const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.todo = require("./todos.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);


module.exports = db;