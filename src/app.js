const express = require('express')
const {connectDB} = require("./helpers/db.js")
const {port} = require("./configuration")

const hbs = require('hbs')
const fs = require("fs")
const fetch = require('node-fetch')
const app = express()
const cityRouter = require('./routers/city')
const {City} = require("./models/city")

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(cityRouter)


app.get('/(:city)?', async function (req, res) {
    const cities = await City.find()
    var city = req.params.city;
    var appId = 'b5018676b6c9e7d01aa7056fd2b9186d'
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`
    var result = await fetch(url)
    var weather = await result.json();
    res.render('weather.hbs', {city, weather, cities})
})

function startServer() {
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`)
    })


}

connectDB()
    .on('error', console.error.bind(console, 'connection error:'))
    .once("open", startServer)