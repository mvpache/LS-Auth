const { User } = require('./models');

const signUp = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.send(err);
    user.checkPassword(req.body.password,(err, isMatch) => {
      if (err) return res.send(err);
      res.send(isMAtch);
    });
  });
};

const signIn = (req, res) => {
  // generate a JWT token if the username/password is valid
};

module.exports = (app) => {
  app.post('/signup', signUp);
  app.post('/signin', signIn);
};
