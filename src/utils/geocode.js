const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmlkZGxlcmRhbiIsImEiOiJjazE5ZHUxNmcwMDVpM25sbmJ1MWVhczJzIn0.R-nBxFDJugxOpJdSDoPlTQ&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const firstFeature = body.features[0]
            callback(undefined, {
                latitude: firstFeature.center[1],
                longitude: firstFeature.center[0],
                location: firstFeature.place_name
            })
        }
    })
}

module.exports = geocode