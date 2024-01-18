const apikey = "d834af321a0a4eefbfa19ffb5d200ea0";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let searchbox = document.getElementById("search-box");
let searchbtn = document.getElementById("search-btn");

// write the event AudioListener;se
// searchbtn.addEventListener('click', function () {
//     const city = searchbox.value;
//     checkweather(city);
// });

// async function checkwhether(city) {
//     const response = await fetch(apiurl + city + `&appid=${apikey}`)
//     var data = await response.json()

//     console.log(data)

//     document.getElementById('city-name').innerHTML = data.name;
//     document.getElementById('temp').innerHTML = Math.round(data.main.temp) + " <span>&#176;C</span>";
//     document.getElementById('humidity').innerHTML = data.main.humidity + " %";
//     document.getElementById('wind-speed').innerHTML = data.wind.speed + " Km/hr";
// }

searchbtn.addEventListener("click", function (e) {
  // this helps to do not reload the script without user
  e.preventDefault();
  let city_name = searchbox.value;
  checkwhether(city_name);
});

async function checkwhether(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  var data = await response.json();

  cloud_type.innerHTML = data.weather[0].description;
  city_name.innerHTML = data.name;
  humi.innerHTML = data.main.humidity + " %";
  temp.innerHTML = data.main.temp + "<span> &#176;C</span>";
  windspeed.innerHTML = data.wind.speed + " Km/Hr";

  // whrite code for the change the cloud images according to the whether conditions
  if (data.weather[0].main == "Clouds") {
    whether_img.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    whether_img.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    whether_img.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    whether_img.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    whether_img.src = "images/mist.png";
  } else if (data.weather[0].main == "Wind") {
    whether_img.src = "images/wind.png";
  }

  console.log(data);
}