const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');

const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

routes.forEach(route => {
  app[route.verb](route.endpoint, route.controller);
});

app.get('/*', (req, res) => {
  console.log('\n\nReached the API\n\n');
  res.send(`You've successfully reached the RaidTeam API`);
});

module.exports = app;