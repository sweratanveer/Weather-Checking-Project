// API key for OpenWeatherMap API
const apiKey = "a62c0b59371902ebb8214b1daef6268b";

// Get the button element to trigger weather fetch
const button = document.getElementById("getWeather");

// Get the container element where weather results will be displayed
const resultBox = document.getElementById("weatherResult");

// Add click event listener to the button
button.addEventListener("click", () => {
  // Get the city name entered by the user
  const city = document.getElementById("cityInput").value;

  // Check if city input is empty
  if (city === "") {
    resultBox.innerHTML = "<p>Please enter a city name!</p>"; // Show error message
    return; // Stop further execution
  }

  // Construct the OpenWeatherMap API URL with city, API key, and units in Celsius
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch weather data from the API
  fetch(url)
    .then(response => {
      // Check if response is not OK (e.g., city not found)
      if (!response.ok) {
        throw new Error("City not found ❌"); // Throw error to be caught later
      }
      return response.json(); // Parse response JSON
    })
    .then(data => {
      // Extract temperature, humidity, and main weather condition
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].main; 

      let icon = "";     // Emoji icon for weather
      let bgImage = "";  // Background image URL based on weather

      // Set weather icon and background image based on condition
      if (condition === "Clear") {
        icon = "☀️";
        bgImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')"; // sunny
      } else if (condition === "Clouds") {
        icon = "☁️";
        bgImage = "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')"; // cloudy
      } else if (condition === "Rain") {
        icon = "🌧️";
        bgImage = "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1600&q=80')"; // rainy
      } else if (condition === "Snow") {
        icon = "❄️";
        bgImage = "url('https://images.unsplash.com/photo-1608889179519-d4e30da9d3b8?auto=format&fit=crop&w=1600&q=80')"; // snowy
      } else if (condition === "Thunderstorm") {
        icon = "⛈️";
        bgImage = "url('https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=1600&q=80')"; // thunderstorm
      } else {
        icon = "🌤️";
        bgImage = "url('https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80')"; // default partly cloudy
      }

      // Apply the selected background image to the body
      document.body.style.backgroundImage = bgImage;
      document.body.style.backgroundSize = "cover";       // Cover full screen
      document.body.style.backgroundPosition = "center";  // Center the image
      document.body.style.backgroundRepeat = "no-repeat"; // Do not repeat

      // Display weather information inside the result box
      resultBox.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <div class="weather-icon">${icon}</div>
        <p>🌡 Temperature: ${temp}°C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>⛅ Condition: ${condition}</p>
      `;
    })
    .catch(error => {
      // Display error message if fetch fails
      resultBox.innerHTML = `<p>${error.message}</p>`;
    });
});
