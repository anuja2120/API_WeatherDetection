const apiKey = "a1d9c445802e1d4ceb6f9b29e5cb97cd";

const loadTemperatureData = () => {
    const inputValue = document.getElementById('input-value');
    const weatherStatus = document.getElementById('weather-status');

    if (!inputValue.value.trim()) {
        weatherStatus.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${apiKey}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('City not found. Please try again.');
            }
            return res.json();
        })
        .then(data => displayTemperature(data, weatherStatus))
        .catch(error => {
            console.error('Error loading temperature data:', error);
            weatherStatus.innerHTML = `<p>Error: ${error.message}</p>`;
        });

    inputValue.value = '';
    weatherStatus.innerHTML = 'Loading...';
};

const displayTemperature = (data, weatherStatus) => {
    const weatherInfo = document.createElement('div');

    // Formatting sunrise and sunset times
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    // Constructing weather info HTML
    weatherInfo.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
        <h1 id="city-name">${data.name}</h1>
        <h3><span id="celcius-number">${((data.main.temp) - 273.15).toFixed(2)}</span>&deg;C</h3>
        <h1 class="lead">Sunrise : ${sunriseTime}</h1>
        <h1 class="lead">Sunset : ${sunsetTime}</h1>
    `;

    // Clear previous content
    weatherStatus.innerHTML = '';
    
    // Appending child
    weatherStatus.appendChild(weatherInfo);
};
