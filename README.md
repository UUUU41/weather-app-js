# Weather App (JavaScript)

A weather app using the free Open-Meteo API (no API key needed).

## Features

- Search any city by name and get its current weather
- Shows temperature, wind speed, humidity and a plain-language weather description
- Uses the Open-Meteo geocoding API to find a city's latitude and longitude
- Uses the Open-Meteo forecast API for current conditions - no API key or sign-up needed
- Switch between Celsius and Fahrenheit
- Quick links for popular cities such as New Delhi, London and New York
- Clear error messages when a city is not found or the network fails

## Tech Stack

- HTML5 - structure and search form
- CSS3 - layout and styling (inline in `index.html` for simplicity)
- JavaScript - `fetch`, async/await and DOM updates in `app.js`
- Open-Meteo APIs - geocoding and forecast, free with no API key

## How to Run / Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/UUUU41/weather-app-js.git
   cd weather-app-js
   ```

2. Open `index.html` in any modern web browser, or serve the folder:

   ```bash
   python3 -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

3. Type a city name, for example `New Delhi`, and click Search. The app first calls `https://geocoding-api.open-meteo.com/v1/search?name=New%20Delhi&count=1`, then fetches the current weather for the returned coordinates.

Note: the app calls the live Open-Meteo API, so it needs an internet connection.

## Project Structure

```text
weather-app-js/
- index.html   (page structure, search form and result area)
- app.js       (geocoding, weather fetch and display logic)
- README.md    (project documentation)
```

## Future Improvements

- Add a 7-day forecast and hourly temperatures
- Show weather icons and a background that matches the conditions
- Use the browser's location to show local weather automatically
- Add recent searches saved in localStorage
- Add a map view of the searched city

## Author

Chandan Yadav (UUUU41) - https://github.com/UUUU41
