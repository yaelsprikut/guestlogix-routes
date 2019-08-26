const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const port = 8000;

const fs = require('fs')
const AIRPORTS_DATA_PATH = 'data/full/airports.csv'

function readStream(path) {
    //helper func for reading CSV
    let streamContent

    return new Promise(function(resolve) {
        streamContent = fs.readFileSync(path, { encoding: 'utf8' })
        resolve(streamContent)
    })
}

require('./app/routes')(app, {});

app.set('view engine', 'ejs')
app.get('/home', async (req, res) => {
const routeArray = []
const routeOptions = await readStream(AIRPORTS_DATA_PATH)
const codesDataString = routeOptions.split('\n')

for (let i = 1; i < codesDataString.length; i++) {
    const column = codesDataString[i].split(',')
    if (routeArray.indexOf(column[3]) === -1 && column[3].length === 3) {
      routeArray.push(column[3])
    }
}

    res.render('../app/home.ejs', {
        title: '✈️ Flight Connector',
        options: routeArray
    })
})

app.listen(port, () => {
  console.log("======== ✈️    Welcome to Flight Connector                                   ✈️  ========");
  console.log("======== ✈️    \033[1mCreated by:\033[0m  Yael Sprikut                                     ✈️  ========");
  console.log("======== ✈️                                                                  ✈️  ========");
  console.log("======== ✈️    \033[1mHost:\033[0m http://localhost:8000                                   ✈️  ========");
  console.log("======== ✈️    \033[1mRoute:\033[0m /route                                                 ✈️  ========");
  console.log("======== ✈️    \033[1mMethod:\033[0m GET                                                   ✈️  ========");
  console.log("======== ✈️    \033[1mParams:\033[0m                                                       ✈️  ========");
  console.log("======== ✈️    - \033[1morigin\033[0m  departure AL IATA 3 code                            ✈️  ========");
  console.log("======== ✈️    - \033[1mdestination\033[0m  destination AL IATA 3 code                     ✈️  ========");
  console.log("======== ✈️                                                                  ✈️  ========");
  console.log("======== ✈️                                                                  ✈️  ========");

})
