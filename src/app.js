const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// const address = process.argv[2]
// define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

// set up handlebards engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ogonna Anaekwe'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ogonna Anaekwe',
        image: '../public/images/randomImage.jpeg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Ogonna Anaekwe',
        helpText: 'This is some help text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please include an address'
        })
    }
    // if (req.query.address) {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
               return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    latitude: latitude,
                    longitude: longitude,
                    location: location,
                    // summary: summary,
                    // currently: currently,
                    // precipitation: precipitation,
                    address: req.query.address
                })
            })
            
        })
    // } else {
    //     console.log('please provide an address')
    // }
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help404', {
        name: 'Ogonna Anaekwe',
        text: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Ogonna Anaekwe',
        text: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

