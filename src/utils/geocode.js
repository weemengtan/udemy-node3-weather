const httprequest = require('request')

const geocode = (placeonearth, callback) => {
    const mapboxurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeonearth)}.json?access_token=pk.eyJ1IjoidGVyZW5zIiwiYSI6ImNrOTdweXUwYTBkNGEzbG5vbXVhaWJqNGkifQ.IxXUT2No4NWn3SfKbT1CZQ&limit=1`
    httprequest({ url: mapboxurl, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Mapbox', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location Mapbox', undefined)
        } else {
            const center = response.body.features[0].center
            const data = {
                placename: response.body.features[0].place_name,
                longitude: center[0],
                lattitude: center[1]
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode