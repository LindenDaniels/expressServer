const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));


app.get('/apps', (req, res) => {
    const playapps = require('./playstore.js')
    
    
    const { search = " ", sort, genres } = req.query;
      if (sort) {
          if (!['rating', 'app'].includes(sort)) {
              return res.status(400).send('Sort must be rating or app.')
          }

      }

        if (genres) {
            if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres)) {
                return res.status(400).send('Genre must be action, puzzle, strategy, casual, arcade, or card.')
            }
        }
    let results = playapps.filter(playapp => 
        playapp.App.toLowerCase().includes(search.toLowerCase()));
    
    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
        
    }

    if (genres) {
        results.filter(genres => 
            
            results.genres && results.genres.toLowerCase().includes(search.toLowerCase()));
          
    }
        
    
       res
     .json(results);

});

app.listen(8000, () => {
    console.log('Server started on port 8000');
});

