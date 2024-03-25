import React from "react";
import { WeatherData } from "../types/weather.type";

interface CurrentWeatherProps {
  weatherData: WeatherData;
  temperatureUnit: "metric" | "imperial";
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  temperatureUnit,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        Current Weather in {weatherData.name}, {weatherData.sys.country}
      </h2>
      <p>
        Temperature: {weatherData.main.temp}&deg;
        {temperatureUnit === "metric" ? "C" : "F"}
      </p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>
        Wind Speed: {weatherData.wind.speed}{" "}
        {temperatureUnit === "metric" ? "mt/s" : "ml/h"}
      </p>
      <p>Weather Condition: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default CurrentWeather;
