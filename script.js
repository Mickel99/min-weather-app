window.addEventListener('load', () => {
    const apiKey = 'API';
    let city = 'Stockholm';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const citySelector = document.getElementById('city');

    function fetchWeather() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const iconCode = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
                weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

                const description = data.weather[0].description;
                const temp = Math.round(data.main.temp);
                weatherDescription.textContent = `Det är ${description.toLowerCase()} i ${city}.`;
                temperature.textContent = `${temp}°C`;

                // Uppdatera bakgrundsfärg baserat på väderbeskrivningen
                updateBackgroundColor(description.toLowerCase());
            })
            .catch(error => {
                console.log('Error fetching weather data:', error);
            });
    }

    function updateBackgroundColor(weatherDescription) {
        const body = document.body;
        if (weatherDescription.includes('regn')) {
            body.style.backgroundColor = '#6c7a89';
        } else if (weatherDescription.includes('moln')) {
            body.style.backgroundColor = '#bdc3c7';
        } else {
            body.style.backgroundColor = '#f0f0f0';
        }
    }

    fetchWeather();

    citySelector.addEventListener('change', () => {
        city = citySelector.value;
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetchWeather();
    });
});
