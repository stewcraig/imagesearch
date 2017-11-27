const express = require('express');
const routes = require('./controllers/index');
const path = require('path');
require('./models/db');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(port);
