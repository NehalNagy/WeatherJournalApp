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

//add click listner to the generate button
document.getElementById('generate').addEventListener('click', perfomAction);

function perfomAction() {
    //get the zip code from the client
    const zipCode = document.getElementById('zip').value;
    //get the user feeling
    const userFeeling = document.getElementById('feelings').value;
    console.log(zipCode);
    getWeatherData(baseURL, apikey, zipCode)
        .then(function (data) {
            console.log("temp = " + data.main.temp);
            postWeatherData('/addData', { temperature: data.main.temp, currentDate: newDate, userResponse: userFeeling });
        })
        .then(function () {//update the UI dynamically

        });
}

//async GET
const getWeatherData = async (baseUrl, apikey, zipCode) => {
    const res = await fetch(baseUrl + zipCode + apikey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

//async POST
/*
The data object should include
1. temperature
2. date
3. user response
 */
const postWeatherData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
