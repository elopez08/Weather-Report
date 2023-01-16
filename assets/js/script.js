var i = 0;
var j = 0;

//popup window
var modal = document.getElementById("hover_bkgr_fricc");

var countrybutton = [];
//Store the information by country's name
const countryArrayInfo = [];
//Array for country
var countryListInfo = [];

let weatherReport = {
    //Get the apiKey for a shorter code
    "apiKey": "806379032320b148b520a1512dec56eb",
    //Need to extract the text that is being inputed
    searchExtract: function () {
        this.fetchWeatherData(document.querySelector(".search-bar").value);
    },
    //Search information of the city first
    fetchWeatherData: function(cityName) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="
        + cityName 
        + "&cnt=5&appid=" 
        + this.apiKey
        //Then we're waiting for the response
        ).then((response) => response.json())
        //After getting the information, go to the next information, which is displayWeather
        .then((data) => this.validationCity(data))
    },
    validationCity: function(data) {
        const { message } = data.message;
        //If this city doesn't exist
        console.log(`message data is:
        =============================`);
        console.log(data.message);
        if (data.cod == 404 || data.cod == 400)
        {
            console.log(`Message of the city is:
            ===================================`);
            console.log( data.message );
            document.querySelector(".todayDay").innerText = data.message;
            document.querySelector(".weather-day2").innerHTML = "";
            document.querySelector(".timeCurrent").innerHTML = "";
            document.querySelector(".citytoday").innerHTML = "";
            document.querySelector(".temptoday").innerHTML = "";
            document.querySelector(".flex").innerHTML = "";
            document.querySelector(".humiditytoday").innerHTML = "";
            document.querySelector(".wind-speedtoday").innerHTML = "";

        }
        //Otherwise, make the button
        else
        {
            console.log(`Message of the city is:
            ===================================`);
            console.log( message );
            this.makeCountryButton(data);
        }
    },
    makeCountryButton: function(data) {

        //Have "name" be a constant equal to "data.city.name" of that array
        const { name } = data.city;
        //If the array "contryArrayInfo" doesn't have "data.city.name"
        console.log(`Data information for countryArrayInfo
        ============================================`);
        console.log(countryArrayInfo);
        console.log(`'name' information to scan
        ==============================`);
        console.log(name);
        console.log(`=================================`);
        if(!countryArrayInfo.includes(name))
        //Make button array
        {
            //HTML Info
            countrybutton.push(
                `
                    <button country-btn class = "country-btn" value="${name}" id="countryid2">${name}</button>
                `
            );
            //Have this join with an array
            countryArrayInfo.push(name);
            countrybutton.join(``);
            let finalizedbutton = countrybutton.join(``);
            //Insert this in the "buttom-form" of the HTML
            document.querySelector(".button-form").innerHTML = finalizedbutton;
            //Go to the displayWeatherInfo
            this.displayWeatherInfo(data);
        }
        else
        {
            this.displayWeatherInfo(data);
        }

    },
    //Next, extract the city information with the API
    displayWeatherInfo: function(data) {
        //Lists for the information
        weatherarray = [];
        //This is a MUST    
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        //First, check to see if the city is valid for the app:
        const { cod, message } = data;
        //This works
        if (cod == 404)
        {
            console.log( message );
            document.querySelector(".todayDay").innerText = message;
            document.getElementById(".weather-day2").innerHTML = "";
        }
        //If it does, proceed with the data writing:
        else
        {
            const { name, country, timezone } = data.city;
            console.log(`========== Time Zone reevaluation ==========`);
            //Get the time:
            var ourtime = new Date();
            var localtime = ourtime.getTime();
            var localOffset = ourtime.getTimezoneOffset() * 60000;
            var utc = localtime + localOffset;
            //Get the time of the city in question
            var timecity = utc + (1000 * timezone );
            var final = new Date(timecity);
            console.log(`The current time is: ` + final);

            //Extracting hours
            var hour = final.getHours();
            console.log(`Current hour is: ` + hour);

            //Extracting minutes
            var minute = final.getMinutes();
            var minuteStatement;
            console.log(`Current minute is: ` + minute);
            console.log(`========== End Reevaluation ==========`);
            var statementTime;
            //Statement when the information is found:
            switch(true) {
                case(minute<9):
                    minuteStatement = `0${minute}`;
                    break;
                case(minute<60):
                    minuteStatement = minute;
                    break;
                default:
                    minuteStatement = `NaN`;
                    break;
            }
            switch(true) {
                case (hour==0):
                    statementTime = `Current time is: 12:${minuteStatement} A.M.`;
                    break;
                case (0<hour<13):
                    statementTime = `Current time is: ${hour}:${minuteStatement} A.M.`;
                    break;
                case(13<hour<24):
                    var afternoonTime = hour - 12;
                    statementTime = `Current time is: ${afternoonTime}:${minuteStatement} P.M.`;
                    break;
                default:
                    statementTime = `Can't detect the time.  ERROR!`;
                    console.log(`ERROR!  Can't detect time.`);
                    break;
                
            }
            //This is the number POSITION for the day
            let daynumber = final.getDay();
            while (i<5)
            {
                //We're finding the day NAME here
                if (daynumber == 7)
                {
                    daynumber=0;
                }
                let day = weekday[daynumber];
                daynumber++;
    
                //const { name, timezone } = data.city;
                const { icon, description } = data.list[i].weather[0];
                const { temp, humidity } = data.list[i].main;
                const { speed } = data.list[i].wind;
                //Converting the temperature:
                const fahrenheit = (temp - 273.15) * 9/5 + 32;
                const fahrenheit_approx = Math.round(fahrenheit);
    
                console.log(`======= Date Chart =======`);
                //Today's Broadcast for the Big setting!
                if (i == 0)
                {
                    document.querySelector(".todayDay").innerText = "Today is: " + day;
                    document.querySelector(".timeCurrent").innerText = statementTime;
                    document.querySelector(".citytoday").innerText = "Weather in " + name + ", " + country;
                    document.querySelector(".icontoday").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                    document.querySelector(".descriptiontoday").innerText = description;
                    document.querySelector(".temptoday").innerText = fahrenheit_approx + " °F";
                    document.querySelector(".humiditytoday").innerText = "Humidity: " + humidity + " %";
                    document.querySelector(".wind-speedtoday").innerText = "Wind Speed " + speed + " km/h";
        
                }
                //Information for the 5 day broadcast
                weatherarray.push(
                    `<div class="weather-box" id = "weather-color[${[i]}]]">
                        <h2>${day}</h2>
                            <div class = "temp2" id="weather-day-file[${[i]}]">${fahrenheit_approx} °F</div>
                            <div class = "flex">
                                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="icon2" />
                                <div class = "description2">${description}</div>    
                            </div>
                            <div class = "humidity2">Humidity: ${humidity} %</div>
                            <div class = "wind-speed2">Wind Speed: ${speed} km/h</div>    
                    </div>
                    </div>`);
                //Adding all the weatherarray strings onto finalstring
                let finalstring = weatherarray.join("");
                document.querySelector(".weather-day2").innerHTML = finalstring;
                //Count up for the next card
                i++;
            }

            i=0;
            //Point of this loop is to give one additional class
            while (j < 5)
            {
    
                const { temp } = data.list[j].main;
    
                //Conversion from F to C
                const fahrenheit = (temp - 273.15) * 9/5 + 32;
                //Round the C to whole
                const temp_info = Math.round(fahrenheit);
    
                console.log('Current information for weather-day-file is: ' + `weather-day-file[${[j]}]`);

                var weather_id = document.getElementById(`weather-color[${[j]}]]`);
                console.log("Current weather id is: " + weather_id.innerText);
    
                //Switch cases:
                //This statement WORKS!
                switch(true) {
                    case (temp_info < 70):
                        weather_id.classList.add('cold');
                        break;
                    case (temp_info< 80):
                        weather_id.classList.add('room');
                        break;
                    case (temp_info < 90):
                        weather_id.classList.add('hot');
                        break;
                    case (temp_info < 100):
                        weather_id.classList.add('prettyhot');
                        break;
                    case (temp_info < 110):
                        weather_id.classList.add('reallyhot');
                        break;
                    default:
                        weather_id.classList.add('dangerhot');
                        break;
                }
                //-------------End of indication --------------------
                j++;
            }
            j=0;
    
        }

    },
    searchHistory: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="
        + city 
        + "&cnt=5&appid=" 
        + this.apiKey
        //Then we're waiting for the response
        ).then((response) => response.json())
        //After getting the information, go to the next information, which is displayWeather
        .then((data) => this.displayWeatherInfo(data))
    }
}
//Both steps following, extract that information to see if it can be saved as a btn.  If not, go to fetch
document.querySelector(".search-area button").addEventListener("click", function(){
    weatherReport.searchExtract();
});
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter")
    {
        weatherReport.searchExtract();
    }
});
const countrylabel = document.querySelectorAll('[country-btn]');
//Use this for the new EventListeners
//If we click on the button, go straight to the fetch
addGlobalEventEventListener("click", "#countryid2", e => {
    let countrypass = e.target.value;
    console.log(`Loading countrypass info:
    ================================`);
    console.log(countrypass);
    weatherReport.searchHistory(countrypass);
})
function addGlobalEventEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector))
        {
            callback(e);
        }
    })
}

(window).load(function () {
    $(".trigger_popup_fricc").click(function(){
       $('.hover_bkgr_fricc').show();
    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});