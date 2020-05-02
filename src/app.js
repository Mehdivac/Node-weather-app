const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDir));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Acceuil',
        name: "Mehdivac"
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About us',
        name: "Mehdivac"
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Need any help?',
        helpText: "Here the instructions",
        name: 'Mehdivac'
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        res.send({
            error: "You must provide an address"
        })
    } else{

        geocode(req.query.address, (error, {lat, long, location} = {}) =>{
            if (error){
                return res.send({
                    error: error
                });
                console.log(error);
            }
        
            forecast(lat, long, (error,forecastdata)=>{
                if (error){
                    return res.send({
                        error: error
                    });
                }

                res.send({
                    location,
                    forecast: forecastdata,
                    address: req.query.address
                })
               
            })
        } )
    }   
})

app.get('/products', (req, res) => {

    if (!req.query.search){
        res.send({
            error: "You must provide a search term"
        })
    } else{
        console.log(req.query.search);
        res.send({
        products: []
    });
    }
    
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: "404",
        message: "Help article not found",
        name: "Mehdivac"
    });
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404',
        message: "Page not found",
        name: "Mehdivac"
    });
})

app.listen(port, () => {
    console.log("Server on port " + port);
});
