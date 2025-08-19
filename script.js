const API_KEY = '00f986e7e3d6f562b26365c4fa5f1444';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();

  if (city === '') {
    alert('Please enter a city name');
    return; 
  }

  try {
    const weatherData = await getWeatherData(city);
    displayWeather(weatherData);
  } catch (error) {
    console.log(error);
    weatherDisplay.textContent = 'Failed to fetch weather data. Please try again.';
  }
});

async function getWeatherData(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error.message);
  }
}

function displayWeather(weatherData) {
  const cityName = weatherData.name;
  const temperature = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;

  weatherDisplay.innerHTML = `<strong>${cityName}</strong>: ${temperature}°C, ${weatherDescription}`;
}
