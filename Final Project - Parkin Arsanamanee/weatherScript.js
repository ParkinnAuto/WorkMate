function getWeather() {
    const apiKey = '7b7f2313fee51b256c53953fba70c32d';
    const city = document.getElementById("city").value;

    if (!city) {
        // If the city input is empty, use geolocation to get the user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoordinates(latitude, longitude, apiKey);
            }, () => {
                alert("Unable to retrieve your location.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    } else {
        // Construct the API URL for city search
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetchWeatherData(currentWeatherUrl);
    }
}

function fetchWeatherByCoordinates(latitude, longitude, apiKey) {
    // Construct the API URL using coordinates
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchWeatherData(currentWeatherUrl);
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const { name, main, weather } = data;
    const temp = main.temp;
    const description = weather[0].description;

    // Display the weather information
    weatherInfo.innerHTML = `
        <br>
        <h3>${name}</h3>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${description}</p>
    `;
}

// Event listener for the button
document.querySelector('.enter').addEventListener('click', getWeather);

// Get weather for the user's location on page load
window.onload = getWeather;