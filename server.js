// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
}

//GET Route:
app.get('/weather', sendWeatherData);
function sendWeatherData(req, res) {
    res.send(projectData);
}

//POST Route:
app.post('/addData', addWeatherData);
function addWeatherData(req, res) {
    console.log(req);
    projectData = {
        temperature: req.body.temperature,
        clientDate: req.body.currentDate,
        userFeeling: req.body.userResponse
    }
    console.log('project data : ');
    console.log(projectData);
}