const appKey = "64720a89b5502196cf478fcf7e16ea93";
const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-txt");
const cityName = document.querySelector(".city-name");
const icon = document.querySelector(".icon");
const temperature = document.querySelector(".temp");
const tempmaxx = document.querySelector(".temp-max");
const tempminn = document.querySelector(".temp-min");
const date1 = document.querySelector('.lo .date');
const date2 = document.querySelector('.lo .a');



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
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png" ;
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°c";
    tempmaxx.innerHTML = parseInt(jsonObject.main.temp_max- 273) + "°c";
    tempminn.innerHTML = parseInt(jsonObject.main.temp_min- 273) + "°c";

    const timedate = parseInt(new Date().getTime());
    const destoffset = parseInt(jsonObject.timezone)/60;
    const localoffset = new Date().getTimezoneOffset;
    console.log('destoffset: ',destoffset);
    console.log('localoffset: ',localoffset);
    // date1.innerHTML = new Date( timestamp).toUTCString();
    
var offset = destoffset-localoffset;
    date1.innerHTML = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString();



     console.log('debug: ', new Date().getTime());
    
     console.log('debug timezone: ', parseInt(jsonObject.timezone));
     console.log('new Date().getTime()+parseInt(jsonObject.timezone): ',timedate +parseInt(jsonObject.timezone));

    //  console.log('debug timezone utc: ', parseInt(jsonObject.timezone).toUTCString());

     
    // date2.innerHTML = jsonObject.timezone+30000;
    date2.innerHTML = new Date( timedate +parseInt(jsonObject.timezone)).toUTCString();
    //date1.innerText = dateBuilder(now);
    
    //time.innerHTML = jsonObject.timezone;
    
    //date = new Date(time.getTime() + timezone*1000);
    //date2 = date.toUTCString()
    //const time = new Date();
//const date2 = document.querySelector(".lo .date");
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



function dateBuider(d) {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


/*var d = new Date();
var a = new Date(d.getTime() + timezone *1000);

var n = a.toUTCString();
console.log(d);
console.log(a);
console.log(n);*/





