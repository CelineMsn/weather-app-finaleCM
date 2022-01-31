/*Comments in javascript */
/* */

function getForcast(coordinates) {
  /* pour vérifier les details recus de l'API*/
  /*console.log(coordinates);*/
  let apiKey = "b7a70af5fdae9ceec59f16b65fdfdf72";
  /* appeler la nouvelle API*/
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  /*console.log(apiUrl);*/
  /*appeler la fonction */
  axios.get(apiUrl).then(showForecast);
}

/* fonction date actuelle */
function currentTime() {
  let now = new Date();
  let currentDay = now.getDay();
  let Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = Days[currentDay];
  let currentMinute = `${now.getMinutes()}`.padStart(2, "0");
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  dateTime.innerHTML = `${day} ${currentHour}:${currentMinute}`;
}

/* fonction forecast des autres jours de la semaine (ligne 5) */
function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weekdays-forecast-date">
        ${formatDay(forecastDay.dt)}
        </div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="36"/>
        <div class="weekdays-forecast-temp">
            <span class="weekdays-forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
            <span class="weekdays-forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}°</span>  
        </div>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
/* appel de la fonction forecast*/
/*showForecast();*/

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

/*attention aux adresses images http qui sont insécures */

function showPosition(position) {
  axios
    .get(
      `${apiUrl}lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${apiKey}&units=metric`
    )
    .then(showTemperature);
}

/* fonction temperature et description (vent et humidité) actuelle ville recherchée*/
function showTemperature(response) {
  celsiusTemp = response.data.main.temp;
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
  /* pour voir tous les details recus de l'API*/
  /*console.log(response.data)*/

  getForcast(response.data.coord);
}

/* fonction de recherche de ville manuelle*/
function search(event) {
  event.preventDefault();
  let apiKey = "b7a70af5fdae9ceec59f16b65fdfdf72";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${searchName.value}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}

/* fonction de recherche localisation actuelle*/
function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
navigator.geolocation.getCurrentPosition(showPosition);

/* fonction transform unités de température*/
/* fonction transform C° en F°*/
function convertFahrenheit(event) {
  event.addEventListener;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  currentTemp.innerHTML = `${fahrenheitTemp}`;
}
/* fonction transform F° en C°*/
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
searchCity.addEventListener("submit", search);

let currentCity = document.querySelector("#current-location-button");
currentCity.addEventListener("click", current);

let celsiusTemp = null;
fahrenheit.addEventListener("click", convertFahrenheit);
celsius.addEventListener("click", convertCelsius);

let dateTime = document.querySelector("#date");
currentTime();

let currentTemp = document.querySelector("#temperature");

/* Données de base pour toutes les fonctions*/
let apiKey = "b7a70af5fdae9ceec59f16b65fdfdf72";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
