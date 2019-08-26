const fs = require('fs')
const ROUTES_DATA_PATH = 'data/full/routes.csv'

function readStream(path) {
    //helper func for reading CSV
    let streamContent

    return new Promise(function(resolve) {
        streamContent = fs.readFileSync(path, { encoding: 'utf8' })
        resolve(streamContent)
    })
}

// function node() {
//     this.value
//     this.edges = []
//     this.searched = false
//     this.parent = null
// }

module.exports = {
    validateParams: async function(origin, destination) {
        // handle inproper parameter input
        console.log('>>> Calling function: validate')
        let validationFlag = false

        let available_codes = []
        const codesData = await readStream(ROUTES_DATA_PATH)

        const codesDataString = codesData.split('\n')

        for (let i = 0; i < codesDataString.length; i++) {
            const column = codesDataString[i].split(',')
            available_codes.push(column[1], column[2].trim())
        }

        if (origin == destination) {
            return Error('ERROR: Origin and destination cannot be equal.')
        } else if (!origin || !destination) {
            return Error('ERROR: Values cannot be empty.')
        } else if (
            available_codes.indexOf(origin) <= 0 ||
            available_codes.indexOf(destination) <= 0
        ) {
            return Error(
                'INVALID: Input must comply with IATA 3 standards (YYZ, YVR)'
            )
        } else {
            validationFlag = 'validated'
        }
        return validationFlag
    },
    findQuickestRoute: async function(origin, destination) {
        // find the quickest route using the BDS algorithm
        let queue = []
        const airports = await readStream(ROUTES_DATA_PATH)
        const airportsDataString = airports.split('\n')

        for (let i = 0; i < airportsDataString.length; i++) {
            const column = airportsDataString[i].split(',')
            if (column[1] === origin) {
                queue.push([column[1], column[2].trim()])
            }
        }
        console.log('QUEUE AFTER FIRST PUSH: ', queue)
        for (row in queue) {
            if (queue[row].indexOf(destination) > -1) {
                return `>>> Fastest route found for ${origin} => ${destination} with airline`
            } else {
                // keep searching for the next connecting flight
                last_node = queue.shift()
                console.log('QUEUE AFTER SECOND PUSH: ', queue)

                last_node = queue.shift()
                // console.log(last_node)
                // find the next closest node
                for (let j = 0; j < airportsDataString.length; j++) {
                    const column = airportsDataString[j].split(',')
                    // console.log("column[2]", column[2])
                    if (column[2].trim() === destination) {
                        queue.push(origin, column[1], column[2].trim(), '\n')
                    }
                }

                if (queue.length > 1) {
                    return 'cool'
                    // return `>>> Fastest route found for ${origin} => ${destination} is ${queue}\n`
                }
            }
        }

        return false
    }
}
