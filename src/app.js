const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs');
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)


app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Karthik Rajah'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Karthik Rajah'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the help message',
        name: 'Karthik Rajah'
    })
})


app.get('/weather', (req,res) => {
    
    if(!req.query.address) {
        res.send({error: 'You must proveide an address'})
    } else {
        
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
  
    
            if(error) {
                return res.send({error: 'Geocode failed'})
            }    
        
            forecast(longitude, latitude, (error, forecastData) => {
            
                if(error) {
                    return res.send({error: 'Unable to get forecast'})
                } 
                
                res.send({

                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            
             }) 
        })
        
        
        
        
        
    }
})


app.get('/help/*', (req,res) => {
    res.render('error', {
        error: 'Help article not found',
        title: 'Error',
        name: 'Karthik Rajah'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        error: 'Page not found',
        title: 'Error',
        name: 'Karthik Rajah'

    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})