'use strict'

const express = require('express');
const morgan = require('morgan');
const database = require('./database_access');
const cors = require('cors');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

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
}));

passport.serializeUser(function(user, callback){
    callback(null, user);
});

passport.deserializeUser(function (user, callback) {
    return callback(null, user);
});

const is_logged_in = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({error: 'Not authorized'});
  }

app.use(session({
    secret: "secret word for session cookie!",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));
  

const PREFIX = '/api/v1';

app.get(PREFIX + '/films', is_logged_in, (req, res) => {
    database.get_all().then(
        (value) => {
            res.status(200);
            res.json(value);
        }
    ).catch(
        (err) => {res.status(500).json({error: err});}
    );
});

app.get(PREFIX + '/films/filters/:filter/:id', is_logged_in, (req, res) => {
    database.get_filter(req.params.filter, req.params.id).then(
        value => {
            res.status(200);
            res.json(value);
        }
    ).catch(
        (err) => {res.status(500).json({error: err});}
    );
});

app.get(PREFIX + '/sessions/current', is_logged_in, (req, res) => {
    if(req.isAuthenticated()) {
      res.json(req.user);}
    else
      res.status(401).json({error: 'Not authenticated'});
  });
  
  app.delete(PREFIX + '/sessions/current', is_logged_in, (req, res) => {
    req.logout(() => {
      res.end();
    });
  });
  

app.get(PREFIX + '/films/:id', is_logged_in, (req, res) => {
    database.get_id(req.params.id).then(
        value => {
            res.status(200);
            res.json(value);
        }
    ).catch(
        (err) => {res.status(500).json({error: err});}
    );
});

app.post(PREFIX + '/films', is_logged_in, (req, res) => {
    database.post(req.body).then(
        value => { 
            res.status(201);
            console.log("POST executed");
            res.end();
        }
    ).catch(
        (err) => {res.status(500).json({error: err});}
    );
});

app.put(PREFIX + '/films/update/:id', is_logged_in, (req, res) => {
    database.put_update(req.params.id, req.body).then(
        value => {
            res.status(201);
            console.log("PUT(update film) executed");
            res.end();
        }
    ).catch(
        (err) => {res.status(500).json({error: err});}
    );
});

app.put(PREFIX + '/films/toggle/:id', is_logged_in, (req, res) => {
    database.put_toggle(req.params.id).then(
        value => {
            res.status(201);
            console.log("PUT(change favorite) executed");
            res.end();
        }
    ).catch(
        (err) => {res.status(500).json({error: err});}
    );
});

app.delete(PREFIX + '/films/:id', is_logged_in, (req, res) => {
    database.delete_film(req.params.id).then(
        value => {
            res.status(200);
            console.log("DELETE executed");
            res.end();
        }
    ).catch(
        (err) => {res.status(500).json({error: err});}
    );
});

app.post(PREFIX + '/sessions', passport.authenticate('local'), (req, res) => {
    res.status(201).json(req.user);
  });
  

const PORT = 3001;

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));