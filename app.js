const express = require('express');
const app = express();
const moods = require('./moods');
const events = require('./events');

app.get('/', function (req, res) {
});

app.get('/test-params/', function (req, res) {
  //console.log(test);
  res.send(req.query.id);
});

app.get('/moods/', function(req, res) {
  const mood = moods.get(req.query.moment);
  res.send(mood);
});

app.get('/events/', function(req, res) {
  const e = events.get(req.query.mood, req.query.day, req.query.moment);
  res.send(e);
});

app.get('/routes/', function(req, res) {
  res.send('hello world');
});

app.listen(3000, function() {
  console.log('Started on port 3000');
});