const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const Menu = require('./models/menu').menuSchema;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET
  })
);
app.use('/', require('./routes/index'));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/menu', {
  useNewUrlParser: true
}, (err) => {
  if (err) return console.error(err)
  console.log('Mongoose connected')
})

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

module.exports = app;