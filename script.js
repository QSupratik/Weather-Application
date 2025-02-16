var lat, lon;
const inputBox = document.querySelector(".searchbox input");
const searchButton = document.querySelector(".searchbox button");


async function getWeather( city ){
    const apiKey = APP_WEATHER_API_KEY;
    const latlonURL = "https://api.openweathermap.org/geo/1.0/direct?limit=1&q=";

    const latlon = await fetch(latlonURL + city + `,india&appid=${apiKey}`);
    var data = await latlon.json();
    if (data.length > 0) {
        lat = data[0].lat; 
        lon = data[0].lon;
        console.log( lat, lon );

        const weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
        const weather = await fetch(weatherURL + `&lat=${lat}&lon=${lon}&appid=${apiKey}`);

        var weatherData = await weather.json();
        console.log( weatherData );

        document.querySelector("#city").innerHTML = weatherData.name + `, ${inputBox.value}`;
        document.querySelector("#temperature_data").innerHTML = weatherData.main.temp + "°C";
        document.querySelector("#windspeed_data").innerHTML = weatherData.wind.speed + " km/hr";
        document.querySelector("#humidity_data").innerHTML = weatherData.main.humidity + " %";

        const weatherIcon = document.querySelector(".temperature_image");
        console.log( weatherData.weather[0].main );
        if( weatherData.weather[0].main == "Haze"){
            weatherIcon.src="./Images/haze.png";
        }
        else if( weatherData.weather[0].main == "Clouds"){
            weatherIcon.src="./Images/clouds.png"
        }
        else if( weatherData.weather[0].main == "Clear"){
            weatherIcon.src="./Images/clear.png"
        }
        else if( weatherData.weather[0].main == "Rain"){
            weatherIcon.src="./Images/rain.png"
        }
        else if( weatherData.weather[0].main == "Drizzle"){
            weatherIcon.src="./Images/drizzle.png"
        }
        else if( weatherData.weather[0].main == "Mist"){
            weatherIcon.src="./Images/mist.png"
        }
        const error = document.querySelector(".error").style.display='none';
    } 
    else{
        //const var1 = document.querySelector(".temperatue").style.display="none";
        //const var2 = document.querySelector(".weather").style.display="none";
        const error = document.querySelector(".error").style.display='block';
    }
}

searchButton.addEventListener("click", ()=>{
    getWeather(inputBox.value);
})
