import { useState, useEffect } from "react";
import axios from "axios";
import BackgroundImage from "./assets/background_image.jpg";
import "./App.css";

function App() {
  const [city, setCity] = useState("uppal,hyderabad,telangana");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (location) => {
    try {
      // Current weather
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      );

      // Forecast (next 5 days, 3-hour steps)
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
      );

      setWeather(currentRes.data);

      // Pick one forecast per day (12:00)
      const daily = forecastRes.data.list.filter((f) =>
        f.dt_txt.includes("12:00:00")
      );
      setForecast(daily.slice(0, 4));
    } catch (err) {
      console.error("City not found", err);
      setWeather(null);
      setForecast([]);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  if (!weather)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );

  // Use mobile vs desktop background image
  const backgroundImage =
    // window.innerWidth < 768 ? BgMobile : BackgroundImage;
    BackgroundImage;

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* <div className="bg-black bg-opacity-50 h-full px-4 sm:px-8 flex flex-col items-center"> */}
        <div className="h-full px-4 sm:px-8 flex flex-col items-center">
        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="flex gap-2 w-full max-w-md mt-4"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg text-black"
            placeholder="Enter city"
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
        {/* HEADER */}
        <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2 mt-4">
          📍 {weather.name}
        </h2>
        <p className="text-lg sm:text-xl">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </p>
        {/* MAIN WEATHER */}
        <div className="flex flex-col items-center mt-8">
          <img
            alt="icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            className="w-20 sm:w-24"
          />
          <span className="text-6xl sm:text-7xl font-bold">
            {Math.round(weather.main.temp)}°C
          </span>
          <span className="text-2xl sm:text-3xl">
            {weather.weather[0].main}
          </span>
        </div>
        {/* EXTRA INFO */}
        <div className="flex gap-6 sm:gap-12 mt-6 text-center text-sm sm:text-base">
          <div>
            <p className="font-semibold">HUMIDITY</p>
            <p>{weather.main.humidity}%</p>
          </div>
          <div>
            <p className="font-semibold">WIND</p>
            <p>{weather.wind.speed} km/h</p>
          </div>
          <div>
            <p className="font-semibold">FEELS LIKE</p>
            <p>{Math.round(weather.main.feels_like)}°</p>
          </div>
        </div>
        {/* FORECAST */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10  bg-opacity-95 rounded-xl p-4 w-full max-w-lg">
          {forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              <p className="font-semibold">
                {new Date(f.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img
                alt="icon"
                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                className="w-12"
              />
              <p className="text-lg font-bold">
                {Math.round(f.main.temp)}°
              </p>
              <p className="text-sm">{f.weather[0].main}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
