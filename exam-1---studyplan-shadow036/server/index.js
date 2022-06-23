'use strict';

const express = require('express');
const morgan = require('morgan');
const database = require('./database_access');
const cors = require('cors');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const { json } = require('express');

// init express
const app = new express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));

const cors_options={
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(cors_options));

passport.use(new LocalStrategy(async function verify(username, password, callback){
  const user = await database.find_user(username, password);
  if(!user)
    return callback(null, false, "Incorrect credentials");
  else
  return callback(null, user, `Welcome ${user.name}`);
}))

passport.serializeUser(function (user, callback){
  callback(null, user);
});

passport.deserializeUser(function (user, callback){
  return callback(null, user);
});

const is_logged_in = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  return res.status(401).json({error: "Not authorized"});
}

app.use(session({
  secret: "secret cookie",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

const PREFIX = '/api/v1';

app.get(PREFIX + '/courses', (req, res) => {
  database.load_courses().then(
    (value) => {
      res.status(200).json(value);
    }
  ).catch(
    (err) => {res.status(500).json({error: err});}
  );
});

app.get(PREFIX + '/study_plan/:id', (req, res) => {
  database.load_study_plan(req.params.id).then(
    (value) =>  {
                  res.status(200).json(value);
                }
  ).catch(
    (err) => {res.status(201).json({error: err});}
  );
});

app.post(PREFIX + '/delete/:id', (req, res) => {
    database.delete_study_plan(req.params.id).then(
      () =>  {
        res.status(201).json(true);
      }
    ).catch(
      (err) => {res.status(500).json({error: err});}
    );
})

app.post(PREFIX + '/save/:id', (req, res) => {
  database.save_study_plan(req.params.id, req.body).then(
    () =>  {
      res.status(201).json(true);
    }
  ).catch(
    (err) => {res.status(500).json({error: err});}
  );
})

app.post(PREFIX + '/update_courses', (req, res) => {
  database.update_courses(req.body).then(
    () =>  {
      res.status(201).json(true);
    }
  ).catch(
    (err) => {res.status(500).json({error: err});}
  );
})

app.get(PREFIX + '/sessions/current', is_logged_in, (req, res) => {
  if(req.isAuthenticated())
    res.json(req.user);
  else
    res.status(401).json({error: 'Not authenticated'});
});

app.delete(PREFIX + '/sessions/current', is_logged_in, (req, res) => {
  req.logout(() => {
    res.end();
  });
});

app.post(PREFIX + '/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user);
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});