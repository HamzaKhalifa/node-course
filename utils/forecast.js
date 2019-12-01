const axios = require('axios');

const forecast = ({latitude, longitude, placeName}, callback) => {
    const url = 'https://api.darksky.net/forecast/60bfb1ff3bb769e4b3c1f6e7e103d77c/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'?units=si';
    axios.get(url).then(({data}) => {
        const temperature = data.currently.temperature;
        callback(undefined, {temperature, currently: data.currently, placeName });
    }).catch(e => {
        callback(e.message, undefined);
    });
}

module.exports = forecast;