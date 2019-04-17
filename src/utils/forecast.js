const request = require('request');
// const chalk = require('chalk');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/ef767bdac4f36c7b40660d8c372cc593/'+ lat + ',' + long
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, 
                //{
                // summary: body.daily.data[0].summary,
                // currently: body.currently.temperature,
                // precipitation: body.currently.precipProbability
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain.'
        // }
                // console.log(body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain.')
            )
        }
    })
}

module.exports = forecast