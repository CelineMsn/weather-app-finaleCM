//search bar
let form = document.querySelector("form");
form.addEventListener("submit", SearchCity);

function SearchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-bar");
  let city = document.querySelector("h1");
  city.innerHTML = input.value;
}
//let myLocation = document.querySelector("myLocation");
//myLocation.addEventListener("submit", findPosition);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let citySearched = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${citySearched}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}`;
}

let apiKey = "b7a70af5fdae9ceec59f16b65fdfdf72";
let units = "metric";
let city = "sydney";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

function findPosition(position) {
  let apiKey = "b7a70af5fdae9ceec59f16b65fdfdf72";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(findPosition);
axios.get(apiUrl).then(findPosition).then(showTemperature);

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

// temperature

function changingD(event) {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = 66;
}

let fernaheint = document.querySelector("#f");
fernaheint.addEventListener("click", changingD);

function changeC(event) {
  let temp = document.querySelector(".temperature");
  temp.innerHTML = 19;
}

let degree = document.querySelector("#c");
degree.addEventListener("click", changeC);

/// old CSS image https://www.desktopbackground.org/download/o/2013/11/16/671061_four-seasons-desktop_1680x1050_h.jpg
