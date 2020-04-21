const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

var geocodedata

// setup handlebars engine and customise views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'W E A T H E R Home',
        name: 'wee meng'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT Us',
        story: 'Set up today to assist people in need during this covid outbreak.',
        name: 'terens tan'
    })
})

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Todays Weather for you',
        forecast: 'It is snowing',
        location: 'Philadelphia',
        name: 'wee meng tan'
    })
})

app.get('/about/*', (req, res) => {
    res.render('pagenotfound', {
        title: 'ABOUT Us not found',
        message: 'nothing about us here...',
        guide: 'Click Back to go back'
    })
})

app.get('/weather/*', (req, res) => {
    res.render('pagenotfound', {
        title: 'Todays weather page not found here.',
        message: 'No such weather data',
        guide: 'Click Back to go back'
    })
})

app.get('/forecast', (req, res) => {
    console.log(req.query);
    if (!req.query.address) {
        return res.send({
            error: 'please provide the address for weather forecast'
        })
    }
    console.log(req.query.address);

    //-- work with geocode and weather stack
    const address = req.query.address
    geocode(address, (error, data) => {
        if (error) {
            return res.send({
                locationerror: error
            })
        }
        geocodedata = data // if no error from geocode

        //once we get the location, send it to weather stack forecast
        forecast(data.longitude, data.lattitude, (error, data) => {
            if (error) {
                return res.send({
                    forecasterror: error
                })
            }
            res.send({
                    geocodedata,
                    data
                }) //is no error from forecast, proceed to display
        })
    })

    //--geocode and weather stack
})


app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error: 'you need to provide search query'
        })
    }
    console.log(req.query.search);
    res.send({ products: [] })
})

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: 'Ops Page not found',
        message: 'There is no such URL',
        guide: 'Click Back to go back'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})