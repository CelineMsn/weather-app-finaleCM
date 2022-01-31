function getForecast(coordinates) {
  let apiKey = "b7a70af5fdae9ceec59f16b65fdfdf72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);


unction showTemperature(response) {
  let celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  let currentHumidity = response.data.main.humidity;
  let currentWind = response.data.wind.speed;
  let currentIcon = document.querySelector("#icon");
  let currentDescription = document.querySelector("#description");

  cityName.innerHTML = `${searchName.value}`;
  currentDescription.innerHTML = `${response.data.weather[0].description}`;
  currentTemp.innerHTML = `${temperature}`;
  hum.innerHTML = `${currentHumidity}`;
  win.innerHTML = `${currentWind}`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
}
function showPosition(position) {
  axios
    .get(
      `${apiUrl}lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${apiKey}&units=metric`
    )
    .then(showTemperature);
}

function search(event) {
  event.preventDefault();

  axios
    .get(`${apiUrl}q=${searchName.value}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}
function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
navigator.geolocation.getCurrentPosition(showPosition);

//Date line 1
let date = document.querySelector("ul li");
const options = {
  weekday: "long",
  minute: "numeric",
  hour: "numeric",
};
var formattedDate = new Intl.DateTimeFormat("eng-US", options).format(
  new Date()
);
date.innerHTML = formattedDate;
let now = new Date();

//Date line 2
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
let month = months[now.getMonth()];
let day = now.getDate();
let year = now.getFullYear();

let date2 = document.querySelector("h4");
date2.innerHTML = `${month} ${day}, ${year}`;


function convertFahrenheit(event) {
  event.addEventListener;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  currentTemp.innerHTML = `${fahrenheitTemp}`;
}
function convertCelsius(event) {
  event.addEventListener;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}`;
}
let cityName = document.querySelector("#city");
let searchName = document.querySelector("#city-input");
let hum = document.querySelector("#humidity");
let win = document.querySelector("#wind");
let searchCity = document.querySelector("#search-form");
let currentCity = document.querySelector("#current-location-button");
let celsiusTemp = null;

searchCity.addEventListener("submit", search);
currentCity.addEventListener("click", current);
fahrenheit.addEventListener("click", convertFahrenheit);
celsius.addEventListener("click", convertCelsius);
let dateTime = document.querySelector("#date");
currentTime();
let currentTemp = document.querySelector("#temperature");

let apiKey = "b7a70af5fdae9ceec59f16b65fdfdf72";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
