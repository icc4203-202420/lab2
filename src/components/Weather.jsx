import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import fetchWeather from '../api/weatherApi';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const temps = await fetchWeather("Santiago,CL"); // Espera a que la promesa se resuelva

      if (temps) { // Verifica que la respuesta no sea nula o indefinida
        setWeather({
          temp: temps.temp,
          tempMin: temps.tempMin,
          tempMax: temps.tempMax
        });
      }
    };

    fetchData(); // Llama a la función asincrónica
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
