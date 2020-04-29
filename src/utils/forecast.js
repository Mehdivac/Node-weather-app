const request = require('request');

const forecast = (lat, long, callback) => {
    const url='http://api.weatherstack.com/current?access_key=149a072f31868829052643461a1efd87&query='+ lat + ',' + long ;

    request({url, json: true}, (error, {body}) =>{
    
        if (error){
            callback("Unable to connect to weather services", undefined);
    
        } else if (body.error){
            callback("Unable to find location" , undefined);
    
        } else {
            callback(undefined, {
                localtime: body.location.localtime,
                weather: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
        
    });
}

module.exports = forecast;
