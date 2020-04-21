const httprequest = require('request')

/*set or change unit to fahrenheit - append &units=f at the end of URL*/
const forecast = (longitude, lattitude, callback) => {
    const weatherstackurl = `http://api.weatherstack.com/current?access_key=b48969123f91f815bcec21c7302b864f&query=${lattitude},${longitude}`
    httprequest({ url: weatherstackurl, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Weather Stack', undefined)
        } else if (response.body.error) {
            callback('Please provide correct location query forWeather Stack', undefined)
        } else {
            const data = {
                    locationname: response.body.location.name,
                    currenttemperature: response.body.current.temperature,
                    currentfeelslike: response.body.current.feelslike
                }
                //            console.log(data)
            callback(undefined, data)
        }
    })
}

module.exports = forecast