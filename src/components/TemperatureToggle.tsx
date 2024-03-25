import React from "react";

interface TemperatureToggleProps {
  unit: "metric" | "imperial";
  onClick: (unit: "metric" | "imperial") => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({
  unit,
  onClick,
}) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onClick("metric")}
        className={`border border-gray-300 rounded-l-md px-3 font-bold flex items-center gap-1 py-1 focus:outline-none ${
          unit === "metric" ? "bg-blue-100" : "bg-white"
        }`}
      >
        {"\u2103"}
      </button>
      <button
        onClick={() => onClick("imperial")}
        className={`border border-gray-300 rounded-r-md px-3 font-bold flex items-center gap-1 py-1 focus:outline-none ${
          unit === "imperial" ? "bg-blue-100" : "bg-white"
        }`}
      >
        {"\u2109"}
      </button>
    </div>
  );
};

export default TemperatureToggle;
