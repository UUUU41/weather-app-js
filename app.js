// Weather App - free Open-Meteo API, no API key needed.
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const fahrenheitBox = document.getElementById('fahrenheit');
const result = document.getElementById('result');

const WEATHER_CODES = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
  55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 80: 'Slight rain showers',
  81: 'Moderate rain showers', 82: 'Violent rain showers', 95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
};

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

async function fetchWeather(city) {
  result.innerHTML = '<p>Loading weather for ' + city + '...</p>';
  try {
    const geoRes = await fetch(
      'https://geocoding-api.open-meteo.com/v1/search?name=' +
        encodeURIComponent(city) + '&count=1'
    );
    const geo = await geoRes.json();
    if (!geo.results || geo.results.length === 0) {
      result.innerHTML = '<p>City not found. Please check the spelling and try again.</p>';
      return;
    }
    const place = geo.results[0];
    const weatherRes = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' + place.latitude +
      '&longitude=' + place.longitude +
      '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'
    );
    const data = await weatherRes.json();
    const current = data.current;
    const temp = fahrenheitBox.checked
      ? toFahrenheit(current.temperature_2m).toFixed(1) + ' F'
      : current.temperature_2m + ' C';
    const description = WEATHER_CODES[current.weather_code] || 'Unknown conditions';
    result.innerHTML = '<h2>' + place.name + ', ' + (place.country || '') + '</h2>' +
      '<p><strong>' + temp + '</strong> - ' + description + '</p>' +
      '<p>Wind: ' + current.wind_speed_10m + ' km/h</p>' +
      '<p>Humidity: ' + current.relative_humidity_2m + '%</p>' +
      '<p>Updated: ' + current.time + '</p>';
  } catch (error) {
    result.innerHTML = '<p>Could not load the weather. Please check your connection and try again.</p>';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchWeather(cityInput.value.trim());
});

document.querySelectorAll('.quick button').forEach((button) => {
  button.addEventListener('click', () => {
    cityInput.value = button.dataset.city;
    fetchWeather(button.dataset.city);
  });
});
