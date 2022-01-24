// Define API Key for general use
let apiKey = "b7a70af5fdae9ceec59f16b65fdfdf72";

// Set default to Rotterdam
accessApi("Rotterdam");

// Display current date and time and forecast days
let now = new Date();

function displayDate(time, dateHTML) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let month = months[time.getMonth()];
  let day = days[time.getDay()];
  let date = time.getDate();

  dateHTML.innerHTML = `${day}, ${month} ${date}`;

  // Display forecast days
  let forecastDays = document.querySelectorAll(".forecast-card h5");
  for (let i = 0; i < 5; i++) {
    forecastDays[i].innerHTML = days[time.getDay() + i + 1];
  }
}

function displayTime(time, timeHTML) {
  let hour = time.getHours();
  let minute = time.getMinutes();

  if (minute < 10) {
    minute = "0" + minute;
  }

  timeHTML.innerHTML = `${hour}h${minute}`;
}

// Display date
let currentDate = document.querySelector("#current-date");
displayDate(now, currentDate);

// Display time
let currentTime = document.querySelector("#current-time");
displayTime(now, currentTime);

// Display forecast
function displayForecast(response) {
  // Display weather icon
  let forecastIcons = document.querySelectorAll(".forecast-weather-icon");
  for (let i = 0; i < 5; i++) {
    forecastIcons[i].setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png`
    );
  }

  // Display max and min temperature
  let maxTemp = document.querySelectorAll(".max-temp");
  let minTemp = document.querySelectorAll(".min-temp");
  for (let i = 0; i < 5; i++) {
    maxTemp[i].innerHTML = Math.round(response.data.daily[i].temp.max);
    minTemp[i].innerHTML = Math.round(response.data.daily[i].temp.min);
  }
}

// Display city name and temperature + details
function getTemperature(response) {
  // Display temperature
  let temperature = Math.round(response.data.main.temp);
  let tempHtml = document.querySelector(".temp-number");
  tempHtml.innerHTML = temperature;

  // Display humidity
  let humidity = response.data.main.humidity;
  let humidityHtml = document.querySelector(".humidity");
  humidityHtml.innerHTML = humidity;

  // Display wind speed
  let wind = Math.round(response.data.wind.speed * 3.6);
  let windHtml = document.querySelector(".wind");
  windHtml.innerHTML = wind;

  // Display sunrise
  let sunrise = new Date(response.data.sys.sunrise * 1000);
  sunrise = sunrise.toLocaleTimeString();
  sunrise = sunrise.substr(0, 5).replace(":", "h");
  let sunriseHtml = document.querySelector(".sunrise");
  sunriseHtml.innerHTML = sunrise;

  // Display sunset
  let sunset = new Date(response.data.sys.sunset * 1000);
  sunset = sunset.toLocaleTimeString();
  sunset = sunset.substr(0, 5).replace(":", "h");
  let sunsetHtml = document.querySelector(".sunset");
  sunsetHtml.innerHTML = sunset;

  // Display weather description
  let weatherDescription = response.data.weather[0].description;
  weatherDescription =
    weatherDescription[0].toUpperCase() + weatherDescription.substring(1);
  let weatherDescriptionHtml = document.querySelector(".weather-description");
  weatherDescriptionHtml.innerHTML = weatherDescription;

  // Display weather icon
  let weatherIcon = response.data.weather[0].icon;
  let weatherIconHtml = document.querySelector("#weather-icon");
  weatherIconHtml.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );

  // Access forecast function
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;

  axios.get(forecastApiUrl).then(displayForecast);
}

function accessApi(citySearch) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemperature);
}

function changeCityName(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search").value;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = citySearch;

  accessApi(citySearch);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", changeCityName);

// Display current location and temperature
function getCurrentTemperature(response) {
  let currentLocation = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = currentLocation;

  getTemperature(response);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getCurrentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

//Change temperature metric

//Change to Celsius
function changeToC() {
  let tempMetric = document.querySelectorAll(".temp-metric");
  if (tempMetric[0].innerHTML === "ºF") {
    tempMetric.forEach((element) => (element.innerHTML = "ºC"));
    let tempNumber = document.querySelectorAll(".temp-number");
    tempNumber.forEach(
      (element) =>
        (element.innerHTML = Math.round(((element.innerHTML - 32) * 5) / 9))
    );
  }
}

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToC);

//Change to Fahrenheit
function changeToF() {
  let tempMetric = document.querySelectorAll(".temp-metric");
  if (tempMetric[0].innerHTML === "ºC") {
    tempMetric.forEach((element) => (element.innerHTML = "ºF"));
    let tempNumber = document.querySelectorAll(".temp-number");
    tempNumber.forEach(
      (element) =>
        (element.innerHTML = Math.round((element.innerHTML * 9) / 5 + 32))
    );
  }
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToF);
