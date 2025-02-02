/**
 * @module models
 * @description Defines Mongoose schemas and models for movies and users.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * @typedef {Object} Movie
 * @property {string} Title - Movie title.
 * @property {string} Description - Movie description.
 * @property {Object} Genre - Genre details.
 * @property {string} Genre.Name - Name of the genre.
 * @property {string} Genre.Description - Description of the genre.
 * @property {Object} Director - Director details.
 * @property {string} Director.Name - Director's name.
 * @property {string} Director.Bio - Director's biography.
 * @property {Array<string>} Actors - List of actors in the movie.
 * @property {string} ImagePath - Path to the movie's image.
 * @property {boolean} Featured - Whether the movie is featured.
 */
const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

/**
 * @typedef {Object} User
 * @property {string} Username - Unique username.
 * @property {string} Password - Hashed user password.
 * @property {string} Email - User email address.
 * @property {Date} Birthday - User's birthday.
 * @property {Array<ObjectId>} FavoriteMovies - List of user's favorite movies.
 */
const userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

/**
 * Hashes a user's password using bcrypt.
 * @function hashPassword
 * @param {string} password - The plain text password to hash.
 * @returns {string} The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validates a user's password during login.
 * @function validatePassword
 * @param {string} password - The plain text password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
