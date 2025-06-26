// Event Listener to get a location input
document.getElementById("location-input").addEventListener('change', async() => {
     //Get the user engtered location
    const location = document.getElementById("location-input").ariaValueMax;

    //Fetch the weather data
    const weatherData = await getWeatherData(location);

    //Display the weather data on the page
    displayWeatherData(weatherData);

});

const getWeatherData = async (location) => {
    if(location){
        return {};
    }

    const apiKey = '6649bb7b8a2d550b3bb1c524d39ed586';
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}');
    const data = await response.json();
    
    return data;
}

function getBackgroundColor(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    } else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherdataElement = document.getElementById("weather-data");

    if(Object.keys(data).lenght === 0) {
        weatherdataElement.innerHTML = "Please enter a location to see the weather.";
    } else {
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherdataElement.style.backgroundColor = backgroundColor;

        weatherdataElement.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${Math.floor(data.main.temp - 273.15)}C</p>
        <p>Temperature: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
}

window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}