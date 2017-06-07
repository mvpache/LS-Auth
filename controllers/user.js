const { User } = require('../models');


const getUsers = (req, res) => {
  // return a list of all users if the provided JWT token is valid
};

const createUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.send (err);
    res.send(user);
  });
};

module.exports = (app) => {
  app.get('/users', getUsers);
};
