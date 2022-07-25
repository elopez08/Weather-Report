//const newcountrybtn = document.querySelectorAll("country-id2");




/*
function buttonGenerator(parentDiv, btnText) {
    const button = `<button type='submit' id='${btnText}-btn' name='${btnText}'>${btnText}</button>`
    parentDiv.append(button)
}
*/













//var Citybtn = document.getElementById("country-btn-two");
//var Citybtn2 = document.getElementById("country-btn-three");






/*
Citybtn.onclick = function() {
    console.log(`The button has been clicked`);
}

Citybtn2.onclick = function() {
    console.log(`The button has been clicked`);
}
*/


/*

let weather = {
    //I'm using the apiKey that was registered
    "apiKey": "806379032320b148b520a1512dec56eb",
    //We're going to use a function "fetchWeather" to get the data.  This is a similar structured URL that was used from:  https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=806379032320b148b520a1512dec56eb as a sample.  Notice that the name is specifically there because we need to know the information about the weather in "Denver"
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&appid=" 
        + this.apiKey
        ).then((response) => response.json())
        //We're calling on the function "displayWeather" and how it is being identified
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        //If you look at the site, we have a property for the city name known as "name".  This is EXTRACTING that information
        const { name } = data;
        //The reason why there's two is because in the data, we want BOTH the icon and the description and both are located in the "weather" string
        const {icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city2").innerText = "Weather in " + name;
        document.querySelector(".icon2").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description2").innerText = description;
        document.querySelector(".temp2").innerText = temp + " °C";
        document.querySelector(".humidity2").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".wind-speed2").innerText = "Wind Speed " + speed + " km/h";
    }

};

let weathertwo = {
    "apiKey": "806379032320b148b520a1512dec56eb",
    fetchWeatherTwo: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="
        + city 
        + "&cnt=5&appid=" 
        + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
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
            console.log("Today is: " + day);
            
            daynumber++;

            const { name } = data.city;
            const {icon, description } = data.list[i].weather[0];
            const { temp, humidity } = data.list[i].main;
            const { speed } = data.list[i].wind;
            console.log(name, icon, description, temp, humidity, speed);

            document.querySelector(".city2").innerText = "Weather in " + name;
            document.querySelector(".icon2").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            document.querySelector(".description2").innerText = description;
            document.querySelector(".temp2").innerText = temp + " °C";
            document.querySelector(".humidity2").innerText = "Humidity: " + humidity + " %";
            document.querySelector(".wind-speed2").innerText = "Wind Speed " + speed + " km/h";
    
            weatherarray.push(
                `<div class="weather-box">
                    <h2 class="city2">Weather in ${name}</h2>
                    <h2>${day}</h2>
                        <div class = "temp2">${temp}</div>
                        <div class = "flex">
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="icon2" />
                            <div class = "description2">${description}</div>    
                        </div>
                        <div class = "humidity2">Humidity: ${humidity} %</div>
                        <div class = "wind-speed2">Wind Spee: ${speed} km/h</div>    
                </div>
                </div>`);
            let finalstring = weatherarray.join("");
            console.log(finalstring);
            document.querySelector(".weather-day2").innerHTML = finalstring;


            //We're trying to form a button here!
            if (i==4)
            {
                countrybutton.push(
                    `
                        <button country-btn class = "country-btn" value="${name}" id="countryid">${name}</button>
                    `
                );
                //countrybutton.addEventListener('click');
                countrybutton.join(``);
                let finalizedbutton = countrybutton.join(``);
                document.querySelector(".button-form").innerHTML = finalizedbutton;
            }

            i++;
        }
        //Reset the count
        i=0;
    },
    //For the search bar
    search: function () {
        this.fetchWeatherTwo(document.querySelector(".search-bar").value);
        console.log("The value for the function is: " + document.querySelector(".search-bar").value);
    },
    searchtwo: function (){
        this.fetchWeatherTwo(document.querySelector(".search-bar").value);
        console.log(document.querySelector(".country-btn").value);
    }
}
*/



/*
document.querySelector(".search-area .button-form .country-btn").addEventListener("click", function () {
    console.log("The value we got from the button is: " + document.querySelector(".search-area .button-form button").value);
    weathertwo.searchtwo();
});
*/

/*
countrylabel.forEach(button => {
    button.addEventListener('click', () =>{
        let countrypass = button.innerText;
        //console.log("countrypass:" + countrypass);
        weatherthree.searchtwo(countrypass);
    })
})
*/


//const countryidbtn = document.querySelectorAll("#countryid");

/*
countryidbtn.forEach(button => {
    button.addEventListener('click', () =>{
        let countrypass = button.innerText;
        //console.log("countrypass:" + countrypass);
        weatherthree.searchtwo(countrypass);
    })
})
*/