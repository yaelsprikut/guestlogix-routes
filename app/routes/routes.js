const fs = require("fs");
const helpers = require("./helpers");
let {validateParams, getAirportDataFromCode} = helpers;
//Name,City,Country,IATA 3,Latitute,Longitude
module.exports = function(app) {
  app.get("/route", async (req, res) => {
    const validatedValues = await validateParams(req.query.origin, req.query.destination)
    console.log("validatedValues", validatedValues)
    if(validatedValues != "validated") {
      res.send(validatedValues.message)
    } else {
      const originAirport = await getAirportDataFromCode(req.query.origin)
      const destinationAirport = await getAirportDataFromCode(req.query.destination)
      console.log(originAirport, destinationAirport)

      res.send(`>>> Fastest route found for ${req.query.origin} => ${req.query.destination}`);
    } 
  });
};

function getAirlines() {
  console.log(">>> Calling function: getAirlines");
  // getAirportDataFromCode();

}

async function getDistanceBetweenAirports(latitude, longtitude) {
  // console.log(latitude, longtitude)
  try {} catch(e) {}
 
}

function getRoutes() {
  console.log("getRoutes function");
}