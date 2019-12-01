(() => {
    const handleWeatherForm = () => {
        const weatherForm = document.querySelector('#weather_form');
        const addressInput = weatherForm.querySelector('#address');
        const weatherText = document.querySelector('#weather');
        const errorText = document.querySelector('#error');
        
        weatherForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const address = addressInput.value;
            if (address && address !== null) {
                weatherText.innerHTML = 'Loading...';
                errorText.innerHTML = '';
                fetch('/weather?address=' + address).then(res => res.json()).then(res => {
                    if (res.error) {
                        errorText.innerHTML = res.error;
                        weatherText.innerHTML = '';
                    } else {
                        const { humidity, precipProbability, windSpeed, windGust } = res.currently;
                        weatherText.innerHTML = 'Temperature: ' + res.temperature + ', Rain probability: ' + precipProbability + ', Place: ' + res.placeName
                            + ', Humidity: ' + humidity + ', Wind speed: ' + windSpeed + ', Wind gust: ' + windGust; 
                        errorText.innerHTML = '';
                    }
                });
            }
        })
    }
    handleWeatherForm();
})();