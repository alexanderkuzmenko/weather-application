const express = require('express')
const hbs = require('hbs')
const fs = require("fs")

const fetch = require('node-fetch')

var citiesJSON = fs.readFileSync("cities.json", "utf-8")
var cities = JSON.parse(citiesJSON)
console.log(cities)

const app = express()
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/weather/:city', async function (req, res) {
    var city = req.params.city;
    var appId = 'b5018676b6c9e7d01aa7056fd2b9186d'
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`
    var result = await fetch(url)
    var weather = await result.json();
    //console.log(weather)


    res.render('weather.hbs', {city, weather, cities})
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening")
})