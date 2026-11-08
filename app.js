// ===== Weather App — live data from the free Open-Meteo APIs (no API key) =====
// Step 1: Geocoding API turns a city name into latitude/longitude.
// Step 2: Forecast API returns current weather + daily forecast for those coordinates.

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loadingMsg = document.getElementById("loadingMsg");
const errorMsg = document.getElementById("errorMsg");
const currentCard = document.getElementById("currentCard");
const forecastSection = document.getElementById("forecastSection");
const forecastGrid = document.getElementById("forecastGrid");

// WMO weather codes used by Open-Meteo -> [description, emoji]
const WEATHER_CODES = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Foggy", "🌫️"],
  48: ["Foggy", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Drizzle", "🌦️"],
  56: ["Freezing drizzle", "🌦️"],
  57: ["Freezing drizzle", "🌦️"],
  61: ["Light rain", "🌧️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  66: ["Freezing rain", "🌧️"],
  67: ["Freezing rain", "🌧️"],
  71: ["Light snow", "🌨️"],
  73: ["Snow", "🌨️"],
  75: ["Heavy snow", "❄️"],
  77: ["Snow grains", "🌨️"],
  80: ["Light showers", "🌦️"],
  81: ["Rain showers", "🌦️"],
  82: ["Violent showers", "⛈️"],
  85: ["Snow showers", "🌨️"],
  86: ["Snow showers", "🌨️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Thunderstorm with hail", "⛈️"]
};

function describeCode(code) {
  return WEATHER_CODES[code] || ["Unknown", "🌡️"];
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
}

function hideError() {
  errorMsg.classList.add("hidden");
  errorMsg.textContent = "";
}

function setLoading(isLoading) {
  loadingMsg.classList.toggle("hidden", !isLoading);
  searchBtn.disabled = isLoading;
  searchBtn.textContent = isLoading ? "⏳ Searching…" : "🔍 Search";
}

// Step 1 — find the city's coordinates
async function geocodeCity(city) {
  const url = "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(city) + "&count=1&language=en&format=json";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Geocoding request failed");
  const data = await response.json();
  if (!data.results || data.results.length === 0) return null;
  return data.results[0]; // { name, country, latitude, longitude, timezone }
}

// Step 2 — get current weather + daily forecast for the coordinates
async function fetchWeather(latitude, longitude) {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude +
    "&longitude=" + longitude +
    "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Weather request failed");
  return response.json();
}

function renderCurrent(place, data) {
  const current = data.current;
  const [description, icon] = describeCode(current.weather_code);

  document.getElementById("cityName").textContent =
    place.name + (place.country ? ", " + place.country : "");
  document.getElementById("currentIcon").textContent = icon;
  document.getElementById("conditionText").textContent = description;
  document.getElementById("currentTemp").textContent = Math.round(current.temperature_2m) + "°C";
  document.getElementById("humidityValue").textContent = current.relative_humidity_2m + "%";
  document.getElementById("windValue").textContent = Math.round(current.wind_speed_10m) + " km/h";

  // current.time is ISO local time at the city, e.g. "2026-11-08T13:45"
  const timePart = (current.time || "").split("T")[1] || "";
  document.getElementById("timeValue").textContent = timePart;

  currentCard.classList.remove("hidden");
}

function renderForecast(data) {
  const daily = data.daily;
  forecastGrid.innerHTML = "";

  // Skip today (index 0) and show the next 5 days
  for (let i = 1; i <= 5 && i < daily.time.length; i++) {
    const [description, icon] = describeCode(daily.weather_code[i]);
    const dayName = new Date(daily.time[i] + "T00:00:00")
      .toLocaleDateString("en-IN", { weekday: "short" });

    const card = document.createElement("div");
    card.className = "forecast-day";
    card.innerHTML =
      '<div class="day-name">' + dayName + "</div>" +
      '<div class="day-icon">' + icon + "</div>" +
      '<div class="day-cond">' + description + "</div>" +
      '<div class="day-temps"><span class="min">' + Math.round(daily.temperature_2m_min[i]) +
      '°</span> / ' + Math.round(daily.temperature_2m_max[i]) + "°</div>";
    forecastGrid.appendChild(card);
  }
  forecastSection.classList.remove("hidden");
}

async function loadWeather(city) {
  hideError();
  setLoading(true);
  try {
    const place = await geocodeCity(city);
    if (!place) {
      currentCard.classList.add("hidden");
      forecastSection.classList.add("hidden");
      showError('😕 Sorry, I could not find "' + city + '". Please check the spelling and try another city.');
      return;
    }
    const data = await fetchWeather(place.latitude, place.longitude);
    renderCurrent(place, data);
    renderForecast(data);
  } catch (error) {
    showError("⚠️ Something went wrong while fetching the weather. Please check your internet connection and try again.");
  } finally {
    setLoading(false);
  }
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city.length < 2) {
    showError("✍️ Please type a city name first (at least 2 letters).");
    return;
  }
  loadWeather(city);
});

// Default city shown when the page opens
loadWeather("Delhi");
