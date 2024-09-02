// Old code
/*const jwtSecret = 'your_jwt_secret';

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}

module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
*/

// New code with Stephen's suggested changes
const jwtSecret = 'your_jwt_secret';

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}

module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        // Combine the general message with the more specific info message
        const message = `Authentication failed: ${info ? info.message : 'Something is not right'}`;
        return res.status(400).json({
          message: message,
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }

        // Create a lean user object that excludes the password
        const leanUser = user.toJSON();
        delete leanUser.Password; // Exclude the password field

        let token = generateJWTToken(leanUser);
        return res.json({ user: leanUser, token });
      });
    })(req, res);
  });
}
