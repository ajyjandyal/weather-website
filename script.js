async function getWeather() {
    const city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    try {
        // Convert city name to latitude & longitude using Open-Meteo Geocoding API
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            alert("City not found. Try again.");
            return;
        }

        const { latitude, longitude } = geoData.results[0];

        // Fetch weather data from Open-Meteo API
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
        );
        const weatherData = await weatherResponse.json();

        // Display weather info
        document.getElementById("city-name").innerText = `Weather in ${city}`;
        document.getElementById("temperature").innerText = `Temperature: ${weatherData.current_weather.temperature}°C`;
        document.getElementById("description").innerText = `Weather: ${weatherData.current_weather.weathercode}`;
        document.getElementById("wind-speed").innerText = `Wind Speed: ${weatherData.current_weather.windspeed} km/h`;

        document.getElementById("weather-info").style.display = "block";
    } catch (error) {
        alert("Error fetching weather data.");
    }
}
