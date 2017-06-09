const models = require('../models');
const jwt = require('jwt-simple');
const config = require('../config');
const requireAuth = require('../services/passport').requireAuth;
const getTokenForUser = require('../services/token');

const getUsers = (req, res) => {
  // return a list of all users if the provided JWT token is valid
  models.User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
};

const createUser = (req, res) => {
  const user = new models.User(req.body);
  user.save((err, user) => {
    if (err) return res.send(err);
    res.send({
      token: getTokenForUser(user),
    });
  });
};

module.exports = (app) => {
  app.get('/users', getUsers);
  app.post('/users', requireAuth, getUsers);
};
