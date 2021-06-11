const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9547f6ee7d22dc72b7cb710c8b538745&query=${longitude},${latitude}`

    // console.log(url);

    request({url, json:true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}`)
        }
    })


}

module.exports = forecast

// const url = 'http://api.weatherstack.com/current?access_key=9547f6ee7d22dc72b7cb710c8b538745&query=Chennai'

// request({url: url, json: true}, (error, response) => {
  
//     if(error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log(response.body.error)
//     } else {
//         console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`)
//     }

    
// })
