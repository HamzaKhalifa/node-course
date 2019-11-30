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
                fetch('http://localhost:8000/weather?address=' + address).then(res => res.json()).then(res => {
                    if (res.error) {
                        errorText.innerHTML = res.error;
                        weatherText.innerHTML = '';
                    } else {
                        weatherText.innerHTML = 'Temperature: ' + res.temperature + ', Rain probability: ' + res.precipProbability + ', Place: ' + res.placeName; 
                        errorText.innerHTML = '';
                    }
                });
            }
        })
    }
    handleWeatherForm();
})();