
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(data => {
      res.render('beers', { data });
    })
    .catch(error => {
      console.log(error);
    });
});
app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
    .then(data => {
      console.log(data);
      res.render('random-beers', data[0]);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
