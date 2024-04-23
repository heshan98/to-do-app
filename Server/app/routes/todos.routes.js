module.exports = app => {
    const todo = require("../controllers/todos.controller.js");
  
    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
    });
  
    // Create a new Todo task
    router.post("/", todo.create);
  
    // Retrieve all Todo tasks
    router.get("/", todo.findAll);
  
    // Retrieve a single Todo task by id
    router.get("/:id" , todo.findOne);
  
    // Update a Todo task by id
    router.put("/:id" , todo.update);
  
    // Delete a Todo task by id
    router.delete("/:id" , todo.delete);
  
    // Delete all Todo tasks
    router.delete("/" , todo.deleteAll);
  
    app.use("/api/todo", router);
};
