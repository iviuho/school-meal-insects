const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("dotenv").config();

const Menu = require('./models/menu').menuSchema;
const passportGoogle = require("./passport/googleStrategy");

const app = express();
passportGoogle();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/', require('./routes/index'))

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/menu', {
  useNewUrlParser: true
}, (err) => {
  if (err) return console.error(err)
  console.log('Mongoose connected')

  // //쓰기
  // User.create({ name: '하하' })
  //     .then(r => console.log(r))
  //      .catch(e => console.error(e))

  //읽기
  // User.find()
  //      .then(r => console.log(r))
  //      .catch(e => console.error(e))

  // 업데이트(수정)
  // User.updateOne({ _id: '5cbd50967c00ec110c8d7912' }, { $set: { age: 27 } })
  //
  // .then(r => {
  //   console.log(r)
  //   console.log('updated')
  //   return User.find()
  // })
  //
  // .then(r => console.log(r))
  // .catch(e => console.error(e))

  //삭제
  // User.remove({})
  // User.deleteMany({})

  // User.deleteOne({ name: '하하' })
  //     .then(r => console.log(r))
  //     .catch(e => console.error(e))

})

module.exports = app;