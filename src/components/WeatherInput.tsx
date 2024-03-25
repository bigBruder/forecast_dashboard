import React from "react";

interface WeatherInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Enter city name"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="flex-grow border border-gray-300 px-4 py-2 rounded-md outline-none"
      />
    </div>
  );
};

export default WeatherInput;
