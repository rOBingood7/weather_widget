import axios from "axios";

const inp = document.querySelector(".search_bar input");
const weather_icon = document.querySelector(".weather_icon");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const form = document.querySelector("form");
const today = new Date();
const options = { month: "long", day: "numeric" };
const formattedDate = today.toLocaleDateString("en-EN", options);

const finalDate = `${formattedDate}`;
if (date) {
  date.innerHTML = finalDate;
}
async function updateWeather(query) {
  const options = {
    method: "GET",
    url: "https://api.weatherstack.com/current",
    params: {
      access_key: "2f06eef3dc58fc6edd76d3ab118cb71d",
      query: query,
    },
  };

  try {
    const response = await axios.request(options);
    const weather = response.data.current;
    const location = response.data.location;

    if (weather && location) {
      city.innerHTML = location.name;
      humidity.innerHTML = `Hum | ${weather.humidity}`;
      temperature.innerHTML = `${weather.temperature}°`;
      wind.innerHTML = `Wind | ${weather.wind_speed}`;
      weather_icon.style.background = `url(${weather.weather_icons})`;
    } else {
      console.error("Weather or location data is missing");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

form.onsubmit = (e) => {
  e.preventDefault();
  updateWeather(inp.value);
};

const userLocation = Intl.DateTimeFormat().resolvedOptions().timeZone;
updateWeather(userLocation);
