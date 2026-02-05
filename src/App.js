import React, { useState } from "react";
import WeatherCard from "./component/WeatherCard";

import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      // 1️⃣ Get latitude & longitude from city
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name } = geoData.results[0];

      // 2️⃣ Get weather using coordinates
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        temperature: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
      });
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
  <div className="app">
    <h1>🌦️ ClimateView</h1>
 <br/>
    
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
    </div>

    {error && <p className="error">{error}</p>}

   
    <div className="weather-container">
      <WeatherCard weather={weather} />
    </div>
  </div>
);

}
export default App;
