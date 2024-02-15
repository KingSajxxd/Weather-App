
// API used from openweathermap.org
const apikey = "f7db4d48acd66ba90628c79fc9fa1869";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// Creating Variables
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
// Variable for images used
const weatherIcon = document.querySelector(".weather-icon");
// Calling function for city
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
// To display error message
    if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }else{
        var data = await response.json();

// Connecting to console
    // console.log(data);

// Connecting HTML classes to API attributes
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round (data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
// Changing weather images relative to the climate
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main == Rain){
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main == Drizzle){
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main == Mist){
        weatherIcon.src="images/mist.png";
    }


    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display="none";
    }
    




}
// Functioning of search button
searchBtn.addEventListener("click", ()=>{
    // Gets the city name and passes to the API
checkWeather(searchBox.value);
})
