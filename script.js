const api = "d40bc79fb23748b1b6424702230610";

async function getWeather(locationWeather) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${locationWeather}&days=3&aqi=no&alerts=no`
  );
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

function updateLocation() {
  const locationInput = document.querySelector("#locationInput");
  const locationDisplay = document.querySelector(".location");

  locationInput.addEventListener("keypress", async function (e) {
    if (e.key == "Enter") {
      try {
        const data = await getWeather(locationInput.value);
        locationDisplay.textContent = data.location.name;
        updateCurrentWeather(data);
        updateForecastWeather(data);
        initTempBtn();
      } catch (error) {
        console.log(error);
      }
    }
  });
}

function updateCurrentWeather(data) {
  const currentCondition = document.querySelector(".condition");
  const currentConditionImg = document.querySelector(".condition-img");
  const currentTempC = document.querySelector(".tempC");
  const currentTempF = document.querySelector(".tempF");
  const currentHumidity = document.querySelector(".humidity");

  currentCondition.textContent = data.current.condition.text;
  currentConditionImg.src = data.current.condition.icon;

  currentTempC.textContent = data.current.temp_c + " °C";

  currentTempF.textContent = data.current.temp_f + " °F";

  currentHumidity.textContent = data.current.humidity;
}

function updateForecastWeather(data) {
  const day1 = document.querySelector(".next-day");
  const day2 = document.querySelector(".day-after-next");
  const forecast1 = document.getElementsByClassName("condition 1");
  const forecast2 = document.getElementsByClassName("condition 2");
  const forecastImg1 = document.getElementsByClassName("img 1");
  const forecastImg2 = document.getElementsByClassName("img 2");

  day1.textContent = data.forecast.forecastday[1].date;
  day2.textContent = data.forecast.forecastday[2].date;

  forecast1[0].textContent = data.forecast.forecastday[1].day.condition.text;
  forecast2[0].textContent = data.forecast.forecastday[2].day.condition.text;
  forecastImg1[0].src = data.forecast.forecastday[1].day.condition.icon;
  forecastImg2[0].src = data.forecast.forecastday[2].day.condition.icon;
}

function initTempBtn() {
  const changeToF = document.querySelector(".changeToF");
  const changeToC = document.querySelector(".changeToC");
  const tempC = document.querySelectorAll(".tempC");
  const tempF = document.querySelectorAll(".tempF");

  changeToF.addEventListener("click", () => {
    changeToF.className = "changeToF active";
    changeToC.className = "changeToC active";
    tempC.forEach((temp) => {
      temp.className = "tempC active";
    });
    tempF.forEach((temp) => {
      temp.className = "tempF active";
    });
  });

  changeToC.addEventListener("click", () => {
    changeToF.className = "changeToF";
    changeToC.className = "changeToC";
    tempC.forEach((temp) => {
      temp.className = "tempC";
    });
    tempF.forEach((temp) => {
      temp.className = "tempF";
    });
  });
}

async function initPage() {
  const locationDisplay = document.querySelector(".location");
  const data = await getWeather("London");
  locationDisplay.textContent = data.location.name;
  updateCurrentWeather(data);
  updateForecastWeather(data);
  initTempBtn();
}

initPage();
updateLocation();
