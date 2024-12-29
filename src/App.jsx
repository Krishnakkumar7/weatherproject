import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState(""); // State to store user input (city name)
  const [weather, setWeather] = useState(null); // State to store weather data
  const [error, setError] = useState(""); // State to store error message

  // Function to fetch weather data
  const fetchWeather = async () => {
    // If the city entered is not "Kakkanad", show "City not found"
    if (city && city.toLowerCase() !== "kakkanad") {
      setError("City not found");
      setWeather(null);
      return;
    }

    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    const apiKey = "8ac5c4d57ba6a4b3dfcf622700447b1e"; // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=kakkanad&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric&authuser=0`;

    try {
      const response = await fetch(url); // Fetch weather data
      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        setWeather(data); // Store weather data in state
        setError(""); // Clear any previous errors
      } else {
        setWeather(null); // Clear previous weather data
        setError(data.message); // Display error message from API
      }
    } catch (err) {
      setWeather(null); // Clear weather data
      setError("Something went wrong. Please try again."); // Display generic error
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city} // Bind value to the city state
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>} {/* Display error if any */}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
