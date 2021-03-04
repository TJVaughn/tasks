const express = require('express')
const router = new express.Router()
const request = require('request')

const coordinates = (searchText, callback) => {
    const key = "pk.eyJ1IjoidGp2YXVnaG4iLCJhIjoiY2szODZpc2U1MDAzcTNwbW9pNWJxbjQ0diJ9.NnNQw6riCTEDX9-ukgAvlw"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${key}&limit=1`
    request({url, json: true}, (error, { body }={}) => {
        if(error){
            callback(error, undefined);
        } else if(body.message || body.features.length < 1) {
            console.log(body.message)
            callback(body.message, undefined);
        } else {
            const data = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                name: body.features[0].place_name
            }
            const {lat, long, name} = data;
            callback(undefined, {lat, long, name})
        }
    })
}
const forecast = (lat, long, name, callback) => {
    const key = "21d84f83927a2f30788834bdb7bdc322";
    const url =  `https://api.darksky.net/forecast/${key}/${lat},${long}?exclude=minutely&extend=hourly`
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback(error, undefined)
        } else if(body.error) {
            callback(error, undefined)
        } else {
            const weather = {
                data: body,
                place: name
            }
            const {data, place} = weather
            callback(undefined, {data, place})
        }
    }) 
}
router.get('/weather', (req, res) => {
    res.header("Access-Control-Allow-Origin", 'https://whetherapp.co')
    if(!req.query.address){
        return res.send({
            error: "Please provide an address in the search area"
        })
    }
    coordinates(req.query.address, (error, {lat, long, name} = {}) => {
        if(error) {
            return res.send({
                error: "coordinates failed"
            })
        }
        forecast(lat, long, name, (error, weather) => {
            if(error){
                return res.send({
                    error: "forecast failed"
                })
            }
            res.send({
                forecast: weather.data,
                name,
                address: req.query.address
            })
        })
    });
})

module.exports = router