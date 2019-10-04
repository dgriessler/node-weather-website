const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2e91511df22534f571b724ffaba5b928/' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currently = body.currently
            const daily = body.daily
            callback(undefined, daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out.  There is a ' + currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast