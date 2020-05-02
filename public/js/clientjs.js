const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) =>{
    response.json().then((data)=>{

        if (data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent ="";
        } else{
            messageOne.textContent = data.location;
            const forecastText = data.forecast.weather;
            messageTwo.textContent = "The forecast is " + forecastText + ". It is currently " + data.forecast.temp + "° and it feels like " + data.forecast.feelslike + "°.";
        }
        
    })
})
})