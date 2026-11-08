# 🌦️ Weather App — JS

A clean, fully working weather app built with plain HTML, CSS and JavaScript. Search for any city in the world and instantly see its **current weather** plus a **5-day forecast** — powered by the free [Open-Meteo](https://open-meteo.com/) APIs, so **no API key and no sign-up** are needed.

## ✨ Features

- 🔍 **City search** — type any city name and get its live weather
- 🌡️ **Current weather card** — temperature, condition, humidity, wind speed and the city's local time
- 📅 **5-day forecast** — day name, condition with emoji, and min / max temperatures
- ⏳ **Loading state** while data is being fetched
- 😕 **Friendly error messages** for unknown cities, empty input and network problems
- 🏙️ **Default city (Delhi)** loads automatically when the page opens
- 📱 **Responsive design** that works on mobile and desktop
- 🎨 Attractive sky-blue gradient theme

## 🔌 APIs Used

Both APIs are free and need no key:

1. **Open-Meteo Geocoding API** — converts a city name into coordinates
   `https://geocoding-api.open-meteo.com/v1/search?name=<city>&count=1&language=en&format=json`
2. **Open-Meteo Forecast API** — returns current weather and daily forecast for those coordinates
   `https://api.open-meteo.com/v1/forecast?latitude=<lat>&longitude=<lon>&current=...&daily=...&timezone=auto`

Weather condition codes (WMO codes) are mapped in `app.js` to a text description and an emoji, e.g. code `0` → "Clear sky ☀️", code `61` → "Light rain 🌧️".

## 🚀 How to Run

1. Download or clone this repository.
2. Open **`index.html`** in any modern web browser.
3. That's it — type a city name and press **Search**.

> 📶 An internet connection is required, because the weather data is fetched live from Open-Meteo.

## 🛠️ Tech Stack

- **HTML5** — page structure
- **CSS3** — gradient theme, cards, responsive grid layout
- **Vanilla JavaScript** — `fetch` with async/await, DOM updates, error handling

## 📂 Project Structure

```
weather-app-js/
├── index.html   # Page structure: search, current weather, forecast
├── style.css    # Sky-blue gradient design, responsive cards
├── app.js       # Geocoding + forecast API calls and rendering logic
└── README.md
```

## 🔮 Future Improvements

- Hourly forecast for the current day
- °C / °F temperature unit toggle
- "Use my location" button with the Geolocation API
- Recent searches saved in localStorage
- Dynamic background that changes with the weather condition

## 👨‍💻 Author

**Chandan Yadav** — BCA student & frontend developer
GitHub: [@UUUU41](https://github.com/UUUU41)
