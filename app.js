const express = require('express');
const app = express();
const moods = require('./moods');
const events = require('./events');
const routes = require('./routes');

app.get('/', function (req, res) {
});

app.get('/test-params/', function (req, res) {
  //console.log(test);
  res.send(req.query.id);
});
app.get('/api/moods/', function(req, res) {
  console.log('Mood');
  const mood = moods.get(req.query.moment);
  res.send(mood);
});

app.get('/api/events/', function(req, res) {
  console.log('Event');
  const e = events.get(req.query.mood, req.query.day, req.query.moment);
  res.send(e);
});

app.get('/api/routes/', function(req, res) {
  console.log('Route');
  const r = routes.get(req.query.name);
  res.send(r);
});

app.get('*', (req,res) => {
  console.log('404');
  res.send('Not found', 404);
});

app.listen(3000, function() {
  console.log('Started on port 3000');
});
