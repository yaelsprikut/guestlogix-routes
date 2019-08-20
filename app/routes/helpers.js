const fs = require("fs");

function readStream(path) {
    console.log(">>> readStream")
    //function returns CSV stream of selected path
    let streamContent;
    
    return new Promise(function(resolve) {
        streamContent = fs.readFileSync(path, {encoding: 'utf8'});
        resolve(streamContent);
    });

}

module.exports = {
    validateParams: async function(origin, destination) {
        // handle inproper parameter input
        console.log(">>> Calling function: validate");
        let validationFlag = false
      
        if (origin == destination) {
          return Error('Origin and destination cannot be the same!')
        } else if (!origin || !destination) {
          return Error('You must provide a value for origin and destination!')
        } 
      
        CODES_PATH = "data/test/routes.csv";
        let available_codes = []
        const codesData = await readStream(CODES_PATH)
      
        const codesDataString = codesData.split("\n");
      
         for (let i = 0; i < codesDataString.length; i++) {
            const column = codesDataString[i].split(',');
            available_codes.push(column[1], column[2].trim())
         }
        //  console.log(available_codes.indexOf(origin), available_codes.indexOf(destination))
         if (available_codes.indexOf(origin) <= 0 || available_codes.indexOf(destination) <= 0) {
            return Error("Invalid input! Input must comply with IATA 3 standards (YYZ, YVR)")
         } else {
            validationFlag = "validated"
         }
         return validationFlag
      },
      getAirportDataFromCode: async function(code) {
        console.log(">>> Calling function: getAirportDataFromCode");
        const AIRPORTS_DATA_PATH = "data/test/airports.csv";
        let airportData = []
      
        try {
          const airports = await readStream(AIRPORTS_DATA_PATH)
          const airportsDataString = airports.split("\n");
      
          for (let i = 1; i < airportsDataString.length; i++) {
              const column = airportsDataString[i].split(',');
              if (column.indexOf(code) >= 0) {
                airportData.push(column)
              }
          }
      
        } catch (e) {
          console.log(e);
        }
        return airportData
      }
}