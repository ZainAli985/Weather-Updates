console.log("Welcome To Weather Updates");

// DEVICE TIME AND DAY 

let time = document.querySelector("#time");
let day = document.querySelector("#day");
const date = new Date(); //globalized for greet mechanism

const UpdatedTime = ()=>{
  const funcdate = new Date();
  let dayIndex = funcdate.getDay();
  
  const weekdays = ["Sunday" , "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayName = weekdays[dayIndex];
  
  
  
  
  let hours = funcdate.getHours().toString().padStart(2, '0');
  let minutes = funcdate.getMinutes().toString().padStart(2, '0');
  let ampm = hours >=12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // In-case of zero remainder
  
  
  // Text Update
  day.innerText = dayName; 
  time.innerText = `${hours}:${minutes} ${ampm}`;
}
UpdatedTime()

setInterval(UpdatedTime, 1000);  //recalls funtion every 1s



// Greetings Function 

let greet_image = document.querySelector(".greet_image");
let greet_text = document.querySelector(".greet_text");

if(date.getHours() >= 6 && date.getHours() < 12){
  greet_text.innerText = `Good Morning`
  greet_image.src = "Morning.gif"
}
else if (date.getHours() >= 12 & date.getHours ()< 18){
   greet_text.innerText = `Good Afternoon`
   greet_image.src = "Afternoon.gif"
}
else{
     greet_text.innerText = `Good Evening`
     greet_image.src = "Evening.gif"
}




// API FUNCTIONS 


let search_btn = document.querySelector(".search-button");
let input_box = document.querySelector(".search-box");
let apiKey = `6864f934728e477cab87b2944542cb66`;

search_btn.addEventListener("click", ()=>{
  FetchingData();
})


async function FetchingData() {

  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${input_box.value},,&limit=1&appid=${apiKey}`
  console.log(input_box.value);

  try{
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
    // LON LAT 
    let lon = data[0].lon;
    let lat = data[0].lat;
   let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    let weatherResponse = await fetch(url2);
    let weatherData = await weatherResponse.json();
    console.log(weatherData);


    // Display Weather Info 
      let DisplayWeatherData = ()=>{
        // City Info 
        let city_info  = document.querySelector(".city_info");
        city_info.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
        // Temperature 
        let temp = document.querySelector(".temperature");
        let kelvinTemp = weatherData.main.temp;
        let celciusTemp = parseInt(kelvinTemp - 273.15);
        temp.innerHTML = `${celciusTemp}<sup>o</sup>C`;
        // Weather 
        let day_weather = document.querySelector("#day-weather");
        day_weather.innerText = `${weatherData.weather[0].main}`;
        // Feels Like Temp 
        let feels_like_temp = document.querySelector(".feels_like");
        let Feels_like_K_T = weatherData.main.feels_like;
        let Feels_Like_C_T = parseInt(Feels_like_K_T - 273.15);
        feels_like_temp.innerHTML = `${Feels_Like_C_T}<sup>o</sup>C`;
        // Humidity 
        let Humidity = document.querySelector(".humidity");
        Humidity.innerHTML = `${weatherData.main.humidity}%`;
        // Wind Speed 
        let wind_speed = document.querySelector(".wind_speed");
        let windSpeed_kmph = Math.floor(weatherData.wind.speed * 3.6 * 100) / 100;
        wind_speed.innerHTML = `${windSpeed_kmph} Kmph`;
        // Visibility 
        let Visibility = document.querySelector(".visibility");
        Visibility.innerHTML = `${weatherData.visibility / 1000} Km`
        // Air Pressure 
        let air_pressure = document.querySelector(".air_pressure");
        air_pressure.innerHTML = `${weatherData.main.pressure} hPa`;



        // Tempereature Conversion 
        let celcius_btn = document.querySelector("#celcius");
        let farenheit_btn = document.querySelector("#farenheit");
        let temp_farenheit = celciusTemp * 9/5 + 32;

        celcius_btn.addEventListener("click", ()=>{
          temp.innerHTML = `${celciusTemp}<sup>o</sup>C`;
        });
        farenheit_btn.addEventListener("click", ()=>{
          temp.innerHTML = `${temp_farenheit}<sup>o</sup>F`;
        });

      }
     return DisplayWeatherData(); //Required
}



  catch(error){
    console.error("Operation Failed Invalid Input",error);
  }

}




