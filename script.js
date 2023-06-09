
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
  const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error.message);
  }
}

function displayWeather(weatherData) {
  const cityName = weatherData.data[0].city_name;
  const temperature = weatherData.data[0].temp;
  const weatherDescription = weatherData.data[0].weather.description;

  weatherDisplay.innerHTML = `<strong>${cityName}</strong>: ${temperature}°C, ${weatherDescription}`;
}
