const appKey = "64720a89b5502196cf478fcf7e16ea93";
const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-txt");
const cityName = document.querySelector(".city-name");
const icon = document.querySelector(".icon");
const temperature = document.querySelector(".temp");
const tempmaxx = document.querySelector(".temp-max");
const tempminn = document.querySelector(".temp-min");
const weatherdescription = document.querySelector(".weatherdescription");
const countryName = document.querySelector(".country-name");
const weathericon = document.querySelector(".weathericon");
const weatherbody = document.querySelector(".weatherbody");
const windjs = document.querySelector(".wind")
const humidityjs = document.querySelector(".humidity")

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.keyCode == 13) {
        findWeatherDetails();
    }
}

function findWeatherDetails(){
    if (searchInput.value === ""){

    }
    else {
        const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
    }
}

function theResponse(response) {
    const jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    weatherdescription.innerHTML = jsonObject.weather[0].description;
    weathericon.innerHTML = `<img src="icons/${jsonObject.weather[0].icon}.png"/>`;
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°c";
    tempmaxx.innerHTML = " " + parseInt(jsonObject.main.temp_max- 273)+ "°c";
    tempminn.innerHTML = " " + parseInt(jsonObject.main.temp_min- 273)+ "°c";
    countryName.innerHTML = "," + jsonObject.sys.country;
    humidityjs.innerHTML = " Humidity " + jsonObject.main.humidity + "%";
    windjs.innerHTML = " Wind " + jsonObject.wind.speed + " m/s" ;
    const daynight = jsonObject.weather[0].icon;
    if(daynight.includes('n')){
        document.body.style.backgroundImage = "url('backgroundnight.jpg')";
    }
    else if(daynight.includes('d')){
        document.body.style.backgroundImage = "url('backgroundday.jpg')";
    }

}

function httpRequestAsync(url, callback){
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () =>{
        if(httpRequest.readyState ==4 && httpRequest.status == 200) {
           callback(httpRequest.responseText); 
        }  
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
