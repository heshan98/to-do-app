module.exports = app => {
    const auth = require("../controllers/authentication.controller.js");

    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
    });


    router.post("/signup", auth.signup);
    router.post("/login", auth.login);

    app.use("/api/auth", router);
};
