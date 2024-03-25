import React from "react";
import CurrentWeather from "./CurrentWeather";
import { WeatherData } from "../types/weather.type";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  temperatureUnit: "metric" | "imperial";
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  temperatureUnit,
}) => {
  return (
    <div className="bg-white p-4 rounded-md border border-gray-300 flex items-start justify-between">
      <CurrentWeather
        weatherData={weatherData}
        temperatureUnit={temperatureUnit}
      />
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
          alt="Weather Icon"
        />
      </div>
    </div>
  );
};

export default WeatherDisplay;
