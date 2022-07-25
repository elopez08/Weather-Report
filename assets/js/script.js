var i = 0;
var countrybutton = [];

let weatherthree = {
    //Get the apiKey for a shorter code
    "apiKey": "806379032320b148b520a1512dec56eb",
    //Then, apply this function:
    //On this function, we're fetching from a city and using our apiKey to retrieve the data
    makingButton: function(city){
        countrybutton.push(
            `
                <button country-btn class = "country-btn" value="${city}" id="countryid2">${city}</button>
            `
        );
        countrybutton.join(``);
        let finalizedbutton = countrybutton.join(``);
        document.querySelector(".button-form").innerHTML = finalizedbutton;
        this.fetchWeatherThree(city);
    },
    fetchWeatherThree: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="
        + city 
        + "&cnt=5&appid=" 
        + this.apiKey
        //Then we're waiting for the response
        ).then((response) => response.json())
        //After getting the information, go to the next information, which is displayWeather
        .then((data) => this.displayWeather(data))
    },
    //On this one, we're applying the information
    displayWeather: function(data) {
        //Lists for the information
        weatherarray = [];
        
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d = new Date();
        let daynumber = d.getDay();

        

        while (i<5)
        {
            if (daynumber == 7)
            {
                daynumber=0;
            }
            let day = weekday[daynumber];
            daynumber++;

            const { name } = data.city;
            const {icon, description } = data.list[i].weather[0];
            const { temp, humidity } = data.list[i].main;
            const { speed } = data.list[i].wind;

            //Today
            if (i == 0)
            {
                document.querySelector(".citytoday").innerText = "Weather in " + name;
                document.querySelector(".icontoday").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                document.querySelector(".descriptiontoday").innerText = description;
                document.querySelector(".temptoday").innerText = temp + " °C";
                document.querySelector(".humiditytoday").innerText = "Humidity: " + humidity + " %";
                document.querySelector(".wind-speedtoday").innerText = "Wind Speed " + speed + " km/h";
    
            }

            weatherarray.push(
                `<div class="weather-box">
                    <h2>${day}</h2>
                        <div class = "temp2">${temp} °C</div>
                        <div class = "flex">
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="icon2" />
                            <div class = "description2">${description}</div>    
                        </div>
                        <div class = "humidity2">Humidity: ${humidity} %</div>
                        <div class = "wind-speed2">Wind Speed: ${speed} km/h</div>    
                </div>
                </div>`);
            let finalstring = weatherarray.join("");
            //console.log(finalstring);
            document.querySelector(".weather-day2").innerHTML = finalstring;

            i++;

            console.log(temp);
        }
        //Reset the count
        i=0;
    },
    //For the search bar
    searchandMake: function () {
        this.makingButton(document.querySelector(".search-bar").value);
    },
    //Testing Search bar
    searchHistory: function(countryvalue){
        this.fetchWeatherThree(countryvalue);
    }
}

document.querySelector(".search-area button").addEventListener("click", function(){
    weatherthree.searchandMake();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter")
    {
        weatherthree.searchandMake();
    }
});

const countrylabel = document.querySelectorAll('[country-btn]');

//Use this for the new EventListeners
addGlobalEventEventListener("click", "#countryid2", e => {
    let countrypass = e.target.value;
    weatherthree.searchHistory(countrypass);
})

function addGlobalEventEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector))
        {
            callback(e);
        }
    })
}