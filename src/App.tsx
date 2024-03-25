// WeatherWidget.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import { WeatherData } from "./types/weather.type";
import WeatherInput from "./components/WeatherInput";
import TemperatureToggle from "./components/TemperatureToggle";
import WeatherDisplay from "./components/WeatherDisplay";
import { FaSync } from "react-icons/fa";

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<"metric" | "imperial">(
    "metric"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const API_KEY = "a001bf25d4f5506c5a06ab47731f914b";

  const fetchWeatherData = async () => {
    setErrorMessage(null);
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${temperatureUnit}`;
    setLoading(true);
    try {
      const response = await axios.get<WeatherData>(API_URL);
      setWeatherData(response.data);
    } catch (error) {
      setErrorMessage("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async () => {
    setErrorMessage(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const reverseGeocodingResponse = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
          );

          const cityName =
            reverseGeocodingResponse.data[0].name ||
            reverseGeocodingResponse.data[0].local_names.en;

          setCity(cityName);
        } catch (error) {
          setErrorMessage("Error fetching weather data by coordinates");
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      fetchWeatherData();
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [city]);

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [temperatureUnit]);

  useEffect(() => {
    fetchWeatherByCoordinates();
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setCity(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  const handleUnitChange = (unit: "metric" | "imperial") => {
    setTemperatureUnit(unit);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Weather Dashboard</h1>
      <div className="max-w-md mx-auto flex flex-col gap-2">
        <WeatherInput
          value={city}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center justify-between">
          <TemperatureToggle
            unit={temperatureUnit}
            onClick={handleUnitChange}
          />
          <div className="text-center">
            <button
              disabled={!weatherData}
              onClick={fetchWeatherData}
              className="bg-blue-100 !disabled:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              <FaSync />
            </button>
          </div>
        </div>
        {!loading && weatherData && (
          <WeatherDisplay
            weatherData={weatherData}
            temperatureUnit={temperatureUnit}
          />
        )}
        {loading && <Loader />}
        {errorMessage && (
          <div className="w-full font-semibold text-center text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
