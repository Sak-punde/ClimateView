import React from "react";

function WeatherCard({ weather }) {
  if (!weather) return null;   

  return (
    <div className="weather-box">
      <h2>{weather.city}</h2>
      <p>🌡️ Temperature: {weather.temperature} °C</p>
      <p>🌬️ Wind Speed: {weather.wind} km/h</p>
    </div>
  );
}

export default WeatherCard;
