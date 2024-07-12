const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid'); 
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

let users = [
  {
    id: 1,
    name: "Kim",
    favouriteMovies: []
  },
  {
    id: 2,
    name: "Mandy",
    favouriteMovies: ["Pulp Fiction"]
  },
  {
    id: 3,
    name: "Jasper",
    favouriteMovies: ["Inception"]
  },
]



let movies = [
  {
    id: uuidv4(),
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    genre: {
      name: 'Sci-Fi',
      description: 'Science fiction (often shortened to Sci-Fi or SF) is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.'
    },
    director: {
      name: 'Christopher Nolan',
      bio: 'Christopher Edward Nolan is a British-American film director, producer, and screenwriter.',
      birth: '1970-07-30'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    genre: {
      name: 'Drama',
      description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    director: {
      name: 'Frank Darabont',
      bio: 'Frank Árpád Darabont is a Hungarian-American film director, screenwriter, and producer.',
      birth: '1959-01-28'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    genre: {
      name: 'Crime',
      description: 'Crime films are a genre that revolves around the actions of criminals and the effects on their victims, families, and society.'
    },
    director: {
      name: 'Francis Ford Coppola',
      bio: 'Francis Ford Coppola is an American film director, producer, and screenwriter.',
      birth: '1939-04-07'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    genre: {
      name: 'Action',
      description: 'Action films are characterized by a resourceful hero struggling against incredible odds, which include life-threatening situations, a villain, or a pursuit which usually concludes in victory for the hero.'
    },
    director: {
      name: 'Christopher Nolan',
      bio: 'Christopher Edward Nolan is a British-American film director, producer, and screenwriter.',
      birth: '1970-07-30'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.',
    genre: {
      name: 'Crime',
      description: 'Crime films are a genre that revolves around the actions of criminals and the effects on their victims, families, and society.'
    },
    director: {
      name: 'Quentin Tarantino',
      bio: 'Quentin Jerome Tarantino is an American film director, writer, and actor.',
      birth: '1963-03-27'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'The Lord of the Rings: The Return of the King',
    description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    genre: {
      name: 'Fantasy',
      description: 'Fantasy films are a genre of speculative fiction set in a fictional universe, often inspired by real world myth and folklore.'
    },
    director: {
      name: 'Peter Jackson',
      bio: 'Sir Peter Robert Jackson is a New Zealand film director, screenwriter, and film producer.',
      birth: '1961-10-31'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
    genre: {
      name: 'Drama',
      description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    director: {
      name: 'Robert Zemeckis',
      bio: 'Robert Lee Zemeckis is an American film director, producer, and screenwriter.',
      birth: '1952-05-14'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'Fight Club',
    description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    genre: {
      name: 'Drama',
      description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    director: {
      name: 'David Fincher',
      bio: 'David Andrew Leo Fincher is an American film director.',
      birth: '1962-08-28'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    genre: {
      name: 'Sci-Fi',
      description: 'Science fiction (often shortened to Sci-Fi or SF) is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.'
    },
    director: {
      name: 'Lana Wachowski, Lilly Wachowski',
      bio: 'Lana Wachowski and Lilly Wachowski are American film and television directors, writers, and producers.',
      birth: '1965-06-21'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    featured: false
  },
  {
    id: uuidv4(),
    title: 'Goodfellas',
    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.',
    genre: {
      name: 'Crime',
      description: 'Crime films are a genre that revolves around the actions of criminals and the effects on their victims, families, and society.'
    },
    director: {
      name: 'Martin Scorsese',
      bio: 'Martin Charles Scorsese is an American film director, producer, screenwriter, and actor.',
      birth: '1942-11-17'
    },
    imageURL: 'https://image.tmdb.org/t/p/w1280/iKxN5c6WTN8WsfH2jVGHV3rTnZB.jpg',
    featured: false
  }
];


// CREATE user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuidv4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
      res.status(400).send('users need names')
  }
}) 

//UPDATE user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('No such user');
  }
});

//CREATE new movie
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle  } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favouriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('No such user');
  }
});

//DELETE favourite movie
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle  } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favouriteMovies = user.favouriteMovies.filter(title => title  !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from ${id}'s array`);
  } else {
    res.status(400).send('No such user');
  }
});

//DELETE user
app.delete('/users/:id/', (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('No such user');
  }
});


// READ all movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

// READ movie by title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.title.toLowerCase() === title.toLowerCase());

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send('No such movie');
  }
});

// READ genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genreMovie = movies.find(movie => movie.genre.name.toLowerCase() === genreName.toLowerCase());

  if (genreMovie) {
    const genreInfo = {
      name: genreMovie.genre.name,
      description: genreMovie.genre.description,
    };
    res.status(200).json(genreInfo);
  } else {
    res.status(404).send('No movies found in this genre');
  }
});


// READ movies by director name
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.director.name.toLowerCase() === directorName.toLowerCase());

  if (director) {
    const {name, bio, birth } = director.director;
    res.status(200).json({ name, bio, birth});
  } else {
    res.status(404).send('No movies found for this director');
  }
});

// Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Strobe!');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Internal Server Error: ${err.message}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
