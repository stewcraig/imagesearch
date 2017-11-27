const express = require('express');
const routes = require('./controllers/index');
require('./models/db');

const app = express();
const port = process.env.PORT || 8080;

app.use('/', routes);

app.listen(port);
