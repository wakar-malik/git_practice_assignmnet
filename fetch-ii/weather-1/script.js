const KEY = "1e15c0829cfb700417631978a3bc7e18";
const input = document.querySelector("input");
const form = document.querySelector("form");
const container = document.querySelector(".container");
const mapContainer = document.querySelector(".mapContainer");
const iFrame = document.querySelector("iframe");
const cityContainer = document.querySelector(".cityContainer");
let spinner = null;
const month = [
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

let html = "";

const renderCity = function (city) {};

async function getCityData(cityName) {
  const date = new Date();
  const monthName = month[date.getMonth()];
  const today = date.getDate();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  mapContainer.classList.add("hidden");
  cityContainer.classList.add("hidden");
  html = `<div class="spinner"></div>`;

  container.insertAdjacentHTML("afterbegin", html);
  spinner = document.querySelector(".spinner");

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${KEY}`
  );
  const data = await response.json();
  const { city, list } = data;

  const { all } = list[1].clouds;
  const { speed, deg, gust } = list[1].wind;
  const { temp_min, temp_max } = list[1].main;
  const { sunrise } = city;
  const { sunset } = city;
  const sunriseFormat = new Date(sunrise).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const sunsetFormat = new Date(sunset).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  console.log(city);
  console.log(data);

  html = `<p class="time">${monthName} ${today}, ${time}</p>
  <h1 class="cityName">${city.name}, ${city.country}</h1>
  <h4 class="cloudTitle">Clouds</h4>
  <p class="min_temp">
  <img src="./asset/clouds.jpg" height="50" width="80"/>&nbsp;${all} &nbsp;
    </p>
  <h4 class="sunTitle">Sun</h4>
  <p class="min_temp">
  <img src="./asset/sun_rise.png" height="50" width="80"/>&nbsp;${sunriseFormat}&nbsp;
  <img src="./asset/sun_set.png" height="50" width="80"/>&nbsp; ${sunsetFormat} &nbsp;
    </p>
  <h4 class="tempTitle">Temperature</h4>
  <p class="min_temp">
  <img src="./asset/temp_max.jpg" height="50" width="80"/>${temp_max}
  <img src="./asset/temp_min.png" height="50" width="80"/> ${temp_min} 
    </p>
  <h4 class="windTitle">Wind</h4>
    <p class="wind">
    <img src="./asset/wind.png" height="40" width="50"/> &nbsp; ${speed}&nbsp; 
    <img src="./asset/degree.png" height="40" width="50"/>&nbsp;${deg}&nbsp; 
    <img src="./asset/gust.png" height="40" width="50"/>&nbsp;${gust}&nbsp;
    <p>`;

  spinner.classList.add("hidden");
  cityContainer.innerHTML = html;
  mapContainer.classList.remove("hidden");
  cityContainer.classList.remove("hidden");

  renderCity(data);
  iFrame.src = `https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!input.value) {
    alert("Please enter proper value");
    return;
  }
  getCityData(input.value);

  input.value = "";
});
