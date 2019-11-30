const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hamza Khalifa'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Hamza Khalifa'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'This is the help message',
        name: 'Hamza Khalifa'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        res.send({
            error: 'Please provide an address'
        });
        return;
    }

    geocode(address, (error, geocodeResponse) => {
        if (error) {
            res.send ({ error });
            return;
        }
        forecast(geocodeResponse, (error, response) => {
            if (error) {
                res.send({error});
                return;
            }
            res.send({ ...response });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hamza Khalifa',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hamza Khalifa',
        errorMessage: 'Page not found',
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});