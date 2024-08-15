import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Acceder a la variable de entorno
    console.log('API Key BLAH:', import.meta.env.VITE_OPENWEATHER_API_KEY);

    const fetchWeather = async () => {
      try {
        // Paso 1: Obtener coordenadas de Santiago de Chile
        const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=Santiago,CL&limit=1&appid=${apiKey}`;
        const geocodeResponse = await axios.get(geocodeUrl);
        const { lat, lon } = geocodeResponse.data[0];

        // Paso 2: Usar coordenadas para obtener el clima actual
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const weatherResponse = await axios.get(weatherUrl);
        const { temp, temp_min, temp_max } = weatherResponse.data.main;

        setWeather({
          temp: temp.toFixed(1),
          tempMin: temp_min.toFixed(1),
          tempMax: temp_max.toFixed(1)
        });
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <Typography variant="h6">
            <h1>Santiago, Chile</h1>
          </Typography>
          <Typography variant="p">
            <p>Actual: {weather.temp} °C</p>
            <p>Mínima: {weather.tempMin} °C</p>
            <p>Máxima: {weather.tempMax} °C</p>
          </Typography>
        </div>
        
      ) : (
        <Typography variant="p">
            <p>Cargando datos del clima...</p>
        </Typography>
      )}
    </div>
  );
};

export default Weather;
