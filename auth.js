/**
 * @module auth
 * @description Handles user authentication and JWT token generation.
 */

const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport');

/**
 * Generates a JSON Web Token (JWT) for a given user.
 * @function generateJWTToken
 * @param {Object} user - The user object for which the token is generated.
 * @returns {string} A signed JWT token valid for 7 days.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Identifies the subject of the token (the user)
    expiresIn: '7d',        // Token expiration time (7 days)
    algorithm: 'HS256'      // Algorithm used to sign the token
  });
};

/**
 * Authenticates a user and returns a JWT if successful.
 * @function login
 * @param {Object} router - The Express router object to define the route.
 */
module.exports = (router) => {
  /**
   * @route POST /login
   * @description Authenticates a user using Passport's local strategy and returns a JWT token upon success.
   * @param {Object} req - The Express request object containing user credentials.
   * @param {Object} res - The Express response object used to return the authentication result.
   * @returns {Object} JSON object with the authenticated user's information (excluding the password) and a JWT token.
   */
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        const message = `Authentication failed: ${info ? info.message : 'Something is not right'}`;
        return res.status(400).json({ message, user });
      }

      req.login(user, { session: false }, (error) => {
        if (error) res.send(error);

        const leanUser = user.toJSON();
        delete leanUser.Password; // Exclude password for security

        const token = generateJWTToken(leanUser);
        return res.json({ user: leanUser, token });
      });
    })(req, res);
  });
};
