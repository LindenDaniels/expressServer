
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const playapps = require('./playstore.js');
app.get('/apps', (req, res) => {
    const { search = "", sort, Genres } = req.query;
  
    if (sort) {
      if (!['Rating', 'App'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be rating or app');
      }
    }

    
  
    let results = playapps
          .filter(playapp =>
              playapp
                .App
                .toLowerCase()
                .includes(search.toLowerCase()));
   
    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
    if (Genres) {
      if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(Genres)) {
          return res.status(400).send('Genre must be action, puzzle, strategy, casual, arcade, or card.')
      }
  }
    if (Genres) {
      if (playapps.Genres.toLowerCase().includes(Genres.toLowerCase())) {
      
      let genre = playapps.filter(playapp => playapp.Genres.toLowerCase().includes(Genres.toLowerCase()));
       
      }
    
    }
  
    res
      .json(results, genre);
  });

  app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });
