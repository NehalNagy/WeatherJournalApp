/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=6a50dde02db3c5ae2fc05a22e77ffc2d';

/**
 * API call example
 * api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
 * api.openweathermap.org/data/2.5/weather?zip=94040&appid={API key}
 */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//get the zip code from the client
const zipCode = document.getElementById('zip').value;
//add click listner to the generate button
document.getElementById('generate').addEventListener('click', perfomAction);

function perfomAction() {
    //get the zip code from the client
    const zipCode = document.getElementById('zip').value;
    console.log(zipCode);
    getWeatherData(baseURL, apikey, zipCode);
}

const getWeatherData = async (baseUrl, apikey, zipCode) => {
    const res = await fetch(baseUrl + zipCode + apikey);
    try {
        const data = await res.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}