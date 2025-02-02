/**
 * @module passport
 * @description Configures Passport strategies for authentication.
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Models = require('./models.js');
const passportJWT = require('passport-jwt');

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/**
 * Configures Passport's local authentication strategy.
 * Authenticates users using a username and password.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log('Incorrect username');
            return callback(null, false, { message: 'Incorrect username or password.' });
          }
          if (!user.validatePassword(password)) {
            console.log('Incorrect password');
            return callback(null, false, { message: 'Incorrect password.' });
          }
          console.log('Authentication successful');
          return callback(null, user);
        })
        .catch((error) => {
          console.log(error);
          return callback(error);
        });
    }
  )
);

/**
 * Configures Passport's JWT authentication strategy.
 * Extracts JWT from the request and verifies user identity.
 */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, callback) => {
      return await Users.findById(jwtPayload._id)
        .then((user) => callback(null, user))
        .catch((error) => callback(error));
    }
  )
);
