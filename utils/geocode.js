const axios = require('axios');

const geocode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiY2hpa2l2b3NzIiwiYSI6ImNrM2h2bzFjcDAxcTczY3A2Z2VxZzBqbWcifQ.X5GaAoepJz10iFaOtDVx-A';
    axios.get(url).then(({data}) => {
        if (data.features.length === 0) {
            callback('Place was not found', undefined);
        } else {
            const [longitude, latitude] = data.features[0].center;
            const placeName = data.features[0].place_name;
            callback(undefined, {latitude, longitude, placeName});
        }
    }).catch(e => {callback(e.message, undefined)})
}

module.exports = geocode;