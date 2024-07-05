const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.use(express.static('public'));


let topMovies = [
    { title: 'Inception', director: 'Christopher Nolan' },
    { title: 'The Shawshank Redemption', director: 'Frank Darabont' },
    { title: 'The Godfather', director: 'Francis Ford Coppola' },
    { title: 'The Dark Knight', director: 'Christopher Nolan' },
    { title: 'Pulp Fiction', director: 'Quentin Tarantino' },
    { title: 'The Lord of the Rings: The Return of the King', director: 'Peter Jackson' },
    { title: 'Forrest Gump', director: 'Robert Zemeckis' },
    { title: 'Fight Club', director: 'David Fincher' },
    { title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski' },
    { title: 'Goodfellas', director: 'Martin Scorsese' }
  ];


  
 
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

// Commenting out the error test route and handler
/*
app.get('/test-error', (req, res, next) => {
    const err = new Error('This is a test error');
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error');
});
*/

  app.get('/', (req, res) => {
    res.send('Welcome to Strobe!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error: ${err.message}');
});
  
 
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });