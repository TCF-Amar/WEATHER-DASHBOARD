import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchWeather = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return; // Empty query check

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}`);
      setWeatherData(response.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex flex-col pt-10 items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold"><i>WeatherApp</i></h1>

      {/* Search Form */}
      <motion.form
        onSubmit={fetchWeather}
        className="flex items-center gap-4  border-gray-600 rounded-lg  px-3 mt-4  border "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.input
          type="text"
          className="outline-none bg-transparent text-white p-2 w-full transition-all duration-300 ease-in-out  rounded-lg"
          placeholder="Search Location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <motion.button
          type="submit"
          className="p-2 text-gray-300 hover:text-white transition-all duration-300 ease-in-out "
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaSearch />
        </motion.button>
      </motion.form>


      {/* Loader */}
      {loading && (
        <motion.div
          className="flex flex-col items-center  w-full max-w-md p-4 rounded-lg mt-4 bg-gray-800 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse m-1"></div>
          <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse m-1"></div>
          <div className="h-20 w-20 bg-gray-700 rounded-full animate-pulse mt-2"></div>
          <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse mt-1"></div>
          <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse mt-1"></div>
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-full mt-1"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-full mt-1"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-full mt-1"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-full mt-1"></div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>❌ {error}</p>
        </div>
      )}

      {/* Not Found Message */}
      {!error && !loading && !weatherData?.location && (
        <div className="text-gray-500 text-center mt-4">
          <p>🔍 Location Not Found</p>
        </div>
      )}

      {/* Weather Data Display */}
      {!loading && !error && weatherData?.location && weatherData?.current && (
        <motion.div
          className="flex flex-col items-center w-full max-w-md p-4 rounded-lg mt-4 bg-gray-800 shadow-lg duration-300 transition-all ease-in-out"
          // transition={{ duration: .1, ease: "easeOut", type: "spring", stiffness: 100 }}
        >
          <motion.h2
            className="text-xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {weatherData.location.name}, {weatherData.location.country}
          </motion.h2>

          <motion.p
            className="text-sm text-gray-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            📍 {weatherData.location.region}
          </motion.p>

          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            🕒 Local Time: {weatherData.location.localtime}
          </motion.p>

          <motion.img
            src={weatherData.current.condition.icon.replace("//", "https://")}
            alt={weatherData.current.condition.text}
            className="mx-auto mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
          />

          <motion.p
            className="text-lg font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {weatherData.current.condition.text}
          </motion.p>

          <motion.p
            className="text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            🌡️ {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
          </motion.p>

          <motion.p
            className="text-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Feels like: {weatherData.current.feelslike_c}°C
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-4 text-sm mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p>💨 Wind: {weatherData.current.wind_kph} kph ({weatherData.current.wind_dir})</p>
            <p>💧 Humidity: {weatherData.current.humidity}%</p>
            <p>☁️ Cloud Cover: {weatherData.current.cloud}%</p>
            <p>🌞 UV Index: {weatherData.current.uv}</p>
          </motion.div>
        </motion.div>

      )}
    </div>
  );
}

export default WeatherApp;
