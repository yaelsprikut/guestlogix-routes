const fs = require('fs')
const helpers = require('./helpers')

let { validateParams, findQuickestRoute } = helpers

module.exports = function(app) {
    app.get('/route', async (req, res) => {
        const validatedValues = await validateParams(
            req.query.origin,
            req.query.destination
        )

        if (validatedValues != 'validated') {
            res.send(validatedValues.message || null)
        } else {
            const quickestRoute = await findQuickestRoute(
                req.query.origin,
                req.query.destination
            )
            console.log('>> quickestRoute: ', quickestRoute)
            res.send(quickestRoute)
        }
    })
}

async function getDistanceBetweenAirports(latitude, longtitude) {
    // console.log(latitude, longtitude)
    try {
    } catch (e) {}
}

function getRoutes() {
    console.log('getRoutes function')
}
