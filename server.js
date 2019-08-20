const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const port = 8000;

require('./app/routes')(app, {});

app.listen(port, () => {
  console.log("======== ✈️    Welcome to Flight Connector                                   ✈️  ========");
  console.log("======== ✈️    \033[1mCreated by:\033[0m  Yael Sprikut                                     ✈️  ========");
  console.log("======== ✈️                                                                  ✈️  ========");
  console.log("======== ✈️    \033[1mHost:\033[0m http://localhost:8000                                   ✈️  ========");
  console.log("======== ✈️    \033[1mRoute:\033[0m /route                                                 ✈️  ========");
  console.log("======== ✈️    \033[1mMethod:\033[0m GET                                                   ✈️  ========");
  console.log("======== ✈️    \033[1mParams:\033[0m                                                       ✈️  ========");
  console.log("======== ✈️      - \033[1morigin\033[0m  departure AL IATA 3 code                          ✈️  ========");
  console.log("======== ✈️      - \033[1mdestination\033[0m  destination AL IATA 3 code                   ✈️  ========");
  console.log("======== ✈️                                                                  ✈️  ========");
  console.log("======== ✈️                                                                  ✈️  ========");

})
