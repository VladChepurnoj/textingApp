const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const app = express();

//
app.use(
  session({
    secret: "js secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ client: require("./db") }),
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
  })
);
//
app.use(flash());
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

const router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.use("/", router);

module.exports = app;
