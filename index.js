/**
 * @file This file contains the main Express server setup for the Strobe API,
 * including routes for user and movie data.
 * @module index
 */

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);
require('./passport');

/**
 * @route GET /users
 * @description Get all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of users
 * @throws {Error} If there is an error fetching users
 */
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route GET /users/:Username
 * @description Get a user by username
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} User details
 * @throws {Error} If user not found or error occurs
 */
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await Users.findOne({ Username: req.params.Username });
    user ? res.status(200).json(user) : res.status(404).send('No such user');
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route POST /users
 * @description Register a new user
 * @param {Object} req - Express request object containing user details
 * @param {Object} res - Express response object
 * @returns {Object} Newly created user
 * @throws {Error} If validation fails or error occurs
 */
app.post('/users', [
  check('Username', 'Username is required').notEmpty(),
  check('Username', 'Username must be alphanumeric').isAlphanumeric(),
  check('Password', 'Password is required').notEmpty(),
  check('Email', 'Email is invalid').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const hashedPassword = Users.hashPassword(req.body.Password);
  try {
    const existingUser = await Users.findOne({ Username: req.body.Username });
    if (existingUser) return res.status(400).send('Username already exists');

    const newUser = await Users.create({
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route PUT /users/:Username
 * @description Update user information
 * @param {Object} req - Express request object with updated user data
 * @param {Object} res - Express response object
 * @returns {Object} Updated user information
 * @throws {Error} If user is unauthorized or an error occurs
 */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) return res.status(400).send('Permission denied');

  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route POST /users/:Username/movies/:MovieID
 * @description Add a movie to user's favorites
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated user info
 * @throws {Error} If error occurs while adding movie
 */
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route DELETE /users/:Username/movies/:MovieID
 * @description Remove a movie from user's favorites
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated user info
 * @throws {Error} If error occurs while removing movie
 */
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route DELETE /users/:Username
 * @description Delete a user by username
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {string} Deletion confirmation message
 * @throws {Error} If error occurs while deleting user
 */
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await Users.findOneAndDelete({ Username: req.params.Username });
    user ? res.send(`${req.params.Username} was deleted.`) : res.status(400).send('User not found');
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route GET /movies
 * @description Get all movies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of movies
 * @throws {Error} If error occurs while retrieving movies
 */
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Movies.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route GET /movies/:title
 * @description Get a movie by title
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Movie details
 * @throws {Error} If movie not found or error occurs
 */
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movie = await Movies.findOne({ Title: req.params.title });
    movie ? res.json(movie) : res.status(404).send('No such movie');
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

/**
 * @route GET /
 * @description Welcome message for API root
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/', (req, res) => {
  res.send('Welcome to Strobe!');
});

/**
 * Global error handling middleware
 * @param {Object} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
app.use((err, req, res, next) => {
  res.status(500).send(`Internal Server Error: ${err.message}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
