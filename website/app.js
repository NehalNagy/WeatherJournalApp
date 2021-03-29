/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=6a50dde02db3c5ae2fc05a22e77ffc2d&units=metric';

/**
 * API call example
 * api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
 * api.openweathermap.org/data/2.5/weather?zip=94040&appid={API key}
 */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

//add click listner to the generate button
document.getElementById('generate').addEventListener('click', perfomAction);

function perfomAction() {
    //get the zip code from the client
    const zipCode = document.getElementById('zip').value;
    //get the user feeling
    const userFeeling = document.getElementById('feelings').value;

    let tempData = null;
    getWeatherData(baseURL, apikey, zipCode)
        .then(function (data) {
            clearUI();//in case of typing invalid zip and there is already data displayed in the UI, we have to clear previuos data displayed.
            tempData = data;
            if (data.cod == '404' || data.cod == '400') {
                alert(data.message);
            }
            else
                postWeatherData('/addData', { temperature: data.main.temp, currentDate: newDate, userResponse: userFeeling });
        })
        .then(function () {//update the UI dynamically            
            if (tempData.cod != '404' && tempData.cod != '400')
                updateUI();
        });
}

//async GET
const getWeatherData = async (baseUrl, apikey, zipCode) => {
    const res = await fetch(baseUrl + zipCode + apikey);
    try {
        const data = await res.json();
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
function clearUI() {
    document.getElementById('temp').innerHTML = '';
    document.getElementById('date').innerHTML = '';
    document.getElementById('content').innerHTML = '';
}
const updateUI = async () => {
    /**
     *  The steps to updating the UI of an app dynamically...
    1. Create a selector
    2. Capture the data you want to update the element with
    3. Set updated property for element.    
     */


    const request = await fetch('/weather');
    try {
        const allWeatherData = await request.json();
        console.log(allWeatherData);
        document.getElementById('temp').innerHTML = allWeatherData.temperature + ' &#8451;';
        document.getElementById('date').innerHTML = allWeatherData.clientDate;
        document.getElementById('content').innerHTML = allWeatherData.userFeeling;
    }
    catch (error) {
        console.log(error);
    }



}