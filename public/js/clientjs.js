const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    messageThree.textContent = "";

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) =>{
    response.json().then((data)=>{

        if (data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent ="";
            messageThree.textContent ="";
        } else{
            messageOne.textContent = data.location;
            const forecastText = data.forecast.weather;
            messageTwo.textContent = "The forecast is " + forecastText + ". It is currently " + data.forecast.temp + "° and it feels like " + data.forecast.feelslike + "°.";
            messageThree.textContent ="The wind speed is " + data.forecast.wind_speed + "km/h. There is " + data.forecast.humidity + "% humidity.";
        }
        
    })
})
})