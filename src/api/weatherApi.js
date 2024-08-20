import axios from 'axios';

const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Acceder a la variable de entorno

    try {
        // Paso 1: Obtener coordenadas de Santiago de Chile
        const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geocodeResponse = await axios.get(geocodeUrl);
        const { lat, lon } = geocodeResponse.data[0];

        // Paso 2: Usar coordenadas para obtener el clima actual
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const weatherResponse = await axios.get(weatherUrl);
        const { temp, temp_min, temp_max } = weatherResponse.data.main;

        const temps ={
            temp: temp.toFixed(1),
            tempMin: temp_min.toFixed(1),
            tempMax: temp_max.toFixed(1)
        };

        return temps;

    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

export default fetchWeather;