const KEY = "1e15c0829cfb700417631978a3bc7e18";
const input = document.querySelector("input");
const form = document.querySelector("form");
const container = document.querySelector(".container");
const mapContainer = document.querySelector(".mapContainer");
const iFrame = document.querySelector("iframe");
const cityContainer = document.querySelector(".cityContainer");
const cityDays = document.querySelector(".cityDays");

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
let dayHtml = "";

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

// for (i = 0; i < 5; i++) {
//   document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
// }

const renderCity = function (city, list) {
  const date = new Date();
  const monthName = month[date.getMonth()];
  const today = date.getDate();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const { all } = list[1].clouds;
  const { speed, deg, gust } = list[1].wind;
  const { temp_min, temp_max } = list[1].main;
  const { sunrise } = city;
  const { sunset } = city;

  function CheckDay(day) {
    if (day + date.getDay() > 6) {
      return day + date.getDay() - 7;
    } else {
      return day + date.getDay();
    }
  }

  list.slice(0, 5).forEach((element, i) => {
    dayHtml += `
    <div class="dayContainer">
    <h3>${weekday[CheckDay(i)]}</h3>
    <img src="http://openweathermap.org/img/wn/${
      element.weather[0].icon
    }.png" height="100" width="100"/>
    <p style="margin-bottom:0.3rem">${element.main.temp_max}</p>
    <p>${element.main.temp_min}</p>
    </div>
    `;
  });

  html = `<p class="time">${monthName} ${today}, ${time}</p>
        <h1 class="cityName">${city.name}, ${city.country}</h1>
        <h4 class="tempTitle">Clouds</h4>
        <p class="min_temp">
        <img src="./asset/clouds.jpg" height="50" width="80"/>&nbsp;${all} &nbsp;
          </p>
        <h4 class="tempTitle">Sun</h4>
        <p class="min_temp">
        <img src="./asset/sun_rise.png" height="50" width="50"/>&nbsp;${sunrise}&nbsp;
        <img src="./asset/sun_set.png" height="50" width="50"/>&nbsp; ${sunset} &nbsp;
          </p>
        <h4 class="tempTitle">Temperature</h4>
        <p class="min_temp">
        <img src="./asset/temp_max.jpg" height="50" width="80"/>&nbsp;${temp_max}&nbsp;
        <img src="./asset/temp_min.png" height="50" width="80"/>&nbsp; ${temp_min} &nbsp;
          </p>
        <h4 class="windTitle">Wind</h4>
          <p class="wind">
          <img src="./asset/wind.png" height="40" width="50"/> &nbsp; ${speed}&nbsp; 
          <img src="./asset/degree.png" height="40" width="50"/>&nbsp;${deg}&nbsp; 
          <img src="./asset/gust.png" height="40" width="50"/>&nbsp;${gust}&nbsp;
          <p>`;
};

async function getCityData(cityName) {
  mapContainer.classList.add("hidden");
  cityContainer.classList.add("hidden");
  cityDays.innerHTML = "";
  dayHtml = "";
  html = `<div class="spinner"></div>`;

  container.insertAdjacentHTML("afterbegin", html);
  spinner = document.querySelector(".spinner");

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${KEY}`
  );
  const data = await response.json();
  const { city, list } = data;

  console.log(list);

  renderCity(city, list);

  spinner.classList.add("hidden");
  cityContainer.innerHTML = html;
  cityDays.innerHTML = dayHtml;
  mapContainer.classList.remove("hidden");
  cityContainer.classList.remove("hidden");

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
