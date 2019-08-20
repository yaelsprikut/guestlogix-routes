const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const port = 8000;

require('./app/routes')(app, {});

app.listen(port, () => {
  console.log("======== ✈️    Welcome to Flight Connector    ✈️  ========");
  console.log("======== ✈️    Created by: Yael Sprikut       ✈️  ========");
})
